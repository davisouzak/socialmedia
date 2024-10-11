const jwt = require("jsonwebtoken")
const userModel = require('../models/userModel')
const path = require("path")

const getPosts = (req, res) =>  {
    res.sendFile(path.resolve("./views/post.html"))
}

const postUser = (req, res) => {
    const user = req.body

    userModel.findeUserByPosts(user.posts, (err, result) => {
        if (err) return res.status(500).send({ message: "Something went wrong", err })

        if (result.length === 0) return res.status(404).send({ message: "User not found" })

        const token = jwt.sign({ nome: user.nome }, process.env.TOKEN_KEY)
        return res.status(200).send({ message: "User successfully post", token: token })
    })
}

const createPost = (req, res) => {
    const postContent = req.body
    if (!postContent) {
        return res.status(400).send('Um conteúdo no post é obrigatório')
    }
    userModel.insertPosts(postContent, (err, result) => {
        if(err) {   
            console.log(postContent)
            console.error('Erro ao fazer a postagem', err)
            return res.status(500).send(err)
        }
        console.log('Post feito com sucesso com ID:', result.insertId)
        res.status(201).send('Post feito com sucesso')
    })
} 

module.exports = { getPosts, postUser, createPost } 