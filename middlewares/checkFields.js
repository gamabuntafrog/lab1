const createError = require("http-errors");

function checkFields(fields) {
  return async function (req, res, next) {
    try {
      for (const field of fields) {
        if (!req.body[field]) {
          throw createError.BadRequest(`${field} required`);
        }
      }

      next();
    } catch (err) {
      next(err);
    }
  };
}

module.exports = {
  checkFields,
};
