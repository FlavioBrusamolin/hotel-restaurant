angular.module('kitchen').controller('cardapioCtrl', function ($scope, pratos, $rootScope) {
    var listar = function () {
        var promise = pratos.listar();
        promise.then(function (response) {
            $scope.pratos = response.data;
        });
        promise.catch(function () {
            alert('Nao foi possivel buscar os pratos disponiveis no cardapio.');
        });
    };

    $scope.cadastrar = function (prato) {
        var promise = pratos.lerFileName();
        promise.then(function (response) {
            var quant_filename = response.data.length - 1;
            var img = response.data;
            var file = img[quant_filename].filename;
            cadastrarPrato(file);
        });
        promise.catch(function () {
            alert('Nao foi possivel buscar o filename da imagem.')
        });

        var cadastrarPrato = function (file) {
            prato.file = file;
            var promise = pratos.cadastrar(prato);
            promise.then(function () {
                $('#modalAdd').modal('hide');
                listar();
            });
            promise.catch(function () {
                alert('Nao foi possivel adicionar o prato ao card\u00e1pio.');
            });
        }
    };

    $scope.limparModal = function () {
        $scope.prato = {};
        angular.element("input[type='file']").val(null);
    };

    $scope.enviarNomeModal = function(prato) {
        document.getElementById("titulo_modal").innerHTML = prato.nome;
        
        $scope.excluir = function() {
            var promise = pratos.excluir(prato._id);
            promise.then(function () {
                $('#modalDelete').modal('hide');
                listar();
            });
            promise.catch(function () {
                alert('Nao foi possivel excluir o prato do cardapio.');
            });
        };
    }

    document.getElementById("file").onchange = function() {
        document.getElementById("form").submit();
    };

    listar();
    clearInterval($rootScope.reqPedidos);
});