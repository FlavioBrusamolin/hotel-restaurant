var Pedido = require('./modelo');

var cadastrar = function(pedido, quandoSalvar, quandoDerErro) {
    new Pedido(pedido).save(function(err, resultados) {
        if(err) {
            quandoDerErro(err);
        }
        else {
            quandoSalvar(resultados);
        }
    });
}

var buscar = function(email, quandoListar, quandoDerErro) {
    Pedido.find({email:email})
        .select({ nome:true, descricao:true, valor:true, file:true, email:true, status:true, usuario:true, quarto:true, _id:true })
        .exec(function(err, pedidos) {
            if(err) {
                quandoDerErro(err);
            }
            else {
                quandoListar(pedidos);
            }
        });
}

var listar = function (quandoListar, quandoDerErro) {
    Pedido.find()
        .select({ nome: true, descricao: true, valor: true, file: true, email:true, status:true, usuario:true, quarto:true, _id: true })
        .exec(function (err, pedidos) {
            if (err) {
                quandoDerErro(err);
            }
            else {
                quandoListar(pedidos);
            }
        });
}

var editar = function (id, quandoEditar, quandoDerErro) {
    Pedido.findOne({ _id: id })
        .exec(function (err, pedidos) {
            if (err) {
                quandoDerErro(err);
            }
            else {
                pedidos.status = 'Entregue';
                pedidos.save();
                quandoEditar(pedidos);
            }
        });
}

exports.cadastrar = cadastrar;
exports.buscar = buscar;
exports.listar = listar;
exports.editar = editar;