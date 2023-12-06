/* eslint-disable camelcase */

const mapDBToItem = ({
  id_msk,
  id_brg,
  barcode_brg,
  ...args
}) => ({
  idMsk: id_msk,
  idBrg: id_brg,
  barcodeBrg: barcode_brg,
  ...args,
});

const mapDBToPo = ({
  id_msk,
  ...args
}) => ({
  idMsk: id_msk,
  ...args,
});

const mapDBToRak = ({
  id_rak,
  barcode_rak,
  ...args
}) => ({
  idRak: id_rak,
  barcodeRak: barcode_rak,
  ...args,
});

module.exports = {
  mapDBToItem,
  mapDBToPo,
  mapDBToRak,
};
