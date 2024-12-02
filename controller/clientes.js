const express = require('express');
const rota = express.Router();

const clientes = [];
let idClienteNovo = 1;

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
    if (cliente.telefone.toString().length != 11) {
        res.status(400).json({"mensagem": "'telefone' deve conter exatamente 11 dígitos"});
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

rota.get('/clientes/:codigo', (req, res) => {
    const id = parseInt(req.params.codigo);

    const cliente = clientes.find(c => c.id === id);

    if (cliente) {
        res.json(cliente);
    } else {
        res.status(404).json({"message": "Cliente não encontrado"});
    }
});

rota.put('/clientes/:codigo', (req, res) => {

});

rota.delete('/clientes/:codigo', (req, res) => {
    const id = parseInt(req.params.codigo);

    const idClienteRemovido = clientes.findIndex(c => c.id === id);

    if (idClienteRemovido != -1) {
        clientes.splice(idClienteRemovido, 1);
        res.status(204).json();
    } else {
        res.status(404).json({"message": "Cliente não encontrado"});
    }
});

module.exports = rota;