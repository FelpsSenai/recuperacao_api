const express = require('express');
const rota = express.Router();
const clientes = require('./clientes').clientes;

const carros = [];
let idCarroNovo = 1;

rota.get('/carros', (req, res) => {
    res.json(carros);
});

rota.post('/carros', (req, res) => {
    const carro = req.body;

    if (carro.marca.length < 3) {
        res.status(400).json({"mensagem": "'marca' deve conter mínimo 3 caracteres"});
    }
    else if (carro.marca.length > 50) {
        res.status(400).json({"mensagem": "'marca' deve conter no máximo 50 caracteres"});
    }
    else if (carro.modelo.length < 2) {
        res.status(400).json({"mensagem": "'modelo' deve conter no mínimo 2 caracteres"});
    }
    else if (carro.modelo.length > 50) {
        res.status(400).json({"mensagem": "'modelo' deve conter no máximo 50 caracteres"});
    }
    else if (
        carro.tamanho != 'HATCH'
        && carro.tamanho != 'SEDAN'
        && carro.tamanho != 'SUV'
        && carro.tamanho != 'PICAPE'
    ) {
        res.status(400).json({"mensagem": "'tamanho' deve ser HATCH, SEDAN, SUV ou PICAPE"});
    }
    else {
        const idCliente = parseInt(carro.id_cliente);
        const idClienteExistente = clientes.findIndex(c => c.id === idCliente);
    
        if (idClienteExistente === -1) {
            res.status(400).json({"mensagem": "'id_cliente' não corresponde a um cliente cadastrado"});
        } else {
            const novoCarro = {
                id: idCarroNovo,
                marca: carro.marca,
                modelo: carro.modelo,
                tamanho: carro.tamanho,
                id_cliente: idCliente
            };
        
            carros.push(novoCarro);
            res.status(201).json({"mensagem": "Carro cadastrado com sucesso"});
            idCarroNovo++;
        }
    }
});

rota.get('/carros/:codigo', (req, res) => {
    const id = parseInt(req.params.codigo);

    const carro = carros.find(c => c.id === id);

    if (carro) {
        res.json(carro);
    } else {
        res.status(404).json({"message": "Carro não encontrado"});
    }
});

rota.put('/carros/:codigo', (req, res) => {
    const id = parseInt(req.params.codigo);
    const carro = req.body;

    if (id <= 0) {
        res.status(400).json({"mensagem": "'codigo' deve ser maior que 0"});
    }
    else if (carro.marca.length < 3) {
        res.status(400).json({"mensagem": "'marca' deve conter mínimo 3 caracteres"});
    }
    else if (carro.marca.length > 50) {
        res.status(400).json({"mensagem": "'marca' deve conter no máximo 50 caracteres"});
    }
    else if (carro.modelo.length < 2) {
        res.status(400).json({"mensagem": "'modelo' deve conter no mínimo 2 caracteres"});
    }
    else if (carro.modelo.length > 50) {
        res.status(400).json({"mensagem": "'modelo' deve conter no máximo 50 caracteres"});
    }
    else if (
        carro.tamanho != 'HATCH'
        && carro.tamanho != 'SEDAN'
        && carro.tamanho != 'SUV'
        && carro.tamanho != 'PICAPE'
    ) {
        res.status(400).json({"mensagem": "'tamanho' deve ser HATCH, SEDAN, SUV ou PICAPE"});
    }
    else {
        const idCliente = parseInt(carro.id_cliente);
        const idClienteExistente = clientes.findIndex(c => c.id === idCliente);
    
        if (idClienteExistente === -1) {
            res.status(400).json({"mensagem": "'id_cliente' não corresponde a um cliente cadastrado"});
        } else {
            const idCarroRemovido = carros.findIndex(c => c.id === id);

            if (idCarroRemovido != -1) {
                carros.splice(idCarroRemovido, 1);

                const novoCarro = {
                    id: idCarroNovo,
                    marca: carro.marca,
                    modelo: carro.modelo,
                    tamanho: carro.tamanho,
                    id_cliente: idCliente
                };
            
                carros.push(novoCarro);
                res.status(201).json({"mensagem": "Carro Atualizado com sucesso"});
            } else {
                res.status(404).json({"message": "Carro não encontrado"});
            }

            
        }
    }
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