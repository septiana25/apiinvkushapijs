const MySQL = require('mysql2');
const NotFoundError = require('../../exceptions/NotFoundError');

class PoService {
  constructor() {
    this._conn = MySQL.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'inventorikus',
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
    console.log(id);
    const result = await this._conn.promise().execute(`
      SELECT id_po_msk, masuk.id_msk AS id_msk, suratJln
      FROM po_masuk
      LEFT JOIN masuk USING(id_msk)
      WHERE masuk.id_msk = ?
      AND status = ? LIMIT 1`, [id, 'INPG']);

    if (!result[0].length) {
      throw new NotFoundError('Data tidak ditemukan');
    }
    return result[0];
  }
}

module.exports = PoService;
