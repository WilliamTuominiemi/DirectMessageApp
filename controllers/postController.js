const Post = require('../models/post')
const Contact = require('../models/contact')

const post_delete = (req, res) => {	
	console.log(req.params.id)
	
	const param = req.params.id

	Post.find( {_id: param} )
	.remove()
	.then((result) => {
		res.redirect('/profile')
	})
	.catch((err) => {
		console.log(err)
	})
}


// All logs in an array
const post_index = (req, res) => {
	Post.find()
		.sort({ createdAt: -1 })
		.then((result) => {
			console.log(result)
			res.render('posts/index', { title: 'All Posts', posts: result, googleId: req.user.googleId, displayName: req.user.displayName })
		})
		.catch((err) => {
			console.log(err)
			res.redirect('/auth/google')
		})
}

// Gets add log form
const post_add_get = (req, res) => {
	try {
	res.render('posts/add', { title: 'Add Post', displayName: req.user.displayName, googleId: req.user.googleId })
	} catch(err) {
		console.log(err)
		res.redirect('/auth/google')
	}
}

// Posts post to /posts
const post_add_post = (req, res) => {
	const post = new Post(req.body)

	post
		.save()
		.then((result) => {
			res.redirect('/messages')
		})
		.catch((err) => {
			console.log(err)
		})
}

const add_contact = (req, res) => {
	const contact = new Contact(req.body)

	contact.find(req.contactId)
}

const chatroom = (req, res) => {
	const param = req.params.id
	Post.find({chatId: param})
		.sort({ createdAt: -1 })
		.then((result) => {
			console.log(result)
			res.render('posts/index', { title: 'All Posts', posts: result, googleId: req.user.googleId, displayName: req.user.displayName })
		})
		.catch((err) => {
			console.log(err)
			res.redirect('/auth/google')
	})
}



module.exports = {
	post_index,
	post_add_get,
	post_add_post,
	post_delete
}
