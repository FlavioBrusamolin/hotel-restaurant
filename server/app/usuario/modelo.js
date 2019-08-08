var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usuarioSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    }
});

var Usuario = mongoose.model('funcionarios', usuarioSchema);

module.exports = Usuario; 