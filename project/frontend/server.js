const express = require('express');
const path = require('path');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 8080;

// BACKEND_URL: valor default quando rodar com docker-compose
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:25000';

// Servir arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, 'public')));

// Proxy para backend
app.get('/api/dados', async (req, res) => {
  try {
    const resp = await fetch(`${BACKEND_URL}/api/dados`);
    const data = await resp.json();
    res.json(data);
  } catch (err) {
    console.error('Erro proxy para backend:', err);
    res.status(500).json({ error: 'Erro ao acessar backend' });
  }
});

app.listen(PORT, () => {
  console.log(`Frontend rodando na porta ${PORT}, proxy -> ${BACKEND_URL}`);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use(express.static(path.join(__dirname, 'public')));
