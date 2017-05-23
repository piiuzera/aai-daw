angular.module('App')
	.controller('officeController', ['$scope', 'Office', 'Address', 'Message',
		function($scope, Office, Address, Message) {

			$scope.office 		= {};
			$scope.editOffice 	= {};
			$scope.offices 		= [];

			var _createOffice = function($event) {
				var element = $event.currentTarget;

				$(element).button('loading');

				Office.create($scope.office).then(
					callbackCreateOffice.bind(this, element),
					callbackCreateOffice.bind(this, element)
				);
			};

			var callbackCreateOffice = function(element, response) {
				$(element).button('reset');

				if (!response.data.res) {
					Message.Show(response.data.message, 'Erro ao Cadastrar', 'error');

					return;
				}

				delete $scope.office;

				$scope.offices.push(response.data.office);

				$('.modal').modal('hide');

				Message.Show(response.data.message, 'Cadastro Efetuado', 'success');
			};

			var _updateOffice = function($event, id) {
				var element = $event.currentTarget;

				$(element).button('loading');

				Office.update($scope.editOffice, id).then(
					callbackUpdateOffice.bind(this, element),
					callbackUpdateOffice.bind(this, element)
				);
			};

			var callbackUpdateOffice = function(element, response) {
				$(element).button('reset');

				if (!response.data.res) {
					Message.Show(response.data.message, 'Erro ao Atualizar', 'error');

					return;
				}

				delete $scope.editOffice;

				for (var i = 0; i < $scope.offices.length; ++i) {
					if ($scope.offices[i].id == response.data.office.id) {
						$scope.offices[i].name = response.data.office.name;
					}
				}

				$('.modal').modal('hide');

				Message.Show(response.data.message, 'Atualização Efetuada', 'success');
			};

			var _confirmDeleteOffice = function(id) {
				Message.Confirm('Tem certeza que deseja excluir este Cargo ?',
								'Confirmação de Exclusão',
								$scope.DeleteOffice.bind(this, id),
								function() { });
			};

			var _deleteOffice = function(id) {
				Office.remove(id).then(
					callbackDeleteOffice.bind(this, id),
					callbackDeleteOffice.bind(this, id)
				);
			};

			var callbackDeleteOffice = function(id, response) {
				if (!response.data.res) {
					Message.Show(response.data.message, 'Erro ao Remover', 'error');

					return;
				}

				var offices = [];
				for (var i = 0; i < $scope.offices.length; ++i) {
					if ($scope.offices[i].id != id) {
						offices.push($scope.offices[i]);
					}
				}

				$scope.offices = offices;

				Message.Show(response.data.message, 'Exclusão Efetuada', 'success');
			};

			var _findAllOffice = function() {
				Office.findAll().then(
					callbackFindAll,
					callbackFindAll
				);
			};

			var callbackFindAll = function(response) {
				if (!response.data.res) {
					Message.Show(response.data.message,
								 'Erro ao Conectar',
								 'error');

					return;
				}
				$scope.offices = response.data.offices;
			};

			var _findByIdOffice = function(id) {
				Office.findById(id).then(
					callbackFindById,
					callbackFindById
				);
			};

			var callbackFindById = function(response) {
				if (!response.data.res) {
					Message.Show(response.data.message,
								 'Erro ao Conectar',
								 'error');

					return;
				}

				$scope.editOffice = response.data.office;

				$('#editOffice').modal('show');
			};

			var _init = function() {
				$scope.FindAllOffice();
			};

			$scope.CreateOffice 		= _createOffice;
			$scope.UpdateOffice 		= _updateOffice;
			$scope.ConfirmDeleteOffice 	= _confirmDeleteOffice;
			$scope.DeleteOffice 		= _deleteOffice;
			$scope.FindAllOffice 		= _findAllOffice;
			$scope.FindByIdOffice 		= _findByIdOffice;
			$scope.Init 				= _init;
}]);