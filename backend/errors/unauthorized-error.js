// eslint-disable-next-line @typescript-eslint/no-var-requires
const { STATUS_UNAUTHORIZED_ERROR } = require('../utils/constants');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS_UNAUTHORIZED_ERROR;
  }
}

module.exports = UnauthorizedError;
