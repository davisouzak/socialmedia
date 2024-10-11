const db = require('./db')

const createTable = () => {
  const criarUsuario = `
    CREATE TABLE IF NOT EXISTS usuarios (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nome VARCHAR(100) NOT NULL,
      senha VARCHAR(100) NOT NULL
    )
  `
  db.query(criarUsuario, (err, result) => {
    if (err) {
      console.error('Erro ao criar tabela:', err)
      return
    }
    console.log('Tabela "usuarios" criada com sucesso!')
  })

  const criarPost = `
    CREATE TABLE IF NOT EXISTS posts (
      id INT AUTO_INCREMENT PRIMARY KEY,
      post VARCHAR(700) NOT NULL,
      userid INT,
      FOREIGN KEY (userid) REFERENCES usuarios(id)
    )
  `
  db.query(criarPost, (err, result) => {
    if (err) {
      console.error('Erro ao criar tabela:', err)
      return
    }
    console.log('Tabela "posts" criada com sucesso!')
  })
}

const getUsers = (callback) => {
  const query = 'SELECT id, nome FROM usuarios'
  db.query(query, callback)
}

const insertUser = (user, callback) => {
  const query = 'INSERT INTO usuarios (nome, senha) VALUES (?, ?)'
  db.query(query, [user.nome, user.senha], callback)
}

const findUserByName = (nome, callback) => {
  const query = 'SELECT * FROM usuarios WHERE nome = ?'
  db.query(query, [nome], callback) 
}

const getPosts = (callback) => {
  const query = 'SELECT id, post FROM posts'
  db.query(query, callback)
}

const insertPosts = (postContent, callback) => {
  const query = 'INSERT INTO posts (post, userid) VALUES (?, ?)'
  db.query(query, [postContent.post, postContent.userid], callback)
}

const findUserByPosts = (posts, callback) => {
  const query = 'SELECT * FROM posts WHERE post = ?'
  db.query(query, [posts], callback) 
}

module.exports = { createTable, getUsers, insertUser, findUserByName, getPosts, insertPosts, findUserByPosts };
