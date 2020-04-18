const { JWT_SECRET_KEY } = process.env;
const expressJWT = require('express-jwt');

const sendResponse = (res, content, statusCode) => {
  res.status(statusCode ? statusCode : 200).json({
    ...(content && content.message ? { message: content.message } : null),
    ...(content && content.error ? { error: content.error } : null),
    ...(content && content.data ? { data: content.data } : null)
  });
};

const parsePermissions = (data) => {
  const permissions = [];

  for (let key of Object.keys(data)) {
    if (key !== 'id' && data[key] === 1) {
      permissions.push(key);
    }
  }

  return permissions;
};

const authorize = (permissions = []) => {
  if (typeof permissions === 'string') {
    permissions = [permissions];
  }

  return [
    expressJWT({ secret: JWT_SECRET_KEY }),
    (req, res, next) => {
      if (permissions.length && !req.user.permissions.some(p => permissions.includes(p))) {
        sendResponse(res, { message: 'Unauthorized' }, 401);
      }
      next();
    }
  ];
};

const errorHandler = (err, req, res, next) => {
  if (typeof (err) === 'string') {
    sendResponse(res, { message: err }, 400);
  }

  if (err && err.inner && err.inner.name === 'TokenExpiredError') {
    sendResponse(res, { message: 'Token expired.' }, 401);
  }

  if (err.name === 'UnauthorizedError') {
    sendResponse(res, { message: 'Invalid token.' }, 401);
  }

  sendResponse(res, { message: err.message }, 500);
};

module.exports = {
  sendResponse,
  parsePermissions,
  authorize,
  errorHandler
};
