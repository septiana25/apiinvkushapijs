const MySQL = require('mysql2');
const NotFoundError = require('../../exceptions/NotFoundError');
const { mapDBToPo } = require('../../untils');

class PoService {
  constructor() {
    this._conn = MySQL.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
  }

  async getPo() {
    const result = await this._conn.promise().execute(`
      SELECT masuk.id_msk AS id_msk, suratJln
      FROM po_masuk
      LEFT JOIN masuk USING(id_msk)
      WHERE status = ?
      GROUP BY id_msk`, ['INPG']);
    // console.log(result[0].length);
    return result[0];
  }

  async getPoById(id) {
    const result = await this._conn.promise().execute(`
      SELECT masuk.id_msk AS id_msk, suratJln
      FROM po_masuk
      LEFT JOIN masuk USING(id_msk)
      WHERE masuk.id_msk = ?
      AND status = ? LIMIT 1`, [id, 'INPG']);

    if (!result[0].length) {
      throw new NotFoundError('Data tidak ditemukan');
    }
    return result[0].map(mapDBToPo)[0];
  }
}

module.exports = PoService;
