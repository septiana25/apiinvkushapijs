class NotesHandler {
  constructor(service) {
    this._service = service;

    this.getNotesHandler = this.getNotesHandler.bind(this);
  }

  getNotesHandler() {
    const notes = this._service.getNotes();
    return {
      status: 'success',
      data: {
        notes,
      },
    };
  }
}

module.exports = NotesHandler;
