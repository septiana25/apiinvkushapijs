const MutasiHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'Mutasi',
  version: '1.0.0',
  register: async (server, { service, itemsService }) => {
    const mutasiHandler = new MutasiHandler(service, itemsService);
    server.route(routes(mutasiHandler));
  },
};
