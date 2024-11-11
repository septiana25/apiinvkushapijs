const MySQL = require('mysql2');
const NotFoundError = require('../../exceptions/NotFoundError');
// const { mapDBToRak } = require('../../untils');

class MutasiService {
  constructor() {
    this._conn = MySQL.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
  }

  async postMutasi(idDetailSaldo, idRak, qty, user) {
    const query = `
      INSERT INTO tmp_mutasi (id_detailsaldo, id_rak, qty, user)
      VALUES (?, ?, ?, ?)
    `;
    const result = await this._conn.promise().execute(query, [idDetailSaldo, idRak, qty, user]);
    return result[0];
  }

  async getMutasi() {
    const result = await this._conn.promise().execute(`
      SELECT id_brg, id_rak, brg, rak, sum(qty) as sisa
        FROM tmp_retur
        LEFT JOIN barang USING(id_brg)
        LEFT JOIN rak USING(id_rak)
        WHERE sisa_qty > ?
        GROUP BY id_brg, id_rak`, [0]);
    if (!result[0].length) {
      throw new NotFoundError('Data tidak ditemukan');
    }
    return result[0];
  }

  async getMutasiUnprocessed(idDetailSaldo) {
    const result = await this._conn.promise().execute(`
      SELECT id_mutasi
        FROM tmp_mutasi
        WHERE id_detailsaldo = ? AND at_update IS NULL
        `, [idDetailSaldo]);
    if (!result[0].length) {
      return false;
    }
    return true;
  }

  async getMutasiByDetailSaldo(idDetailSaldo) {
    const result = await this._conn.promise().execute(`
      SELECT id_brg, id_rak, brg, rak, sum(qty) as sisa
        FROM tmp_mutasi
        LEFT JOIN barang USING(id_brg)
        LEFT JOIN rak USING(id_rak)
        WHERE id_detail_saldo = ? AND sisa_qty > ?
        GROUP BY id_brg, id_rak`, [idDetailSaldo, 0]);
    if (!result[0].length) {
      throw new NotFoundError('Data tidak ditemukan');
    }
    return result[0];
  }
}

module.exports = MutasiService;
