const jwt = require("jsonwebtoken")
const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')

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
  const { nome, senha } = req.body

  userModel.findUserByName(nome, (err, result) => {
    if (err) {
      return res.status(500).send({ message: "Erro interno do servidor", err })
    }

    if (result.length === 0) {
      return res.status(404).send({ message: "Usuário não encontrado" })
    }

    const user = result[0]

    bcrypt.compare(senha, user.senha, (err, isMatch) => {
      if (err) {
        return res.status(500).send({ message: 'Erro ao comparar as senhas', err })
      }

      if (!isMatch) {
        return res.status(401).send({ message: "Senha incorreta" })
      }

      const token = jwt.sign({ id: user.id, nome: user.nome }, process.env.TOKEN_KEY, { expiresIn: '1h' })

      res.cookie("auth_token", token, { httpOnly: true })

      return res.redirect('/posts')
    })
  })
}

const createUser = (req, res) => {
  const { nome, senha } = req.body

  if (!nome || !senha) {
    return res.status(400).send('Nome e senha são obrigatórios')
  }

  bcrypt.hash(senha, 10, (err, hash) => {
    if (err) {
      return res.status(500).send({ message: "Erro ao criar o usuário", err })
    }

    const newUser = { nome, senha: hash }

    userModel.insertUser(newUser, (err, result) => {
      if (err) {
        console.error('Erro ao inserir usuário:', err)
        return res.status(500).send('Erro ao inserir usuário')
      }
      console.log('Usuário inserido com ID:', result.insertId)
      res.status(201).send('Usuário inserido com sucesso')
    })
  })
}

module.exports = { getUsers, loginUser, createUser }
