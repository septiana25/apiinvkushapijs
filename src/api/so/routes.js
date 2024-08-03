const routes = (handler) => [
  {
    method: 'GET',
    path: '/so',
    handler: () => handler.getSoHandler(),
  },
  {
    method: 'GET',
    path: '/so/{nopol}',
    handler: (request, h) => handler.getSoByIdHandler(request, h),
  },
  {
    method: 'GET',
    path: '/so/{id}/detail',
    handler: (request, h) => handler.getSoByIdDetailHandler(request, h),
  },

];

module.exports = routes;
