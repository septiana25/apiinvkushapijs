const routes = (handler) => [
  {
    method: 'GET',
    path: '/po',
    handler: handler.getPoHandler,
  },
  {
    method: 'GET',
    path: '/po/{id}',
    handler: handler.getPoByIdHandler,
  },

];

module.exports = routes;
