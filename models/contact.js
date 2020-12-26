const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ContactSchema = new Schema({
	userGoogleId: {
		type: String,
		required: true,
	},
	contactDisplayName: {
		type: String,
		required: true,
	},
	contactGoogleId: {
		type: String,
		required: true,
	}
})

module.exports = mongoose.model('Contact', ContactSchema)
