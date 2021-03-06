const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const errorLogSchema = new Schema({
	path: {
		type: String
	},
	errMessage: {
		type: String,
		required: true
	},
	errStack: {
		type: String,
		required: true
	},
    createdBy: {
        type: String,
		default: null
    }
}, { timestamps: true });

module.exports = mongoose.model('ErrorLog', errorLogSchema);