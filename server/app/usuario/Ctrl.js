var usuarios = require('./usuarios');

var autenticar = function(req, res) {
    usuarios.autenticar(req.body.nome, req.body.senha, function(usuario) {
        res.status(200).json(usuario);
    }, function(erro) {
        res.status(401).json(erro);
    });
}

exports.autenticar = autenticar;  