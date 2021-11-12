const express = require('express');
const router = express.Router();

const indexController = require('../controllers/indexController');

const { isAuth } = require('../utils/authUtil');
const { postAddUserValidation } = require('../validations/index/postAddUserValidation');

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
router.get('/shop', isAuth, indexController.getShop);
router.get('/user-management/all-user', isAuth, indexController.getAllUser);
router.get('/user-management/add-user', isAuth, indexController.getAddUser);
router.post('/user-management/add-user', isAuth, postAddUserValidation(), indexController.postAddUser);

module.exports = router;