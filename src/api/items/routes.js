const routes = (handler) => [
  {
    method: 'GET',
    path: '/item/{barcode}/{idMsk}',
    handler: handler.getItemByBarcodeByPoHandler,
  },
];

module.exports = routes;
