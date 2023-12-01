class ItemHandler {
  constructor(service) {
    this._service = service;

    this.getItemByBarcodeByPoHandler = this.getItemByBarcodeByPoHandler.bind(this);
  }

  async getItemByBarcodeByPoHandler(request) {
    const { barcode, idMsk } = request.params;

    const item = await this._service.getItemByIdBarcodeByPo(barcode, idMsk);

    return {
      status: 'success',
      data: item[0],
    };
  }
}

module.exports = ItemHandler;
