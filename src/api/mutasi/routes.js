const routes = (handler) => [
  {
    method: 'POST',
    path: '/mutasi/save',
    handler: (request, h) => handler.postMutasiHandler(request, h),
  },
  {
    method: 'GET',
    path: '/mutasi',
    handler: () => handler.getMutasiHandler(),
  },
  {
    method: 'GET',
    path: '/mutasi/{idDetailSaldo}',
    handler: (request) => handler.getMutasiByDetailSaldoHandler(request),
  },
];

module.exports = routes;
