const MySQL = require('mysql2');
const NotFoundError = require('../../exceptions/NotFoundError');
const { mapDBToPo } = require('../../untils');

class PoService {
  constructor() {
    this._conn = MySQL.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
  }

  async getPo() {
    const result = await this._conn.promise().execute(`
      SELECT masuk.id_msk AS id_msk, suratJln
      FROM pomasuk
      LEFT JOIN masuk USING(id_msk)
      WHERE status = ?
      GROUP BY id_msk`, ['INPG']);
    // console.log(result[0].length);
    return result[0];
  }

  async getPoById(id) {
    const result = await this._conn.promise().execute(`
      SELECT masuk.id_msk AS id_msk, suratJln, DATE_FORMAT(tgl, '%Y-%m-%d %H:%i:%s') as tgl
      FROM pomasuk
      LEFT JOIN masuk USING(id_msk)
      WHERE masuk.id_msk = ?
      AND status = ? GROUP BY masuk.id_msk`, [id, 'INPG']);

    if (!result[0].length) {
      throw new NotFoundError('Data tidak ditemukan');
    }
    const itemsQuery = `
      SELECT brg, rak, qty_po
      FROM pomasuk
      LEFT JOIN barcodebrg USING(id_barcodebrg)
      LEFT JOIN barang USING(id_brg)
      LEFT JOIN barcoderak USING(id_barcoderak)
      LEFT JOIN rak USING(id_rak)
      WHERE id_msk = ?
      AND pomasuk.status = ?
    `;
    const itemsResult = await this._conn.promise()
      .execute(itemsQuery, [id, 'INPG']);

    const items = itemsResult[0];

    result[0][0] = {
      ...result[0][0],
      items,
    };

    return result[0].map(mapDBToPo)[0];
  }

  async getPoByIdDetail(id) {
    const result = await this._conn.promise().execute(`
    SELECT masuk.id_msk AS id_msk, brg, rak, qty_po
      FROM pomasuk
      LEFT JOIN masuk USING(id_msk)
      LEFT JOIN barcodebrg USING(id_barcodebrg)
      LEFT JOIN barang USING(id_brg)
      LEFT JOIN barcoderak USING(id_barcoderak)
      LEFT JOIN rak USING(id_rak)
      WHERE masuk.id_msk = ?
      AND pomasuk.status = ?`, [id, 'INPG']);

    if (!result[0].length) {
      throw new NotFoundError('Data tidak ditemukan');
    }
    return result[0];
  }
}

module.exports = PoService;
