const Joi = require('joi');

const ItemPayloadSchema = Joi.object({
  idBrg: Joi.number().required(),
  barcodeBrg: Joi.number().required(),
  qty: Joi.number().required(),
});

module.exports = ItemPayloadSchema;
