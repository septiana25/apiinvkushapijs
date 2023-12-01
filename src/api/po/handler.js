class PoHandler {
  constructor(service) {
    this._service = service;

    this.getPoHandler = this.getPoHandler.bind(this);
    this.getPoByIdHandler = this.getPoByIdHandler.bind(this);
  }

  async getPoHandler() {
    const po = await this._service.getPo();
    return {
      status: 'success',
      data: po,
    };
  }

  async getPoByIdHandler(request) {
    const { id } = request.params;
    console.log(id);
    const po = await this._service.getPoById(id);
    return {
      status: 'success',
      data: po,
    };
  }
}

module.exports = PoHandler;
