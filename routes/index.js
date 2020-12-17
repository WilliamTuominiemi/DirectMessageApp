const express = require('express')
const indexController = require('../controllers/indexController')

const router = express.Router()

router.get('/', indexController.index_home)
router.get('/about', indexController.index_about)
router.get('/profile', indexController.index_profile)
router.get('/profile/:posterId', indexController.index_profile_)
router.get('/delete/:id', indexController.post_delete)


module.exports = router
