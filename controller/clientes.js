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
    else if (cliente.nome.length > 100) {
        res.status(400).json({"mensagem": "'nome' deve conter no máximo 100 caracteres"});
    }
    else if (cliente.telefone.toString().length != 11) {
        res.status(400).json({"mensagem": "'telefone' deve conter exatamente 11 dígitos"});
    }
    else {
        const novoCliente = {
            id: idClienteNovo,
            nome: cliente.nome,
            telefone: cliente.telefone
        };
    
        clientes.push(novoCliente);
        res.status(201).json({"mensagem": "Cliente cadastrado com sucesso"});
        idClienteNovo++;
    }
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
    const id = parseInt(req.params.codigo);
    const cliente = req.body;

    if (id <= 0) {
        res.status(400).json({"mensagem": "'codigo' deve ser maior que 0"});
    }
    else if (cliente.nome.length < 3) {
        res.status(400).json({"mensagem": "'nome' deve conter no mínimo 3 caracteres"});
    }
    else if (cliente.nome.length > 100) {
        res.status(400).json({"mensagem": "'nome' deve conter no máximo 100 caracteres"});
    }
    else if (cliente.telefone.toString().length != 11) {
        res.status(400).json({"mensagem": "'telefone' deve conter exatamente 11 dígitos"});
    }
    else {
        const idClienteRemovido = clientes.findIndex(c => c.id === id);

        if (idClienteRemovido != -1) {
            clientes.splice(idClienteRemovido, 1);
    
            const clienteNovo = {
                id: cliente.id,
                nome: cliente.nome,
                telefone: cliente.telefone
            };
    
            clientes.push(clienteNovo);
            res.json({"mensagem": "Cliente atualizado com sucesso"});
        } else {
            res.status(404).json({"message": "Cliente não encontrado"});
        }
    }
});

rota.delete('/clientes/:codigo', (req, res) => {
    const id = parseInt(req.params.codigo);

    const idClienteRemovido = clientes.findIndex(c => c.id === id);

    if (idClienteRemovido != -1) {
        clientes.splice(idClienteRemovido, 1);
        res.json({"mensagem": "Cliente removido com sucesso"});
    } else {
        res.status(404).json({"message": "Cliente não encontrado"});
    }
});

module.exports = {rota, clientes};