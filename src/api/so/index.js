const SoHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'so',
  version: '1.0.0',
  register: async (server, { service }) => {
    const soHandler = new SoHandler(service);
    server.route(routes(soHandler));
  },
};
