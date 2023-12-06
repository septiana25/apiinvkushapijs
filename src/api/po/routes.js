const routes = (handler) => [
  {
    method: 'GET',
    path: '/po',
    handler: () => handler.getPoHandler(),
  },
  {
    method: 'GET',
    path: '/po/{id}',
    handler: (request, h) => handler.getPoByIdHandler(request, h),
  },

];

module.exports = routes;
