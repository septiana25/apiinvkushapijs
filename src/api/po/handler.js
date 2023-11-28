const ClientError = require('../../exceptions/ClientError');

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

  async getPoByIdHandler(request, h) {
    try {
      const { id } = request.params;
      console.log(id);
      const po = await this._service.getPoById(id);
      return {
        status: 'success',
        data: po,
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
        status: 'erorr',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }
}

module.exports = PoHandler;
