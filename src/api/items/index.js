const ItemHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'item',
  version: '1.0.0',
  register: async (server, { service }) => {
    const itemHandler = new ItemHandler(service);
    server.route(routes(itemHandler));
  },
};
