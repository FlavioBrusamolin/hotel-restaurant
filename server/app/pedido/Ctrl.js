var pedidos = require('./pedidos');

var cadastrar = function(req, res) {
    var pedido = req.body;
    pedidos.cadastrar(pedido, function(resultado) {
        res.status(201).json(resultado);
    }, function(erro) {
        res.status(400).json(erro);
    });
};

var buscar = function(req, res) {
    pedidos.buscar(req.body.email, function(pedidos) {
        res.status(200).json(pedidos);
    }, function(erro) {
        res.status(400).json(erro);
    });
}

var listar = function (req, res) {
    pedidos.listar(function (pedidos) {
        res.status(200).json(pedidos);
    }, function (erro) {
        res.status(400).json(erro);
    });
};

var editar = function (req, res) {
    pedidos.editar(req.body.id, function (pedidos) {
        res.status(200).json(pedidos);
    }, function (erro) {
        res.status(400).json(erro);
    });
};


exports.cadastrar = cadastrar;
exports.buscar = buscar;
exports.listar = listar;
exports.editar = editar;