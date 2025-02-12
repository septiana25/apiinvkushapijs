/* eslint-disable camelcase */
class ReturnsHandler {
  constructor(returnsService, itemsService) {
    this._returnsService = returnsService;
    this._itemsService = itemsService;
  }

  async postReturnsHandler(request, h) {
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

      // Mencoba menyimpan returns
      const result = await this._returnsService.postReturns(id_brg, idRak, qty, user);
      console.log(result);
      if (result.affectedRows === 0) {
        // Jika penyimpanan gagal
        return h.response({
          status: 'fail',
          message: 'Gagal menyimpan data returns',
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

  async getReturnsHandler() {
    const returns = await this._returnsService.getReturns();
    return {
      status: 'success',
      data: {
        returns,
      },
    };
  }

  async getReturnsByRakHandler(request) {
    const { idRak } = request.params;
    const returns = await this._returnsService.getReturnsByRak(idRak);
    return {
      status: 'success',
      data: { returns },
    };
  }
}

module.exports = ReturnsHandler;
