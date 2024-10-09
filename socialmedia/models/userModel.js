const db = require('./db');

const createTable = () => {
  const criarUsuario = `
    CREATE TABLE IF NOT EXISTS usuarios (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nome VARCHAR(100) NOT NULL,
      senha VARCHAR(100) NOT NULL
    );
  `
  db.query(criarUsuario, (err, result) => {
    if (err) {
      console.error('Erro ao criar tabela:', err);
      return
    }
    console.log('Tabela "usuarios" criada com sucesso!');
  })
}

const getUsers = (callback) => {
  const query = 'SELECT id, nome FROM usuarios';
  db.query(query, callback);
}

const insertUser = (user, callback) => {
  const query = 'INSERT INTO usuarios (nome, senha) VALUES (?, ?)';
  db.query(query, [user.nome, user.senha], callback);
}

const findUserByName = (nome, callback) => {
  const query = `SELECT * FROM usuarios WHERE nome='${nome}'`;
  db.query(query, callback);
}

module.exports = { createTable, getUsers, insertUser, findUserByName };
