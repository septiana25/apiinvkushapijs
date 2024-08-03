class PoHandler {
  constructor(service) {
    this._service = service;
  }

  async getSoHandler() {
    const so = await this._service.getSo();
    return {
      status: 'success',
      data: {
        so,
      },
    };
  }

  async getPoByIdHandler(request) {
    const { id } = request.params;

    const po = await this._service.getPoById(id);
    return {
      status: 'success',
      data: {
        po,
      },
    };
  }

  async getPoByIdDetailHandler(request) {
    const { id } = request.params;

    const po = await this._service.getPoByIdDetail(id);
    return {
      status: 'success',
      data: {
        po,
      },
    };
  }
}

module.exports = PoHandler;
