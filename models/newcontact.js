const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NewContactSchema = new Schema({
	googleId: {
		type: String,
		required: true,
	},
	contactGoogleId: {
		type: String,
		required: true,
	}
})

module.exports = mongoose.model('NewContact', NewContactSchema)
