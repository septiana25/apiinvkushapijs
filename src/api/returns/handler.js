/* eslint-disable camelcase */
class ReturnsHandler {
  constructor(returnsService, itemsService) {
    this._returnsService = returnsService;
    this._itemsService = itemsService;
  }

  async postReturnsHandler(request, h) {
    const { idRak, barcode, unit } = request.payload;

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
      const result = await this._returnsService.postReturns(id_brg, idRak, qty);
      if (result.affectedRows === 0) {
        // Jika penyimpanan gagal
        return h.response({
          status: 'fail',
          message: 'Gagal menyimpan data returns',
        }).code(500);
      }

      // Jika penyimpanan berhasil
      return h.response({
        status: 'success',
        message: 'Data berhasil ditambahkan',
      }).code(201);
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
}

module.exports = ReturnsHandler;
