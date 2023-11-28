const PoHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'po',
  version: '1.0.0',
  register: async (server, { service }) => {
    const poHandler = new PoHandler(service);
    server.route(routes(poHandler));
  },
};
