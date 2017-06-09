angular.module('App')
	.controller('indexController', ['$scope',
		function($scope) {

			$scope.disciplina = {};

			$scope.alunos = [];

			var _init = function() {
				$scope.disciplina.nome 		= 'DAW - Desenvolvimento de Aplicações WEB';
				$scope.disciplina.professor = 'Flávio Veloso Laper';

				$scope.alunos.push("Eric Vilar Yankous Castanheira");
				$scope.alunos.push("Gabriel Barbosa Rocha");
				$scope.alunos.push("Matheus Neiva Amaro");
			};

			$scope.Init = _init;
}]);
