const express = require('express')
const userController = require('../controllers/userController')
const postsController = require('../controllers/postsController')
const path = require('path')
const router = express.Router()

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'))
})

router.get('/usuarios', userController.getUsers)
router.post('/login', userController.loginUser)
router.post('/usuarios', userController.createUser)
router.get('/posts', postsController.getPosts)
router.post('/posts', postsController.createPost)

module.exports = router
