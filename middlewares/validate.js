const createHttpError = require("http-errors");

function validate(Schema) {
  return async function (req, res, next) {
    try {
      const { error } = Schema.validate(req.body);

      if (error) {
        throw createHttpError.BadRequest(error.details[0].message);
      }

      next();
    } catch (e) {
      next(e);
    }
  };
}

module.exports = { validate };
