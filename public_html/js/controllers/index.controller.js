angular.module('App')
	.controller('indexController', ['$scope',
		function($scope) {

			$scope.disciplina = {};

			$scope.alunos = [];

			var _init = function() {
				$scope.disciplina.nome 		= 'DAW - Desenvolvimento de Aplicações WEB';
				$scope.disciplina.professor = 'Flávio Veloso Laper';

				$scope.alunos.push("Carla Victal");
				$scope.alunos.push("Italo Bianchini");
				$scope.alunos.push("Vinicius Emiliano");
			};

			$scope.Init = _init;
}]);