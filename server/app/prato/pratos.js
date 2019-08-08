var Prato = require('./modelo');

var cadastrar = function (prato, quandoSalvar, quandoDerErro) {
    new Prato(prato).save(function (err, resultados) {
        if (err) {
            quandoDerErro(err);
        }
        else {
            quandoSalvar(resultados);
        }
    });
}

var listar = function (quandoListar, quandoDerErro) {
    Prato.find()
        .select({ nome: true, descricao: true, valor: true, file: true, _id: true })
        .exec(function (err, pratos) {
            if (err) {
                quandoDerErro(err);
            }
            else {
                quandoListar(pratos);
            }
        });
}

var excluir = function (id, quandoExcluir, quandoDerErro) {
    Prato.findOne({ _id: id }).remove()
        .exec(function (err, resultados) {
            if (err) {
                quandoDerErro(err);
            }
            else {
                quandoExcluir(resultados);
            }
        });
}

exports.cadastrar = cadastrar;
exports.listar = listar;
exports.excluir = excluir;