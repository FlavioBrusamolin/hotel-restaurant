angular.module('kitchen').controller('pedidosCtrl', function ($scope, pedidos, $rootScope) {
    var listarPedidos = function () {
        var promise = pedidos.listar();
        promise.then(function (response) {
            $scope.pedidos = response.data;
        });
        promise.catch(function () {
            alert('Nao foi possivel buscar os pedidos dos hospedes.');
        });
    };

    $scope.enviarNomeModal = function(pedido) {
        document.getElementById("titulo_modal").innerHTML = pedido.nome;
        document.getElementById("texto_modal").innerHTML = 'Confirma a entrega do pedido ao ' + pedido.usuario + '?';
        
        $scope.editarStatus = function() {
            var promise = pedidos.editar(pedido._id);
            promise.then(function () {
                $('#modalValidar').modal('hide');
                listarPedidos();
            });
            promise.catch(function () {
                alert('Nao foi possivel validar o pedido.');
            });
        };
    }

    listarPedidos();
    orders = setInterval(listarPedidos, 3000);
    $rootScope.reqPedidos = orders;
});