const express = require('express');
const rota = express.Router();

const servicos = [];
let idServicoNovo = 1;

rota.get('/servicos', (req, res) => {
    res.json(servicos);
});

rota.post('/servicos', (req, res) => {
    const servico = req.body;

    if (servico.descricao.length < 5) {
        res.status(400).json({"mensagem": "'descricao' deve conter no mínimo 5 caracteres"});
    }
    else if (servico.descricao.length > 100) {
        res.status(400).json({"mensagem": "'descricao' deve conter no máximo 100 caracteres"});
    }
    else {
        let valorInvalidoEncontrado = false;

        for (const valor of servico.valores) {
            if (valor.valor < 0) {
                res.status(400).json({"mensagem": "O valor para '" + valor.tamanho + "' deve ser igual ou maior que 0"});
                valorInvalidoEncontrado = true;
            }
        }
        if (!valorInvalidoEncontrado) {
            const novoServico = {
                id: idServicoNovo,
                descricao: servico.descricao,
                valores: servico.valores
            };
        
            servicos.push(novoServico);
            res.status(201).json({"mensagem": "Serviço cadastrado com sucesso"});
            idServicoNovo++;
        }
    }
});

rota.get('/servicos/:codigo', (req, res) => {
    const id = parseInt(req.params.codigo);

    const servico = servicos.find(s => s.id === id);

    if (servico) {
        res.json(servico);
    } else {
        res.status(404).json({"message": "Serviço não encontrado"});
    }
});

rota.put('/servicos/:codigo', (req, res) => {
    const id = parseInt(req.params.codigo);
    const servico = req.body;

    if (id <= 0) {
        res.status(400).json({"mensagem": "'codigo' deve ser maior que 0"});
    }
    else if (servico.descricao.length < 5) {
        res.status(400).json({"mensagem": "'descricao' deve conter no mínimo 5 caracteres"});
    }
    else if (servico.descricao.length > 100) {
        res.status(400).json({"mensagem": "'descricao' deve conter no máximo 100 caracteres"});
    }
    else {
        let valorInvalidoEncontrado = false;

        for (const valor of servico.valores) {
            if (valor.valor < 0) {
                res.status(400).json({"mensagem": "O valor para '" + valor.tamanho + "' deve ser igual ou maior que 0"});
                valorInvalidoEncontrado = true;
            }
        }
        if (!valorInvalidoEncontrado) {
            const idServicoRemovido = servicos.find(s => s.id === id);

            if (idServicoRemovido != -1) {
                servicos.splice(idServicoRemovido, 1);

                const novoServico = {
                    id: servico.id,
                    descricao: servico.descricao,
                    valores: servico.valores
                };
            
                servicos.push(novoServico);
                res.status(201).json({"mensagem": "Serviço cadastrado com sucesso"});
                idServicoNovo++;
            } else {
                res.status(404).json({"message": "Serviço não encontrado"});
            }
        }
    }
});

rota.delete('/servicos/:codigo', (req, res) => {
    const id = parseInt(req.params.codigo);

    const idServicoRemovido = servicos.findIndex(s => s.id === id);

    if (idServicoRemovido != -1) {
        servicos.splice(idServicoRemovido, 1);
        res.json({"mensagem": "Serviço removido com sucesso"});
    } else {
        res.status(404).json({"message": "Serviço não encontrado"});
    }
});

module.exports = {rota, servicos};