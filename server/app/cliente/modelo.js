var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var clienteSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cpf: {
        type: Number,
        required: true
    },
    quarto: {
        type: Number,
        required: true
    },
    senha: {
        type: String,
        required: true
    }
});

var Cliente = mongoose.model('clientes', clienteSchema);

module.exports = Cliente; 