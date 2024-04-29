const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const app = express();

// Cria uma conexão com o banco de dados SQLite
const db = new sqlite3.Database(":memory:");

// Cria uma tabela 'clientes' no banco de dados
db.serialize(() => {
  db.run("CREATE TABLE clientes (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, email TEXT)");
});

app.use(express.json());

// Rota para atualizar um cliente
app.put('/clientes/:id', (req, res) => {
  const id = req.params.id;
  const { nome, email } = req.body;

  db.run("UPDATE clientes SET nome = ?, email = ? WHERE id = ?", [nome, email, id], function(err) {
    if (err) {
      console.error(err.message);
      res.status(500).send('Erro ao atualizar cliente.');
    } else {
      console.log(`Cliente com ID ${id} atualizado com sucesso.`);
      res.send('Cliente atualizado com sucesso.');
    }
  });
});

// Rota para remover um cliente
app.delete('/clientes/:id', (req, res) => {
  const id = req.params.id;

  db.run("DELETE FROM clientes WHERE id = ?", id, function(err) {
    if (err) {
      console.error(err.message);
      res.status(500).send('Erro ao remover cliente.');
    } else {
      console.log(`Cliente com ID ${id} removido com sucesso.`);
      res.send('Cliente removido com sucesso.');
    }
  });
});

// Rotas para operações matemáticas (exemplo)
// (Continuam as mesmas)

// Inicia o servidor na porta 3000
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
