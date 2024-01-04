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
  {
    method: 'GET',
    path: '/po/{id}/detail',
    handler: (request, h) => handler.getPoByIdDetailHandler(request, h),
  },

];

module.exports = routes;
