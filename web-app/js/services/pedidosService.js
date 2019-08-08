angular.module('kitchen').factory('pedidos', function ($http) {
    var listar = function () {
        return $http.get('http://localhost:9000/pedidos');
    };

    var editar = function (id) {
        var edit = { id: id };
        return $http.post('http://localhost:9000/pedidos/editar', edit);
    };

    return {
        listar: listar,
        editar: editar
    }
});