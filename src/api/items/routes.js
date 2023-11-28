const routes = (handler) => [
  {
    method: 'GET',
    path: '/item/{barcode}',
    handler: handler.getItemByBarcodeHandler,
  },
];

module.exports = routes;
