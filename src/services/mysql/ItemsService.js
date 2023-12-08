require('dotenv').config();
const MySQL = require('mysql2');
const NotFoundError = require('../../exceptions/NotFoundError');
const { mapDBToItem } = require('../../untils');

class ItemsService {
  constructor() {
    this._conn = MySQL.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
  }

  async getItemByIdBarcodeByPo(barcode, idMsk) {
    const result = await this._conn.promise().execute(`
        SELECT id_msk, barang.id_brg, brg, barcode_brg, qty
        FROM barcodebrg 
        LEFT JOIN barang USING(id_brg)
        LEFT JOIN pomasuk USING(id_barcodebrg)
        WHERE barcode_brg = ? AND id_msk = ?`, [barcode, idMsk]);
    if (!result[0].length) {
      throw new NotFoundError('Data tidak ditemukan');
    }
    console.log(result[0]);
    return result[0].map(mapDBToItem)[0];
  }
}

module.exports = ItemsService;
