const MySQL = require('mysql2');
// const NotFoundError = require('../../exceptions/NotFoundError');
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

  async postReturns(idBrg, idRak, qty, user) {
    const query = `
      INSERT INTO tmp_retur (id_brg, id_rak, qty, sisa_qty, user)
      VALUES (?, ?, ?, ?, ?)
    `;
    const result = await this._conn.promise().execute(query, [idBrg, idRak, qty, qty, user]);
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
    // console.log(result[0].length);
    return result[0];
  }

  async getMutasiByDetailSaldo(idDetailSaldo) {
    const result = await this._conn.promise().execute(`
      SELECT id_brg, id_rak, brg, rak, sum(qty) as sisa
        FROM tmp_retur
        LEFT JOIN barang USING(id_brg)
        LEFT JOIN rak USING(id_rak)
        WHERE id_detail_saldo = ? AND sisa_qty > ?
        GROUP BY id_brg, id_rak`, [idDetailSaldo, 0]);
    return result[0];
  }
}

module.exports = MutasiService;
