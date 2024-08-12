class ItemHandler {
  constructor(itemsService, validator) {
    this._service = itemsService;
    this._validator = validator;
  }

  async postItemHandler(request, h) {
    console.log(request);
    this._validator.validateItemPayload(request.payload);
    const { idBrg, barcodeBrg, qty } = request.payload;
    await this._service.addItem({ idBrg, barcodeBrg, qty });

    const response = h.response({
      status: 'success',
      message: 'Item berhasil ditambahkan',
    });
    response.code(201);
    return response;
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

  async getItemByBarcodeHandler(request) {
    const { barcode } = request.params;
    const item = await this._service.getItemByBarcode(barcode);

    return {
      status: 'success',
      data: {
        item,
      },
    };
  }

  async getItemByShelfByBarcodeHandler(request) {
    const { barcode } = request.params;
    /* const currentDate = new Date();
    const options = { timeZone: 'Asia/Jakarta', month: '2-digit' };
    const month = currentDate.toLocaleString('en-US', options);
    const year = currentDate.getFullYear(); */
    // check database apakah sudah peremajaan
    const dateBalance = await this._service.getDateBalance();
    const { month, year } = dateBalance[0];

    const items = await this._service.getItemByBarcodeShelf(barcode, month, year);
    console.log(items);

    return {
      status: 'success',
      data: {
        items,
      },
    };
  }
}

module.exports = ItemHandler;
