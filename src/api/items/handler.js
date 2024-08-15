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

    // check database apakah sudah peremajaan
    const dateBalance = await this._service.getDateBalance();
    const { month, year } = dateBalance[0];

    const items = await this._service.getItemByBarcodeShelf(barcode, month, year);
    // gourping by item same
    const itemGroup = items.reduce((acc, item) => {
      const key = `${item.id_brg}_${item.brg}_${item.saldo_awal}_${item.saldo_akhir}`;
      if (!acc[key]) {
        acc[key] = {
          id_brg: item.id_brg,
          brg: item.brg,
          saldo_awal: item.saldo_awal,
          saldo_akhir: item.saldo_akhir,
          details: [],
        };
      }
      const {
        id_brg: _, brg: __, saldo_awal: ___, saldo_akhir: ____, ...itemWithout
      } = item;
      acc[key].details.push(itemWithout);

      return acc;
    }, {});
    return {
      status: 'success',
      data: {
        items: Object.values(itemGroup),
      },
    };
  }
}

module.exports = ItemHandler;
