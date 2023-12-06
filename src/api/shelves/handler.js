class ShelvesHandler {
  constructor(service) {
    this._service = service;
  }

  async getShelfByBarcodeHandler(request) {
    const { barcode } = request.params;
    const shelf = await this._service.getShelfByBarcode(barcode);

    return {
      status: 'success',
      data: {
        shelf,
      },
    };
  }
}

module.exports = ShelvesHandler;
