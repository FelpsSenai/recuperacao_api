const express = require('express');
const rota = express.Router();

const clientes = [];
const idClienteNovo = 1;

rota.get('/clientes', (req, res) => {
    res.json(clientes);
});

rota.post('/clientes', (req, res) => {
    const cliente = req.body;

    if (cliente.nome.length < 3) {
        res.status(400).json({"mensagem": "'nome' deve conter no mínimo 3 caracteres"});
    }
    if (cliente.nome.length > 100) {
        res.status(400).json({"mensagem": "'nome' deve conter no máximo 100 caracteres"});
    }
    if (cliente.telefone.length != 11) {
        res.status(400).json({"mensagem": "'telefone' deve conter exatamente 11 dígitos"});
    }
    if (!cliente.telefone instanceof 'number') {
        res.status(400).json({"mensagem": "'telefone' deve conter apenas números"});
    }

    const novoCliente = {
        id: idClienteNovo,
        nome: cliente.nome,
        telefone: cliente.telefone
    };

    clientes.push(novoCliente);
    res.status(201).json({"mensagem": "Cliente cadastrado com sucesso"});
    idClienteNovo++;
});

module.exports = rota;