class SoHandler {
  constructor(service) {
    this._service = service;
  }

  async postPickerSoHandler(request, h) {
    try {
      const { nopol, id } = request.payload;
      const so = await this._service.getSoByNopolByid(nopol, id);
      if (!so || !Array.isArray(so) || so.length === 0) {
        const response = h.response({
          status: 'fail',
          message: 'Data SO tidak ditemukan',
        });
        response.code(404);
        return response;
      }
      // Memperbarui at_update untuk setiap id_pro
      const updatePromises = so.map((item) => this._service.updateAtUpdate(item.id_pro));
      await Promise.all(updatePromises);
      const response = h.response({
        status: 'success',
        message: 'SO berhasil diperbarui',
      });
      response.code(200);
      return response;
    } catch (error) {
      const response = h.response({
        status: 'error',
        message: 'Terjadi kesalahan pada server',
      });
      response.code(500);
      return response;
    }
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

  async getSoByIdNopolHandler(request) {
    const { nopol, id } = request.params;
    const so = await this._service.getSoByNopolByid(nopol, id);
    return {
      status: 'success',
      data: {
        so,
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
