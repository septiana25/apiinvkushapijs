require('dotenv').config();
const MySQL = require('mysql2');
const NotFoundError = require('../../exceptions/NotFoundError');
const { mapDBToItem } = require('../../untils');

class ItemsService {
  constructor() {
    const pool = MySQL.createPool({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    const promisePool = pool.promise();
    this._conn = promisePool;
  }

  async addItem({ idBrg, barcodeBrg, qty }) {
    const result = await this._conn.execute('INSERT INTO barcodebrg VALUES(?, ?, ?, ?)', [idBrg, barcodeBrg, qty]);
    console.log(result);

  // return result[0].affectedRows;
  }

  async getItemByIdBarcodeByPo(barcode, idMsk) {
    const result = await this._conn.execute(`
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
