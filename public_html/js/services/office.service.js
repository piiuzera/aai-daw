angular.module('App')
	.service('Office', ['$http',
		function($http) {

			var _create = function(office) {
				return $http.post('/api/office/create', office);
			};

			var _update = function(office, id) {
				return $http.put('/api/office/update/' + id, office);
			};

			var _remove = function(id) {
				return $http.delete('/api/office/delete/' + id);
			};

			var _findAll = function() {
				return $http.get('/api/office');
			};

			var _findById = function(id) {
				return $http.get('/api/office/' + id);
			};

			return {
				create 		: _create,
				update 		: _update,
				remove 		: _remove,
				findAll 	: _findAll,
				findById 	: _findById
			};
}]);