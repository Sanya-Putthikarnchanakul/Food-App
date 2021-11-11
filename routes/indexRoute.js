const express = require('express');
const router = express.Router();

//#region controllers

const indexController = require('../controllers/indexController');

const { isAuth } = require('../utils/authUtil');

//#endregion

//#region map routes

//#region mock
/*
const bcrypt = require("bcryptjs");
const User = require('../models/user');

router.post('/api/add-user', express.json(), async (req, res) => {
    const hashPassword = await bcrypt.hash(req.body.password, 12);

    const user = new User({
        username: req.body.username,
        password: hashPassword,
        role: req.body.role
    });

    const newUser = await user.save();

    res.json(newUser);
});
*/
//#endregion

router.get('/', isAuth, (req, res) => res.redirect('/dashboard'));
router.get('/dashboard', isAuth, indexController.getDashboard);

//#endregion

module.exports = router;