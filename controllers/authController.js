const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const User = require('../models/user');
const ErrorLog = require('../models/errorLog');

exports.getLogin = async (req, res, next) => {
    try {
        res.render('auth/login', {
            pageTitle: 'Login',
            validationErrors: [],
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
                pageTitle: 'Login',
                validationErrors: errors.errors,
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
                pageTitle: 'Login',
                validationErrors: [],
                mainError: 'Login Fail',
                initInput: {
                    username: username,
                    password: password
                }
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, queryUser.password);

        if (!isPasswordMatch) {
            return res.render('auth/login', {
                pageTitle: 'Login',
                validationErrors: [],
                mainError: 'Login Fail',
                initInput: {
                    username: username,
                    password: password
                }
            });
        }

        req.session.userId = queryUser._id;
        req.session.save(err => {
			if (err) console.log(`[POST] /auth/login error => ${err}`);
			res.redirect('/dashboard');
		});
    } catch (err) {         
        const log = new ErrorLog({ path: '[POST] /auth/login', errMessage: err.message, errStack: err.stack });
        await log.save();
        next(err);
    }
}