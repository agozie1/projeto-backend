const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 25000;

app.use(cors());

app.get('/api/dados', (req, res) => {
  res.json({
    mensagem: "Olá! Dados vindos do back-end.",
    hora: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`Servidor back-end rodando na porta ${PORT}`);
});
