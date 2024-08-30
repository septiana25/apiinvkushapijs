const routes = (handler) => [
  {
    method: 'GET',
    path: '/returns',
    handler: () => handler.getReturnsHandler(),
  },
  {
    method: 'GET',
    path: '/returns/{barcode}',
    handler: (request, h) => handler.getReturnsByBarcodeHandler(request, h),
  },

];

module.exports = routes;
