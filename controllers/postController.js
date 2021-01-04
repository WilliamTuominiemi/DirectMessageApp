const Post = require('../models/post')
const Contact = require('../models/contact')
const User = require('../models/User')

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
			console.log("pog")
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
		res.render('posts/add', { title: 'Add Contact', displayName: req.user.displayName, googleId: req.user.googleId })
	} catch(err) {
		console.log(err)
		res.redirect('/auth/google')
	}
}

// Posts post to /posts
const post_add_post = (req, res) => {
	const post = new Post(req.body)

	const param = req.body.chatId

	post
		.save()
		.then((result) => {
			res.redirect(`/${param}`)
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
	console.log('accessed '+ param)
	const param = req.params.id
	Post.find({chatId: param})
		.sort({ createdAt: -1 })
		.then((result) => {
			console.log("piog")
			result.forEach(post =>{
				const d1 = post.getTime();
				const d2 = new Date().getTime();
				const diff = d2 - d1;
				const days = diff/1000*60*60*24;
				console.log("post age", days)
			} )
		})
		.then((result) => {
			//console.log(result)
			res.render('posts/index', { title: 'All Posts', posts: result, googleId: req.user.googleId, displayName: req.user.displayName, chatId: param })
		})
		.catch((err) => {
			//console.log(err)
			res.redirect('/auth/google')
	})
}



module.exports = {
	post_index,
	post_add_get,
	post_add_post,
	post_delete
	
}
