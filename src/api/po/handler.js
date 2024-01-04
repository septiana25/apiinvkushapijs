class PoHandler {
  constructor(service) {
    this._service = service;
  }

  async getPoHandler() {
    const po = await this._service.getPo();
    return {
      status: 'success',
      data: {
        po,
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
