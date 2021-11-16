const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const User = require('../models/user');
const ErrorLog = require('../models/errorLog');

exports.getLogin = async (req, res, next) => {
    try {
        res.render('auth/login', {
            validations: [],
            mainError: null,
            initInput: { username: '', password: '' }
        });
    } catch (err) {
        const log = new ErrorLog({ path: '[GET] /auth/login', errMessage: err.message, errStack: err.stack });
        await log.save();
        next(err);
    }
}

exports.postLogin = async (req, res, next) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        const errors = validationResult(req);

        if (!errors.isEmpty()) {           
            return res.render('auth/login', {
                validations: errors.errors,
                mainError: null,
                initInput: {
                    username: username,
                    password: password
                }
            });
        }

        const queryUser = await User.findOne({ username: username });

        if (!queryUser) {
            return res.render('auth/login', {
                validations: [],
                mainError: req.t('auth.login.alertError'),
                initInput: {
                    username: username,
                    password: password
                }
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, queryUser.password);

        if (!isPasswordMatch) {
            return res.render('auth/login', {
                validations: [],
                mainError: req.t('auth.login.alertError'),
                initInput: {
                    username: username,
                    password: password
                }
            });
        }

        req.session.user = queryUser;
        req.session.lng = req.language;
        req.session.save(async (err) => {
			if (err) throw err;

			if (queryUser.role === 'admin') res.redirect('/dashboard');
            else res.redirect('/shop');
		});
    } catch (err) {         
        const log = new ErrorLog({ path: '[POST] /auth/login', errMessage: err.message, errStack: err.stack });
        await log.save();
        next(err);
    }
}

exports.getLogout = async (req, res, next) => {
    try {
        const userSession = req.session.user;

        req.session.destroy(err => {		
            if (err) throw err;
    
            res.redirect('/auth/login');
        });
    } catch (err) {
        const log = new ErrorLog({ path: '[GET] /auth/logout', errMessage: err.message, errStack: err.stack, createdBy: userSession });
        await log.save();
        next(err);
    }
}