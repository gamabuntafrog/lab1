const createError = require("http-errors");

const ObjectId = require("mongoose").Types.ObjectId;

function checkId(fieldName) {
  return async function (req, res, next) {
    try {
      const userId = req.params[fieldName];

      if (!ObjectId.isValid(userId)) {
        throw createError.BadRequest("User id is not valid");
      }

      const user = await userService.findById(userId);

      if (!user) {
        throw createError.NotFound("User with such id not found");
      }

      next();
    } catch (err) {
      next(err);
    }
  };
}

module.exports = {
  checkId,
};
