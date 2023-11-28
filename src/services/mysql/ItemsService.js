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

  async getItemByIdBarcode(barcode) {
    const result = await this._conn.promise().execute(`
        SELECT barang.id_brg, brg, barcode, qty
        FROM barcode_brg 
        LEFT JOIN barang USING(id_brg)
        WHERE barcode = ?`, [barcode]);

    if (!result[0].length) {
      throw new NotFoundError('Data tidak ditemukan');
    }
    return result[0];
  }
}

module.exports = ItemsService;
