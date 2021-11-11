const express = require('express');
const router = express.Router();

//#region controllers

const authController = require('../controllers/authController');

//#endregion

//#region 

const { postLoginValidation } = require('../validations/auth/postLoginValidation');

//#endregion

//#region map routes

router.get(
    '/login', 
    (req, res, next) => {
        if (req.session.userId) return res.redirect('/dashboard');
        next();
    }, 
    authController.getLogin
);
router.post('/login', postLoginValidation(), authController.postLogin);

//#endregion

module.exports = router;