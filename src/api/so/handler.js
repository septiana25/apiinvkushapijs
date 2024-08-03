class SoHandler {
  constructor(service) {
    this._service = service;
  }

  async getSoHandler() {
    const so = await this._service.getSo();
    return {
      status: 'success',
      data: {
        so,
      },
    };
  }

  async getSoByNopolHandler(request) {
    const { nopol } = request.params;

    const soList = await this._service.getSoByNopol(nopol);
    // Mengelompokkan hasil berdasarkan nopol, supir, dan jenis
    const groupedSo = soList.reduce((acc, item) => {
      const key = `${item.nopol}_${item.supir}_${item.jenis}`;
      if (!acc[key]) {
        acc[key] = {
          nopol: item.nopol,
          supir: item.supir,
          jenis: item.jenis,
          details: [],
        };
      }
      // Menghapus properti nopol, supir, dan jenis dari item
      const {
        nopol: _, supir: __, jenis: ___, ...itemWithoutNopolSupirJenis
      } = item;
      acc[key].details.push(itemWithoutNopolSupirJenis);
      return acc;
    }, {});

    return {
      status: 'success',
      data: {
        so: Object.values(groupedSo),
      },
    };
  }

  async getPoByIdDetailHandler(request) {
    const { id } = request.params;

    const po = await this._service.getPoByIdDetail(id);
    return {
      status: 'success',
      data: {
        po,
      },
    };
  }
}

module.exports = SoHandler;
