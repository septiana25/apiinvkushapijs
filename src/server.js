const Hapi = require('@hapi/hapi');
const po = require('./api/po');
const items = require('./api/items');
const PoService = require('./services/mysql/PoService');
const ItemsService = require('./services/mysql/ItemsService');

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

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
