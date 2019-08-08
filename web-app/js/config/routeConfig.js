angular.module("kitchen").config(function($routeProvider) {
	$routeProvider.when("/login", {
		templateUrl:"view/login.html",
		controller:"loginCtrl"
	});

	$routeProvider.when("/menu", {
		templateUrl:"view/cardapio.html",
		controller:"cardapioCtrl"
	});
		
	$routeProvider.when("/pedidos", {
		templateUrl:"view/pedidos.html",
		controller:"pedidosCtrl"
	});
    
    $routeProvider.otherwise({redirectTo:"/login"});
});