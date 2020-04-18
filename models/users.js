const db = require('../config/mysql');

const checkEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT COUNT(email) AS count FROM users WHERE email = ? LIMIT 1`, [email], (err, res) => {
      if (err) reject(err);
      resolve(res[0]);
    });
  });
};

const insertUser = (data) => {
  const { name, email, password, role } = data;
  return new Promise((resolve, reject) => {
    db.query(`
      INSERT INTO
        users (name, email, password, role)
      VALUES
        (?, ?, ?, ?)
    `, [name, email, password, role],
    (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};

const selectAllUser = () => {
  return new Promise((resolve, reject) => {
    db.query(`
      SELECT id, name, email, role
      FROM users
    `, [],
    (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};

const selectUserByID = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`
      SELECT * FROM users WHERE id = ?
    `, [id],
    (err, res) => {
      if (err) reject(err);
      resolve(res[0]);
    });
  });
};

const selectUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.query(`
      SELECT * FROM users WHERE email = ?
    `, [email],
    (err, res) => {
      if (err) reject(err);
      resolve(res[0]);
    });
  });
};

const updateUser = (id, data) => {
  return new Promise((resolve, reject) => {
    db.query(`
      UPDATE users
      SET ?
      WHERE id = ?
    `, [data, id],
    (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};

const deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`
      DELETE FROM users WHERE id = ?
    `, [id],
    (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};

const selectRoleByID = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`
      SELECT *
      FROM roles
      WHERE id = ?
    `, [id],
    (err, res) => {
      if (err) reject(err);
      resolve(res[0]);
    });
  });
};

module.exports = {
  checkEmail,
  insertUser,
  selectAllUser,
  selectUserByID,
  selectUserByEmail,
  updateUser,
  deleteUser,
  selectRoleByID
};
