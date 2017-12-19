(function () { 
	angular.module('UnimediaInfiniteRepliesApp', ['ngRoute', 'ngSanitize']);

	//myCtrl.$inject = ['$routeProvider'];
	function config ($routeProvider, $locationProvider) {
	 $routeProvider
	 .when('/', {
	 	templateUrl: 'home/home.view.html',
	 	controller: 'homeCtrl',
	 	controllerAs: 'vm'
	 })
	 .otherwise({redirectTo: '/'});
	$locationProvider.html5Mode(true);
	}
	angular
	 .module('UnimediaInfiniteRepliesApp')
	 .config(['$routeProvider', '$locationProvider', config]);
})();