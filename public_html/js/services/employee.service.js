angular.module('App')
	.service('Employee', ['$http',
		function($http) {

			var _create = function(employee) {
				return $http.post('/api/employee/create', employee);
			};

			var _update = function(employee, id) {
				return $http.put('/api/employee/update/' + id, employee);
			};

			var _remove = function(id) {
				return $http.delete('/api/employee/delete/' + id);
			};

			var _findAll = function() {
				return $http.get('/api/employee');
			};

			var _findById = function(id) {
				return $http.get('/api/employee/' + id);
			};

			return {
				create 		: _create,
				update 		: _update,
				remove 		: _remove,
				findAll 	: _findAll,
				findById 	: _findById
			};
}]);