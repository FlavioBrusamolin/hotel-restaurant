var Cliente = require('./modelo');

var cadastrar = function (cliente, quandoSalvar, quandoDerErro) {
    new Cliente(cliente).save(function (err, resultados) {
        if (err) {
            quandoDerErro(err);
        }
        else {
            quandoSalvar(resultados);
        }
    });
}

var autenticar = function (email, senha, quandoEncontrar, quandoDerErro) {
    Cliente.findOne({ email: email, senha: senha })
        .exec(function (err, cliente) {
            if (err) {
                quandoDerErro(err);
            }
            else if (cliente) {
                quandoEncontrar(cliente);
            }
            else {
                quandoDerErro(new Error('Cliente invalido'));
            }
        });
}

var buscar = function(email, quandoEncontrar, quandoDerErro) {
    Cliente.findOne({email: email})
        .exec(function(err, cliente) {
            if(err) {
                quandoDerErro(err);
            }
            else {
                quandoEncontrar(cliente);
            }
        });
}

exports.cadastrar = cadastrar;
exports.autenticar = autenticar;
exports.buscar = buscar;