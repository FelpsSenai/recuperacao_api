const express = require('express');
const rota = express.Router();

const servicos = [];
const idServicoNovo = 1;

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

// rota.get('/clientes/:codigo', (req, res) => {
//     const id = parseInt(req.params.codigo);

//     const cliente = clientes.find(c => c.id === id);

//     if (cliente) {
//         res.json(cliente);
//     } else {
//         res.status(404).json({"message": "Cliente não encontrado"});
//     }
// });

// rota.put('/clientes/:codigo', (req, res) => {
//     const id = parseInt(req.params.codigo);
//     const cliente = req.body;

//     if (id <= 0) {
//         res.status(400).json({"mensagem": "'codigo' deve ser maior que 0"});
//     }
//     else if (cliente.nome.length < 3) {
//         res.status(400).json({"mensagem": "'nome' deve conter no mínimo 3 caracteres"});
//     }
//     else if (cliente.nome.length > 100) {
//         res.status(400).json({"mensagem": "'nome' deve conter no máximo 100 caracteres"});
//     }
//     else if (cliente.telefone.toString().length != 11) {
//         res.status(400).json({"mensagem": "'telefone' deve conter exatamente 11 dígitos"});
//     }
//     else {
//         const idClienteRemovido = clientes.findIndex(c => c.id === id);

//         if (idClienteRemovido != -1) {
//             clientes.splice(idClienteRemovido, 1);
    
//             const clienteNovo = {
//                 id: cliente.id,
//                 nome: cliente.nome,
//                 telefone: cliente.telefone
//             };
    
//             clientes.push(clienteNovo);
//             res.json({"mensagem": "Cliente atualizado com sucesso"});
//         } else {
//             res.status(404).json({"message": "Cliente não encontrado"});
//         }
//     }
// });

// rota.delete('/clientes/:codigo', (req, res) => {
//     const id = parseInt(req.params.codigo);

//     const idClienteRemovido = clientes.findIndex(c => c.id === id);

//     if (idClienteRemovido != -1) {
//         clientes.splice(idClienteRemovido, 1);
//         res.json({"mensagem": "Cliente removido com sucesso"});
//     } else {
//         res.status(404).json({"message": "Cliente não encontrado"});
//     }
// });

module.exports = rota;