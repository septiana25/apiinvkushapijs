class ReturnsHandler {
  constructor(service) {
    this._service = service;
  }

  async getReturnsHandler() {
    const returns = await this._service.getReturns();
    return {
      status: 'success',
      data: {
        returns,
      },
    };
  }
}

module.exports = ReturnsHandler;
