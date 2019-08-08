angular.module('kitchen').factory('usuarios', function ($http) {
    var autenticar = function (nome, senha) {
        var auth = { nome: nome, senha: senha };
        return $http.post('http://localhost:9000/usuarios', auth);
    };

    return {
        autenticar: autenticar
    }
});