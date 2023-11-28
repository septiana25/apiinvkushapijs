const ClientError = require('../../exceptions/ClientError');

class ItemHandler {
  constructor(service) {
    this._service = service;

    this.getItemByBarcodeHandler = this.getItemByBarcodeHandler.bind(this);
  }

  async getItemByBarcodeHandler(request, h) {
    try {
      const { barcode } = request.params;

      const item = await this._service.getItemByIdBarcode(barcode);

      return {
        status: 'success',
        data: item[0],
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });

      response.code(500);
      return response;
    }
  }
}

module.exports = ItemHandler;
