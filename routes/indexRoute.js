const express = require('express');
const router = express.Router();

//#region controllers

const indexController = require('../controllers/indexController');

const { isAuth } = require('../utils/authUtil');

//#endregion

//#region map routes

router.get('/', isAuth, (req, res) => res.redirect('/dashboard'));
router.get('/dashboard', isAuth, indexController.getDashboard);

//#endregion

module.exports = router;