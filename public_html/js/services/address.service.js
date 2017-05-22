angular.module('App')
	.service('Address', ['$http',
		function($http) {

			var _getAddressByZipcode = function(zipcode) {
				return $http.get('http://viacep.com.br/ws/' + zipcode + '/json/');
			};

			return {
				getAddressByZipcode : _getAddressByZipcode
			};
}]);