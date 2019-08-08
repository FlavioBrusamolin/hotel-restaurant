var Usuario = require('./modelo');

var autenticar = function (nome, senha, quandoEncontrar, quandoDerErro) {
    Usuario.findOne({ nome: nome, senha: senha })
        .exec(function (err, usuario) {
            if (err) {
                quandoDerErro(err);
            }
            else if (usuario) {
                quandoEncontrar(usuario);
            }
            else {
                quandoDerErro(new Error('Usuario invalido'));
            }
        });
}

exports.autenticar = autenticar;