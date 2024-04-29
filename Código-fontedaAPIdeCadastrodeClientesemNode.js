const express = require("express");
const app = express();

app.use(express.json());

let clientes = []; // Simula um banco de dados com um array

// Rota para atualizar um cliente
app.put('/clientes/:id', (req, res) => {
  const id = req.params.id;
  const clienteAtualizado = req.body;
  let encontrado = false;

  clientes = clientes.map(cliente => {
    if (cliente.id === id) {
      encontrado = true;
      return { ...cliente, ...clienteAtualizado };
    }
    return cliente;
  });

  if (encontrado) {
    res.send('Cliente atualizado com sucesso.');
  } else {
    res.status(404).send('Cliente não encontrado.');
  }
});

// Rota para remover um cliente
app.delete('/clientes/:id', (req, res) => {
  const id = req.params.id;
  clientes = clientes.filter(cliente => cliente.id !== id);

  if (clientes.some(cliente => cliente.id === id)) {
    res.status(404).send('Cliente não encontrado.');
  } else {
    res.send('Cliente removido com sucesso.');
  }
});

// Rotas para operações matemáticas
app.get('/soma', (req, res) => {
  const { a, b } = req.query;
  res.json({ resultado: Number(a) + Number(b) });
});

app.get('/subtracao', (req, res) => {
  const { a, b } = req.query;
  res.json({ resultado: Number(a) - Number(b) });
});

app.get('/multiplicacao', (req, res) => {
  const { a, b } = req.query;
  res.json({ resultado: Number(a) * Number(b) });
});

app.get('/divisao', (req, res) => {
  const { a, b } = req.query;
  if (Number(b) === 0) {
    res.status(400).send('Não é possível dividir por zero.');
  } else {
    res.json({ resultado: Number(a) / Number(b) });
  }
});

// Inicia o servidor na porta 3000
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
