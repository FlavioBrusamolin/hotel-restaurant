angular.module('kitchen').controller('loginCtrl', function ($scope, usuarios, $rootScope) {
    $scope.usuario = {};

    $scope.entrar = function (usuario) {
        var promise = usuarios.autenticar(usuario.nome, usuario.senha);
        promise.then(function () {
            window.location.replace("#!/menu");
        });
        promise.catch(function () {
            $scope.usuario = {};
            alert('O usu\u00e1rio ou a senha est\u00e3o incorretos.');
        });
    };

    clearInterval($rootScope.reqPedidos);
});