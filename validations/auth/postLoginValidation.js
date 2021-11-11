const { body } = require("express-validator");

exports.postLoginValidation = () => {
    const rule1 = body('username')
        .notEmpty().withMessage('Username is Required')
        .isLength({ min: 5, max: 20 }).withMessage('Username must be between 5 - 20 Characters.');
    const rule2 = body('password')
        .notEmpty().withMessage('Password is Required')
        .isLength({ min: 5, max: 20 }).withMessage('Password must be between 5 - 20 Characters.');

    const rules = [rule1, rule2];

    return rules;
}