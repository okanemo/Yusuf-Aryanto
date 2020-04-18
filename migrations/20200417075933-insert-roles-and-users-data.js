'use strict';

var dbm;
var type;
var seed;

const bcrypt = require('bcryptjs');

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.runSql(`
    INSERT INTO
      roles (id, name, create_permission, read_permission, update_permission, delete_permission)
    VALUES
      (1, 'Admin', 1, 1, 1, 1),
      (2, 'User', 0, 1, 0, 0)
  `).then(async () => {
    const adminPassword = await bcrypt.hash('admin', 10).then((pass) => { return pass });
    const userPassword = await bcrypt.hash('user', 10).then((pass) => { return pass });
    db.runSql(`
      INSERT INTO
        users (id, name, email, password, role)
      VALUES
        (1, 'Admin', 'admin@email.com', ?, 1),
        (2, 'User', 'user@email.com', ?, 2)
    `, [adminPassword, userPassword]);
  });
};

exports.down = function(db) {
  return db.runSql(`TRUNCATE TABLE users`).then(() => {
    db.runSql(`TRUNCATE TABLE roles`)
  });
};

exports._meta = {
  "version": 1
};
