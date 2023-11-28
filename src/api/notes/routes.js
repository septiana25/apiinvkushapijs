const routes = (handler) => [
  {
    method: 'GET',
    path: '/notes',
    handler: handler.getNotesHandler,
  },

];

module.exports = routes;
