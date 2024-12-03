const express = require('express');
const rota = express.Router();
const carros = require('./carros').carros;
const servicos = require('./servicos').servicos;

const agendamentos = [];

rota.get('/agendamentos', (req, res) => {
    res.json(agendamentos);
});

rota.post('/agendamentos', (req, res) => {
    const agendamento = req.body;

    const idCarro = parseInt(agendamento.id_carro);
    const idCarroExistente = carros.findIndex(c => c.id === idCarro);

    if (idCarroExistente === -1) {
        res.status(400).json({"mensagem": "'id_carro' não corresponde a um carro cadastrado"});
    }
    else {
        const idServico = parseInt(agendamento.id_servico);
        const idServicoExistente = servicos.findIndex(s => s.id === idServico);

        if (idCarroExistente === -1) {
            res.status(400).json({"mensagem": "'id_servico' não corresponde a um serviço cadastrado"});
        }
        else {
            if (agendamento.data_hora == null) {
                res.status(400).json({"mensagem": "'data_hora' deve ser informado"});
            }
            else {
                const novoAgendamento = {
                    id_carro: agendamento.id_carro,
                    id_servico: agendamento.id_servico,
                    data_hora: agendamento.data_hora
                };
                agendamentos.push(novoAgendamento);
                res.status(201).json({"mensagem": "Agendamento cadastrado com sucesso"});
            }
        }
    }
});

module.exports = rota;