const MySQL = require('mysql2');
const NotFoundError = require('../../exceptions/NotFoundError');
const { mapDBToRak } = require('../../untils');

class ShelvesService {
  constructor() {
    this._conn = MySQL.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
  }

  async getShelfByBarcode(barcode) {
    const result = await this._conn.promise().execute(`
        SELECT id_rak, barcode_rak, rak
        FROM barcoderak
        LEFT JOIN rak USING(id_rak)
        WHERE barcode_rak = ?`, [barcode]);

    if (!result[0].length) {
      throw new NotFoundError('Data tidak ditemukan');
    }

    return result[0].map(mapDBToRak)[0];
  }
}

module.exports = ShelvesService;
