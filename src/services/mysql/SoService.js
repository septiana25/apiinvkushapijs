const MySQL = require('mysql2');
const NotFoundError = require('../../exceptions/NotFoundError');
/* const { mapDBToSo } = require('../../untils'); */

class SoService {
  constructor() {
    this._conn = MySQL.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
  }

  async getSo() {
    const result = await this._conn.promise().execute(`
      SELECT nopol, supir, no_nota, tmp_prossessso.at_create AS tgl, COUNT(DISTINCT tmp_salesorder.no_faktur) AS faktur
            FROM tmp_prossessso
            LEFT JOIN tmp_salesorder USING(id_so)
            LEFT JOIN ekspedisi USING(nopol)
            WHERE no_nota IS NULL
            GROUP BY nopol ORDER BY tgl ASC`);
    // console.log(result[0].length);
    return result[0];
  }

  async getSoByNopol(nopol) {
    const result = await this._conn.promise().execute(`
        SELECT id_pro, detail_brg.id, id_detailsaldo, jenis, nopol, supir, id_toko, toko.toko AS toko, barang.kdbrg, barang.brg, rak, tahunprod, SUM(qty_pro) AS qty_pro
            FROM tmp_prossessso
            LEFT JOIN tmp_salesorder USING(id_so)
            LEFT JOIN ekspedisi USING(nopol)
            LEFT JOIN toko USING(kode_toko)
            LEFT JOIN detail_saldo USING(id_detailsaldo) 
            LEFT JOIN detail_brg USING(id)
            LEFT JOIN barang USING(id_brg)
            LEFT JOIN rak USING(id_rak)
            WHERE no_nota IS NULL AND nopol = ?
            GROUP BY detail_brg.id`, [nopol]);

    if (!result[0].length) {
      throw new NotFoundError('Data tidak ditemukan');
    }
    return result[0];
  }
}

module.exports = SoService;
