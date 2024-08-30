const ReturnsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'returns',
  version: '1.0.0',
  register: async (server, { service }) => {
    const returnsService = new ReturnsHandler(service);
    server.route(routes(returnsService));
  },
};
