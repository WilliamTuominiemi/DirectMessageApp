const express = require('express')
const indexController = require('../controllers/indexController')
const postController = require('../controllers/postController')


const router = express.Router()

router.get('/', indexController.index_home)
router.get('/about', indexController.index_about)
router.get('/profile', indexController.index_profile)
router.get('/profile/:posterId', indexController.index_profile_)
router.get('/delete/:id', indexController.post_delete)
router.post('/new/contact/', indexController.add_contact)
router.get('/:id', indexController.chatroom)
router.get('/new/contact/', postController.post_add_get)


module.exports = router
