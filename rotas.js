const express = require('express');
const rotas = express.Router();

const clientes = require('./controller/clientes').rota;
const carros = require('./controller/carros');
const servicos = require('./controller/servicos');
const agendamentos = require('./controller/agendamentos');

rotas.use(clientes);
rotas.use(carros);
rotas.use(servicos);
rotas.use(agendamentos);

module.exports = rotas;