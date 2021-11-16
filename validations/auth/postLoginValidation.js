const { body } = require("express-validator");

exports.postLoginValidation = () => {
    const rule1 = body('username')
        .notEmpty().withMessage((value, { req }) => req.language === 'en' ? 'Username is Required' : 'ต้องกรอกชื่อผู้ใช้')
        .isLength({ min: 5, max: 20 }).withMessage((value, { req }) => req.language === 'en' ? 'Username must be between 5 - 20 Characters.' : 'ชื่อผู้ใช้ต้องมีความยาว 5 - 20 ตัวอักษร');
    const rule2 = body('password')
        .notEmpty().withMessage((value, { req }) => req.language === 'en' ? 'Password is Required' : 'ต้องกรอกรหัสผ่าน')
        .isLength({ min: 5, max: 20 }).withMessage((value, { req }) => req.language === 'en' ? 'Password must be between 5 - 20 Characters.' : 'รหัสผ่านต้องมีความยาว 5 - 20 ตัวอักษร');

    const rules = [rule1, rule2];

    return rules;
}