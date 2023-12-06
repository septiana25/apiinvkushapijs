const routes = (handler) => [
  {
    method: 'GET',
    path: '/shelves',
    handler: () => handler.getShelfHandler(),
  },
  {
    method: 'GET',
    path: '/shelves/{barcode}',
    handler: (request, h) => handler.getShelfByBarcodeHandler(request, h),
  },

];

module.exports = routes;
