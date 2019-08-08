var pratos = require('./pratos');

var cadastrar = function (req, res) {
    var prato = req.body;
    pratos.cadastrar(prato, function (resultado) {
        res.status(201).json(resultado);
    }, function (erro) {
        res.status(400).json(erro);
    });
};

var listar = function (req, res) {
    pratos.listar(function (pratos) {
        res.status(200).json(pratos);
    }, function (erro) {
        res.status(400).json(erro);
    });
};

var excluir = function(req, res) {
    pratos.excluir(req.body.id, function(prato) {
        res.status(200).json(prato);
    }, function(erro) {
        res.status(401).json(erro);
    });
}

exports.cadastrar = cadastrar;
exports.listar = listar;
exports.excluir = excluir;