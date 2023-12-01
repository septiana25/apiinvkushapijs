const Hapi = require('@hapi/hapi');
const po = require('./api/po');
const items = require('./api/items');
const PoService = require('./services/mysql/PoService');
const ItemsService = require('./services/mysql/ItemsService');
const ClientError = require('./exceptions/ClientError');

const init = async () => {
  const poService = new PoService();
  const itemsService = new ItemsService();
  const server = Hapi.server({
    port: 3000,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    {
      plugin: items,
      options: {
        service: itemsService,
      },
    },
    {
      plugin: po,
      options: {
        service: poService,
      },
    },
  ]);

  server.ext('onPreResponse', (request, h) => {
    const { response } = request;

    if (response instanceof Error) {
      if (response instanceof ClientError) {
        const newResponse = h.response({
          status: 'fail',
          message: response.message,
        });
        newResponse.code(response.statusCode);
        return newResponse;
      }

      if (!response.isServer) {
        return h.continue;
      }

      const newResponse = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      newResponse.code(500);
      return newResponse;
    }

    return h.continue;
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
