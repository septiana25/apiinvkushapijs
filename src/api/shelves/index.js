const ShelvesHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'shelves',
  version: '1.0.0',
  register: async (server, { service }) => {
    const shelvesService = new ShelvesHandler(service);
    server.route(routes(shelvesService));
  },
};
