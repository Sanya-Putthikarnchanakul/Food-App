const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const ErrorLog = require('../models/errorLog');
const User = require('../models/user');

exports.getDashboard = async (req, res, next) => {
    try {
        const userSession = req.session.user;

        res.render('index/dashboard', {
            pageTitle: 'Dashboard',
            path: '/dashboard',
            ribbons: ['Dasboard'],
            user: userSession
        });
    } catch (err) {
        const log = new ErrorLog({ path: '[GET] /dashboard', errMessage: err.message, errStack: err.stack, createdBy: userSession });
        await log.save();
        next(err);
    }
}

exports.getShop = async (req, res, next) => {
    try {
        const userSession = req.session.user;

        res.render('index/shop', {
            pageTitle: 'Shop',
            path: '/shop',
            ribbons: ['Shop'],
            user: userSession
        });
    } catch (err) {
        const log = new ErrorLog({ path: '[GET] /shop', errMessage: err.message, errStack: err.stack, createdBy: userSession });
        await log.save();
        next(err);
    }
}

exports.getAllUser = async (req, res, next) => {
    try {
        const userSession = req.session.user;

        res.render('index/all-user', {
            pageTitle: 'All User',
            path: '/user-management/all-user',
            ribbons: ['User Management', 'All User'],
            user: userSession
        });
    } catch (err) {
        const log = new ErrorLog({ path: '[GET] /user-management/all-user', errMessage: err.message, errStack: err.stack, createdBy: userSession });
        await log.save();
        next(err);
    }
}

exports.getAddUser = async (req, res, next) => {
    try {
        const userSession = req.session.user;

        res.render('index/add-user', {
            pageTitle: 'Add User',
            path: '/user-management/add-user',
            ribbons: ['User Management', 'Add User'],
            user: userSession,
            validations: [],
            input: { username: '', password: '', confirmPassword: '' },
            mainError: null
        });
    } catch (err) {
        const log = new ErrorLog({ path: '[GET] /user-management/add-user', errMessage: err.message, errStack: err.stack, createdBy: userSession });
        await log.save();
        next(err);
    }
}

exports.postAddUser = async (req, res, next) => {
    try {
        const userSession = req.session.user;
        const username = req.body.username;
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.render('index/add-user', {
                pageTitle: 'Add User',
                path: '/user-management/add-user',
                ribbons: ['User Management', 'Add User'],
                user: userSession,
                validations: errors.errors,
                input: { username: username, password: password, confirmPassword: confirmPassword },
                mainError: null
            });
        }     

        const queryUser = await User.findOne({ username: username });

        if (queryUser) {
            res.render('index/add-user', {
                pageTitle: 'Add User',
                path: '/user-management/add-user',
                ribbons: ['User Management', 'Add User'],
                user: userSession,
                validations: [],
                input: { username: username, password: password, confirmPassword: confirmPassword },
                mainError: 'Username is Already Registered.'
            });
        }

        const hashPassword = await bcrypt.hash(password, 12);
        const user = new User({ username: username, password: hashPassword, role: 'user' });
        await user.save();
        res.redirect('/user-management/all-user');
    } catch (err) {
        const log = new ErrorLog({ path: '[POST] /user-management/add-user', errMessage: err.message, errStack: err.stack, createdBy: userSession });
        await log.save();
        next(err);
    }
}