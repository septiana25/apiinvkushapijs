const routes = (handler) => [
  {
    method: 'GET',
    path: '/item/{barcode}/{idMsk}',
    handler: (request, h) => handler.getItemByBarcodeByPoHandler(request, h),
  },
  {
    method: 'POST',
    path: '/item',
    handler: (request, h) => handler.postItemHandler(request, h),
  },
];

module.exports = routes;
