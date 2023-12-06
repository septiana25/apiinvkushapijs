const routes = (handler) => [
  {
    method: 'GET',
    path: '/item/{barcode}/{idMsk}',
    handler: (request, h) => handler.getItemByBarcodeByPoHandler(request, h),
  },
];

module.exports = routes;
