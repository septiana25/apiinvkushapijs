const MySQL = require('mysql2');
const NotFoundError = require('../../exceptions/NotFoundError');

class ItemsService {
  constructor() {
    this._conn = MySQL.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'inventorikus',
    });
  }

  async getItemByIdBarcodeByPo(barcode, idMsk) {
    const result = await this._conn.promise().execute(`
        SELECT id_msk, barang.id_brg, brg, id_barcode, barcode, qty
        FROM barcode_brg 
        LEFT JOIN barang USING(id_brg)
        LEFT JOIN po_masuk USING(id_barcode)
        WHERE barcode = ? AND id_msk = ?`, [barcode, idMsk]);

    if (!result[0].length) {
      throw new NotFoundError('Data tidak ditemukan');
    }
    return result[0];
  }
}

module.exports = ItemsService;
