const MySQL = require('mysql2');
// const NotFoundError = require('../../exceptions/NotFoundError');
// const { mapDBToRak } = require('../../untils');

class ReturnsService {
  constructor() {
    this._conn = MySQL.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
  }

  async getReturns() {
    const result = await this._conn.promise().execute(`
      SELECT id, brg, rak, sisa_qty as sisa
        FROM tmp_retur
        LEFT JOIN detail_brg USING(id)
        LEFT JOIN barang USING(id_brg)
        LEFT JOIN rak USING(id_rak)
        WHERE sisa_qty > ?`, [0]);
    // console.log(result[0].length);
    return result[0];
  }
}

module.exports = ReturnsService;
