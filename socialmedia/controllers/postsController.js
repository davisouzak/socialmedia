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

        // const token = jwt.sign({ nome: user.nome }, process.env.TOKEN_KEY)
        // res.cookie("auth_token", token, { httpOnly: true });
        // return res.status(200).send({ message: "User successfully post", token: token })
    })
    return res.redirect('/posts')
}

const createPost = (req, res) => {
    const{ post } = req.body
    if (!post) {
        return res.status(400).send('Um conteúdo no post é obrigatório')
    }
    
    const token = req.cookies.auth_token
    if (!token) {
        return res.status(401).send('usuário não autenticado')
    }
    const user = jwt.decode(token)


    jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).send('token inválido')
        }
        
        
        userModel.insertPosts({ post, userid: user.id }, (err, result) => {
            if (err) {
                console.error('Erro ao fazer a postagem:', err)
                return res.status(500).send(err)
            }
            console.log('Post feito com sucesso com ID:', result.insertId)
            res.status(201).send('Post feito com sucesso')
        })
    })
} 

module.exports = { getPosts, postUser, createPost } 