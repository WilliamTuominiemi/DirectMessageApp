const Post = require('../models/post')


// Redirects to /posts
const index_home = (req, res) => {
	res.redirect('/posts')
}

// Renders EJS page
const index_about = (req, res) => {
	res.render('about', { title: 'About' })
}

// View profile only if our are signed in
const index_profile = (req, res) => {
	try {
		/*res.render('profilenew', {
			title: 'Profile',
			displayName: req.user.displayName,
			image: req.user.image,
		})*/
		const param = String(req.user.googleId)
		Post.find({ posterId: param })
		.sort({ createdAt: -1 })
		.then((result) => {
			console.log(result)
			res.render('profilenew', { title: 'All Posts', posts: result, displayName: req.user.displayName, googleId: req.user.googleId })
		})
		.catch((err) => {
			console.log(err)
	})
	} catch (err) {
		console.log(err)
		res.status(404).render('404', { title: 'Page not found' })
	}
}

module.exports = {
	index_home,
	index_about,
	index_profile,
}
