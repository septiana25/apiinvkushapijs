class ItemHandler {
  constructor(itemsService, validator) {
    this._service = itemsService;
    this._validator = validator;
  }

  async postItemHandler(request, h) {
    console.log(request);
    this._validator.validateItemPayload(request.payload);
    const { idBrg, barcodeBrg, qty } = request.payload;
    // await this._service.addItem({ idBrg, barcodeBrg, qty });

    /* const response = h.response({
      status: 'success',
      message: 'Item berhasil ditambahkan',
    });
    response.code(201);
    return response; */
  }

  async getItemByBarcodeByPoHandler(request) {
    const { barcode, idMsk } = request.params;
    const item = await this._service.getItemByIdBarcodeByPo(barcode, idMsk);

    return {
      status: 'success',
      data: {
        item,
      },
    };
  }

  async getItemByShelfByBarcodeHandler(request) {
    const { barcode } = request.params;
    const currentDate = new Date();
    const options = { timeZone: 'Asia/Jakarta', month: '2-digit' };
    const month = currentDate.toLocaleString('en-US', options);
    const year = currentDate.getFullYear();
    const items = await this._service.getItemByBarcodeShelf(barcode, month, year);

    return {
      status: 'success',
      data: {
        items,
      },
    };
  }
}

module.exports = ItemHandler;
