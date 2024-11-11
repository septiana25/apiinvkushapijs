/* eslint-disable camelcase */
class MutasiHandler {
  constructor(mutasiService, itemsService) {
    this._mutasiService = mutasiService;
    this._itemsService = itemsService;
  }

  async postMutasiHandler(request, h) {
    const {
      idRak, barcode, unit, user,
    } = request.payload;
    console.log(request.payload);

    try {
      const item = await this._itemsService.getItemByBarcode(barcode);
      if (!item || item.length === 0) {
        return h.response({
          status: 'fail',
          message: 'Item tidak ditemukan',
        }).code(404);
      }

      const { id_brg, qty_pack } = item[0];
      const qty = unit === 'pack' ? qty_pack : 1;

      // Mencoba menyimpan mutasi
      const result = await this._mutasiService.postMutasi(id_brg, idRak, qty, user);
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
