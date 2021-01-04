const Post = require('../models/post')
const Contact = require('../models/contact')
const NewContact = require('../models/newcontact')
const User = require('../models/User')

// Redirects to /posts
const index_home = (req, res) => {
	res.render('home', { title: 'Home' })
}

const contacts = (req, res) => {
	try {
		const param = String(req.user.googleId)
		Contact.find().or([{userGoogleId: param}, {contactGoogleId: param} ])		
		.sort({ createdAt: -1 })
		.then((result) => {
			//console.log(result)
			res.render('index', { title: 'Contacts', contacts: result, displayName: req.user.displayName, googleId: req.user.googleId })
		})
		.catch((err) => {
			console.log(err)
	})
	} catch (err) {
		console.log(err)
		res.redirect('/auth/google')
	}
}

// Renders EJS page
const index_about = (req, res) => {
	res.render('about', { title: 'About' })
}

// View profile only if our are signed in
const index_profile = (req, res) => {
	try {
		const param = String(req.user.googleId)
		Post.find({posterId: param})
		.sort({ createdAt: -1 })
		.then((result) => {
			//console.log(result)
			res.render('profilenew', { title: 'Profile', posts: result, displayName: req.user.displayName, googleId: req.user.googleId, chatId: '1234' })
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
		const param = req.params.posterId

		//console.log(req.params.posterId)

		Contact.find( {posterId: param, privacy: "public"} )
		.sort({ createdAt: -1 })
		.then((result) => {
			//console.log(result)
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

	const url = `${req.body.userGoogleId}${req.body.contactGoogleId}`
	const url2 = `${req.body.contactGoogleId}${req.body.userGoogleId}`


	Contact.find()
		.then((result)	=>	{
			if(req.body.contactGoogleId === req.body.userGoogleId)
			{
				res.redirect('/new/contact/')
			}	else {
				if(result.length != 0)
				{
					result.every(contact => {		
						//console.log("1: ", contact.contactGoogleId)
						//console.log("1: ",req.body.contactGoogleId)
	
						//console.log("1: ",contact.userGoogleId)
						//console.log("1: ",req.body.userGoogleId)
	
						if(contact.contactGoogleId === req.body.contactGoogleId && contact.userGoogleId === req.body.userGoogleId)	{
							res.redirect(`/${url}`)
							console.log("contact already exists, redirecting")
	
						}
						else if(contact.contactGoogleId === req.body.userGoogleId && contact.userGoogleId === req.body.contactGoogleId)	{
							res.redirect(`/${url2}`)
							console.log("contact already exists, redirecting")
						}
						else {
							console.log("New contact")
							User.find( {googleId: param} )
							.then((result) => {				
								req.body.contactDisplayName = result[0].displayName
								const contact = new Contact(req.body)	
								contact
								.save()
								.then((result2) => {
									res.redirect(`/${url}`)
									return true;
								})
								.catch((err) => {
									console.log(err)
								})
								
							})
							.catch((err) => {
								res.redirect('/contacts/add')
							})
						}
					})
				}	else	{
					console.log("no earlier contacts")
					User.find( {googleId: param} )
					.then((result) => {
						req.body.contactDisplayName = result[0].displayName
						const contact = new Contact(req.body)	
						contact
						.save()
						.then((result2) => {
							//console.log(result2)
							res.redirect(`/${url}`)
						})
						.catch((err) => {
							console.log(err)
						})
								
					})
					.catch((err) => {
						res.redirect('/contacts/add')
					})
				}	
			}				
	})
	.catch((err) => {
		console.log(err)
	}) 
}

const post_delete = (req, res) => {		
	const param = req.params.id

	Contact.find( {_id: param} )
	.remove()
	.then((result) => {
		console.log("account id matching")
		res.redirect('/contacts')
	})
	.catch((err) => {
		console.log(err)
	})
}

const chatroom = (req, res) => {
	const param = req.params.id
	console.log('accessed '+ param)

	Post.find({chatId: param})
		.sort({ createdAt: -1 })
		.then((result) => {	
			if(JSON.stringify(param).includes(req.user.googleId))	{
				//console.log(result)
				res.render('posts/index', { title: 'Messages', posts: result, googleId: req.user.googleId, displayName: req.user.displayName, chatId: param })

			}	else	{
				res.redirect('/')
			}
		})
		.catch((err) => {
			console.log(err)
			res.redirect('/auth/google')
		})
}


module.exports = {
	contacts,
	index_home,
	index_about,
	index_profile,
	index_profile_,
	post_delete,
	add_contact,
	chatroom
}
