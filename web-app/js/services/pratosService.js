angular.module('kitchen').factory('pratos', function ($http) {
    var cadastrar = function (prato) {
        return $http.post('http://localhost:9000/pratos', prato);
    };

    var listar = function () {
        return $http.get('http://localhost:9000/pratos');
    };

    var lerFileName = function () {
        return $http.get('http://localhost:9000/files');
    };

    var excluir = function (id) {
        var ex = { id: id };
        return $http.post('http://localhost:9000/pratos/excluir', ex);
    };

    return {
        cadastrar: cadastrar,
        listar: listar,
        lerFileName: lerFileName,
        excluir: excluir
    }
});