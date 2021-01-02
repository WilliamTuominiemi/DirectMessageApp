const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Schema
const PostSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
		},
		posterId: {
			type: String,
			required: true,
		},
		message: {
			type: String,
			required: true,
		},
		chatId: {
			type: String
		}
	},
	{ timestamps: true }
)

// Model
module.exports = mongoose.model('Post', PostSchema)
