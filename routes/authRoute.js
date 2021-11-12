const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

const { postLoginValidation } = require('../validations/auth/postLoginValidation');
const { isAuth } = require('../utils/authUtil');

router.get(
    '/login', 
    (req, res, next) => {
        if (req.session.userId) return res.redirect('/dashboard');
        next();
    }, 
    authController.getLogin
);
router.post('/login', postLoginValidation(), authController.postLogin);
router.get('/logout', isAuth, authController.getLogout);

module.exports = router;