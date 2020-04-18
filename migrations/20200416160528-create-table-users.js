'use strict';

var dbm;
var type;
var seed;

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
  return db.createTable('users', {
    id: {type: 'int', primaryKey: true, autoIncrement: true},
    name: 'string',
    email: 'string',
    password: 'string',
    role: 'int'
  }).then(() => {
    db.createTable('roles', {
      id: {type: 'int', primaryKey: true, autoIncrement: true},
      name: 'string',
      create_permission: 'boolean',
      read_permission: 'boolean',
      update_permission: 'boolean',
      delete_permission: 'boolean',
    });
  });
};

exports.down = function(db) {
  return db.dropTable('roles').then(() => {
    db.dropTable('users');
  });
};

exports._meta = {
  "version": 1
};
