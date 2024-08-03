const MySQL = require('mysql2');
// const NotFoundError = require('../../exceptions/NotFoundError');
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
}

module.exports = SoService;
