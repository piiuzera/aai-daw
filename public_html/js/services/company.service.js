angular.module('App')
	.service('Company', ['$http',
		function($http) {

			var _create = function(company) {
				return $http.post('/api/company/create', company);
			};

			var _update = function(company, id) {
				return $http.put('/api/company/update/' + id, company);
			};

			var _remove = function(id) {
				return $http.delete('/api/company/delete/' + id);
			};

			var _findAll = function() {
				return $http.get('/api/company');
			};

			var _findById = function(id) {
				return $http.get('/api/company/' + id);
			};

			return {
				create 		: _create,
				update 		: _update,
				remove 		: _remove,
				findAll 	: _findAll,
				findById 	: _findById
			};
}]);