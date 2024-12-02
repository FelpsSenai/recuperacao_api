const express = require('express');
const rotas = require('./rotas');
const cors = require('cors');

const servidor = express();

servidor.use(cors());
servidor.use(express.json());
servidor.use(rotas);

servidor.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});