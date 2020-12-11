const Post = require('../models/post')

// All logs in an array
const post_index = (req, res) => {
	Post.find()
		.sort({ createdAt: -1 })
		.then((result) => {
			res.render('posts/index', { title: 'All Posts', posts: result })
		})
		.catch((err) => {
			console.log(err)
		})
}

// Gets add log form
const post_add_get = (req, res) => {
	res.render('posts/add', { title: 'Add Post', displayName: req.user.displayName })
}

// Posts post to /posts
const post_add_post = (req, res) => {
	const post = new Post(req.body)

	post
		.save()
		.then((result) => {
			res.redirect('/posts')
		})
		.catch((err) => {
			console.log(err)
		})
}

module.exports = {
	post_index,
	post_add_get,
	post_add_post,
}
