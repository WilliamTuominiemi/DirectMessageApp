const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Schema
const PostSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		body: {
			type: String,
			required: true,
		},
		username: {
			type: String,
		}
	},
	{ timestamps: true }
)

// Model
module.exports = mongoose.model('Post', PostSchema)
