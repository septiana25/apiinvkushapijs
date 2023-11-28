const MySQL = require('mysql2');

class Database {
  constructor() {
    this._conn = MySQL.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'inventorikus',
    });
  }
}

module.exports = Database;
