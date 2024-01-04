require('dotenv').config();

const Hapi = require('@hapi/hapi');

const ClientError = require('./exceptions/ClientError');

const po = require('./api/po');
const PoService = require('./services/mysql/PoService');

const items = require('./api/items');
const ItemsService = require('./services/mysql/ItemsService');
const ItemsValidator = require('./validator/items');

const shelves = require('./api/shelves');

const ShelvesService = require('./services/mysql/ShelvesService');

const init = async () => {
  const poService = new PoService();
  const itemsService = new ItemsService();
  const shelvesService = new ShelvesService();
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.NODE_ENV !== 'production' ? process.env.HOST : '0.0.0.0',
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
        service: { itemsService },
        validator: ItemsValidator,
      },
    },
    {
      plugin: po,
      options: {
        service: poService,
      },
    },
    {
      plugin: shelves,
      options: {
        service: shelvesService,
      },
    },
  ]);

  server.ext('onPreResponse', (request, h) => {
    const { response } = request;
    console.log(response);
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
