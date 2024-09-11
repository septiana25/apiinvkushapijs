const ReturnsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'returns',
  version: '1.0.0',
  register: async (server, { service, itemsService }) => {
    const returnsHandler = new ReturnsHandler(service, itemsService);
    server.route(routes(returnsHandler));
  },
};
