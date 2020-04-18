import axios from 'axios';
import jwtDecode from 'jwt-decode';

const { REACT_APP_API_HOST } = process.env;

const isAuthenticated = async (token) => {
  return await axios.get(`${REACT_APP_API_HOST}/auth/verify-token`, {
    params: { token }
  }).then(({ data }) => {
    if(data && data.data && data.data.token) {
      return true;
    }
  }).catch(() => {
    localStorage.removeItem('token');
    return false;
  });
};

const hasPermission = (permissions, method) => {
  if (typeof permissions === 'string') {
    permissions = [permissions];
  }
  const jwt = jwtDecode(localStorage.token);
  if (method === 'some') {
    return permissions.some(permission => {
      return jwt.permissions.includes(permission);
    });
  } else {
    return permissions.every(permission => {
      return jwt.permissions.includes(permission);
    });
  }
};

export {
  isAuthenticated,
  hasPermission
};
