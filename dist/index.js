"use strict";

var _idb = require("idb");
var dbPromise = (0, _idb.openDB)('task-manager-db', 1, {
  upgrade: function upgrade(db) {
    db.createObjectStore('tasks');
  }
});