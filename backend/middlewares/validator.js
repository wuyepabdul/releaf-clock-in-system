const { check, validationResult } = require("express-validator");

module.exports.registerValidator = [
  check("name").not().isEmpty().trim().withMessage("All fields are required"),
  check("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid Email"),
  check("password")
    .isLength({ min: 4 })
    .trim()
    .withMessage("Password must be at least 4 characters long"),
];

module.exports.signinValidator = [
  check("email")
    .not()
    .isEmpty()
    .trim()
    .withMessage("Staff ID Can not be Empty "),
  check("password")
    .isLength({ min: 4 })
    .trim()
    .withMessage("Password must be at least 4 characters long"),
];

module.exports.updateProfileValidator = [
  check("name").not().isEmpty().trim().withMessage("All fields are required"),
];

module.exports.validatorResult = (req, res, next) => {
  const result = validationResult(req);
  const hasErrors = !result.isEmpty();
  if (hasErrors) {
    const errorMessage = result.array()[0].msg;
    return res.status(400).json({
      errorMessage,
    });
  }
  next();
};
