var clientes = require('./clientes');

var cadastrar = function(req, res) {
    var cliente = req.body;
    clientes.cadastrar(cliente, function(resultado) {
        res.status(201).json(resultado);
    }, function(erro) {
        res.status(400).json(erro);
    });
};

var autenticar = function(req, res) {
    clientes.autenticar(req.body.email, req.body.senha, function(cliente) {
        res.status(200).json(cliente);
    }, function(erro) {
        res.status(401).json(erro);
    });
}

var buscar = function(req, res) {
    clientes.buscar(req.body.email, function(cliente) {
        res.status(200).json(cliente);
    }, function(erro) {
        res.status(400).json(erro);
    });
}

exports.cadastrar = cadastrar;
exports.autenticar = autenticar;
exports.buscar = buscar;
