const { body } = require("express-validator");

exports.postAddUserValidation = () => {
    const rule1 = body('username')
        .notEmpty().withMessage('Username is Required')
        .isLength({ min: 5, max: 20 }).withMessage('Username must be between 5 - 20 Characters.');
    const rule2 = body('password')
        .notEmpty().withMessage('Password is Required')
        .isLength({ min: 5, max: 20 }).withMessage('Password must be between 5 - 20 Characters.');
    const rule3 = body('confirmPassword')
        .notEmpty().withMessage('Confirm Password is Required')
        .isLength({ min: 5, max: 20 }).withMessage('Confirm Password must be between 5 - 20 Characters.')
        .custom((value, { req }) => {
            if (value !== req.body.password) throw new Error('Password and Confirm Password not Match.');
            return true;
        });

    return [rule1, rule2, rule3];
}