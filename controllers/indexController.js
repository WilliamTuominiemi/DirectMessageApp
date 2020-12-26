const Post = require('../models/post')
const Contact = require('../models/contact')
const NewContact = require('../models/newcontact')
const User = require('../models/User')

// Redirects to /posts
const index_home = (req, res) => {
	res.redirect('/messages')
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
		res.redirect('/auth/google')
	}
}

const index_profile_ = (req, res) => {
	try {
		/*res.render('profilenew', {
			title: 'Profile',
			displayName: req.user.displayName,
			image: req.user.image,
		})*/
		const param = req.params.posterId

		console.log(req.params.posterId)

		Post.find( {posterId: param, privacy: "public"} )
		.sort({ createdAt: -1 })
		.then((result) => {
			console.log(result)
			res.render('profile', { title: result[0].username, posts: result, displayName: req.user.displayName, googleId: req.user.googleId })		
		})
		.catch((err) => {
			console.log(err)
	})
	} catch (err) {
		console.log(err)
		res.status(404).render('404', { title: 'Page not found' })
	}
}

const add_contact = (req, res) => {
	const param = req.body.contactGoogleId

	const url = `${req.body.googleId}${req.body.contactGoogleId}`

	User.find( {googleId: param} )
	.then((result) => {
		console.log(result)
		res.redirect(`/messages/${url}`)
	})
	.catch((err) => {
		console.log(result)
		res.redirect('/messages/add')
	})
}

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

module.exports = {
	index_home,
	index_about,
	index_profile,
	index_profile_,
	post_delete,
	add_contact
}
