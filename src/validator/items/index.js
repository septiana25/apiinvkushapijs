const ItemPayloadSchema = require('./schema');
const InvariantError = require('../../exceptions/InvariantError');

const ItemsValidator = {
  validateItemPayload: (payload) => {
    const validationResult = ItemPayloadSchema.validate(payload);

    if (validationResult.error) throw new InvariantError(validationResult.error.message);
  },
};

module.exports = ItemsValidator;
