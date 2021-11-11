const ErrorLog = require('../models/errorLog');

exports.getDashboard = async (req, res, next) => {
    try {
        res.render('index/dashboard', {
            pageTitle: 'Dashboard',
            path: '/dashboard'
        });
    } catch (err) {
        const log = new ErrorLog({ path: '[GET] /dashboard', errMessage: err.message, errStack: err.stack });
        await log.save();
        next(err);
    }
}