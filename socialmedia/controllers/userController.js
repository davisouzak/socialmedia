const jwt = require("jsonwebtoken")
const userModel = require('../models/userModel')
const userRoutes = require('../routes/userRoutes')

const getUsers = (req, res) => {
  userModel.getUsers((err, results) => {
    if (err) {
      console.error('Erro ao buscar usuários:', err)
      return res.status(500).send('Erro ao buscar usuários')
    }
    res.status(200).json(results)
  })
}

const loginUser = (req, res) => {
  const user = req.body 

  userModel.findUserByName(user.nome, (err, result) => {
    if (err) return res.status(500).send({ message: "Something went wrong", err })
    
    if (result.length === 0) return res.status(404).send({ message: "User not found" })

    if (result[0].senha !== user.senha) return res.status(401).send({ message: "Wrong password." })

    const token = jwt.sign({ nome: user.nome }, process.env.TOKEN_KEY)
    res.redirect('/posts')
  })
}

const createUser = (req, res) => {
  const { nome, senha } = req.body
  if (!nome || !senha) {
    return res.status(400).send('Nome e senha são obrigatórios')
  }
  userModel.insertUser({ nome, senha }, (err, result) => {
    if (err) {
      console.error('Erro ao inserir usuário:', err)
      return res.status(500).send('Erro ao inserir usuário')
    }
    console.log('Usuário inserido com ID:', result.insertId)
    res.status(201).send('Usuário inserido com sucesso')
  })
}

module.exports = { getUsers, loginUser, createUser }
