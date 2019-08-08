var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pratoSchema = new Schema({
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
    }
});

var Prato = mongoose.model('pratos', pratoSchema);

module.exports = Prato; 