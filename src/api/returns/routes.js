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
    path: '/returns/{barcode}',
    handler: (request, h) => handler.getReturnsByBarcodeHandler(request, h),
  },

];

module.exports = routes;
