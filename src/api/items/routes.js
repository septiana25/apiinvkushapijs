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
  {
    method: 'GET',
    path: '/item/shelf/{barcode}',
    handler: (request, h) => handler.getItemByShelfByBarcodeHandler(request, h),
  },
];

module.exports = routes;
