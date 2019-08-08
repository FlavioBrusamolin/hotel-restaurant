var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pedidoSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    valor: {
        type: String,
        required: true
    },
    file: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    usuario: {
        type: String,
        required: true
    },
    quarto: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});

var Pedido = mongoose.model('pedidos', pedidoSchema);

module.exports = Pedido; 