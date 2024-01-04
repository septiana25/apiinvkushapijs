const ItemHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'item',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const itemHandler = new ItemHandler(
      service.itemsService,
      validator,
    );
    server.route(routes(itemHandler));
  },
};
