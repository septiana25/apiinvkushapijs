/* eslint-disable camelcase */
class MutasiHandler {
  constructor(mutasiService, itemsService) {
    this._mutasiService = mutasiService;
    this._itemsService = itemsService;
  }

  async postMutasiHandler(request, h) {
    const {
      idDetailSaldo, idRak, qty, user,
    } = request.payload;
    console.log(request.payload);

    try {
      const isUnprocessed = await this._mutasiService.getMutasiUnprocessed(idDetailSaldo);
      console.log(isUnprocessed);
      if (isUnprocessed) {
        return h.response({
          status: 'fail',
          message: 'Mutasi item ini sedang di proses',
        }).code(400);
      }
      // Mencoba menyimpan mutasi
      const result = await this._mutasiService.postMutasi(idDetailSaldo, idRak, qty, user);
      console.log(result);
      if (result.affectedRows === 0) {
        // Jika penyimpanan gagal
        return h.response({
          status: 'fail',
          message: 'Gagal menyimpan data mutasi',
        }).code(500);
      }

      // Jika penyimpanan berhasil
      return {
        status: 'success',
        message: 'Data berhasil ditambahkan',
      };
    } catch (error) {
      return h.response({
        status: 'error',
        message: 'Terjadi kesalahan pada server',
      }).code(500);
    }
  }

  async getMutasiHandler() {
    const mutasi = await this._mutasiService.getMutasi();
    return {
      status: 'success',
      data: {
        mutasi,
      },
    };
  }

  async getMutasiByRakHandler(request) {
    const { idRak } = request.params;
    const mutasi = await this._mutasiService.getMutasiByRak(idRak);
    return {
      status: 'success',
      data: { mutasi },
    };
  }
}

module.exports = MutasiHandler;
