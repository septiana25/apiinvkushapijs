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

    // Fungsi untuk mengurutkan rak
    const sortRak = (a, b) => {
      const aMatch = a.rak.match(/([A-Za-z]+)(\d+)\.(\d+)/);
      const bMatch = b.rak.match(/([A-Za-z]+)(\d+)\.(\d+)/);
      if (aMatch && bMatch) {
        if (aMatch[1] !== bMatch[1]) return aMatch[1].localeCompare(bMatch[1]);
        const a2 = parseInt(aMatch[2], 10);
        const b2 = parseInt(bMatch[2], 10);
        if (a2 !== b2) return a2 - b2;
        return parseInt(aMatch[3], 10) - parseInt(bMatch[3], 10);
      }
      return a.rak.localeCompare(b.rak);
    };

    // Mengurutkan details untuk setiap grup
    Object.values(groupedSo).forEach((group) => {
      group.details.sort(sortRak);
    });

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
