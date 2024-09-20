const routes = (handler) => [
  {
    method: 'POST',
    path: '/returns/save',
    handler: (request, h) => handler.postReturnsHandler(request, h),
  },
  {
    method: 'GET',
    path: '/returns',
    handler: () => handler.getReturnsHandler(),
  },
  {
    method: 'GET',
    path: '/returns/{idRak}',
    handler: (request) => handler.getReturnsByRakHandler(request),
  },
];

module.exports = routes;
