const express = require('express')
const userController = require('../controllers/userController')
const postsController = require('../controllers/postsController')
const path = require('path')
const router = express.Router()
const checkAuth = require('../middleware/checkAuth')

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'))
})

router.get('/usuarios', userController.getUsers)
router.post('/login', userController.loginUser)
router.post('/usuarios', userController.createUser)
router.get('/posts', checkAuth, postsController.getPosts)
router.post('/posts',checkAuth, postsController.createPost)

module.exports = router
