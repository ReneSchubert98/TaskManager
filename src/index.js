import { openDB } from 'idb';

const dbPromise = openDB('task-manager-db', 1, {
  upgrade(db) {
    db.createObjectStore('tasks');
  },
});