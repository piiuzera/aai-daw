angular.module('App')
	.controller('companyController', ['$scope', 'Company', 'Address', 'Message',
		function($scope, Company, Address, Message) {

			$scope.company 		= {};
			$scope.editCompany 	= {};
			$scope.companies 	= [];

			var _getAddressByZipcode = function(company) {
				if (company.zipcode.length !== 8) {
					return;
				}

				Address.getAddressByZipcode(company.zipcode).then(
					callbackGetAddressByZipcode.bind(this, company),
					callbackGetAddressByZipcode.bind(this, company)
				);
			};

			var callbackGetAddressByZipcode = function(company, response) {
				if (response.status > 399) {
					return;
				}

				if (response.data.error) {
					return;
				}

				company.street 		= response.data.logradouro;
				company.complement 	= response.data.complemento;
				company.district 	= response.data.bairro;
				company.city 		= response.data.localidade;
				company.state 		= response.data.uf;
			};

			var _createCompany = function($event) {
				var element = $event.currentTarget;

				$(element).button('loading');

				Company.create($scope.company).then(
					callbackCreateCompany.bind(this, element),
					callbackCreateCompany.bind(this, element)
				);
			};

			var callbackCreateCompany = function(element, response) {
				$(element).button('reset');

				if (response.status > 399) {
					Message.Show(response.data.message, 'Erro ao Cadastrar', 'error');

					return;
				}

				delete $scope.company;

				$scope.companies.push(response.data.company);

				$('.modal').modal('hide');

				Message.Show(response.data.message, 'Cadastro Efetuado', 'success');
			};

			var _updateCompany = function($event, id) {
				var element = $event.currentTarget;

				$(element).button('loading');

				Company.update($scope.editCompany, id).then(
					callbackUpdateCompany.bind(this, element),
					callbackUpdateCompany.bind(this, element)
				);
			};

			var callbackUpdateCompany = function(element, response) {
				$(element).button('reset');

				if (response.status > 399) {
					Message.Show(response.data.message, 'Erro ao Atualizar', 'error');

					return;
				}

				delete $scope.editCompany;

				for (var i = 0; i < $scope.companies.length; ++i) {
					if ($scope.companies[i].id == response.data.company.id) {
						$scope.companies[i].name = response.data.company.name;
						$scope.companies[i].cnpj = response.data.company.cnpj;
						$scope.companies[i].street = response.data.company.street;
						$scope.companies[i].number = response.data.company.number;
						$scope.companies[i].complement = response.data.company.complement;
						$scope.companies[i].district = response.data.company.district;
						$scope.companies[i].zipcode = response.data.company.zipcode;
						$scope.companies[i].city = response.data.company.city;
						$scope.companies[i].state = response.data.company.state;
					}
				}

				$('.modal').modal('hide');

				Message.Show(response.data.message, 'Atualização Efetuada', 'success');
			};

			var _confirmDeleteCompany = function(id) {
				Message.Confirm('Tem certeza que deseja excluir esta empresa ?',
								'Confirmação de Exclusão',
								$scope.DeleteCompany.bind(this, id),
								function() { });
			};

			var _deleteCompany = function(id) {
				Company.remove(id).then(
					callbackDeleteCompany.bind(this, id),
					callbackDeleteCompany.bind(this, id)
				);
			};

			var callbackDeleteCompany = function(id, response) {
				if (response.status > 399) {
					Message.Show(response.data.message, 'Erro ao Atualizar', 'error');

					return;
				}

				var companies = [];
				for (var i = 0; i < $scope.companies.length; ++i) {
					if ($scope.companies[i].id != id) {
						companies.push($scope.companies[i]);
					}
				}

				$scope.companies = companies;

				Message.Show(response.data.message, 'Exclusão Efetuada', 'success');
			};

			var _findAllCompany = function() {
				Company.findAll().then(
					callbackFindAll,
					callbackFindAll
				);
			};

			var callbackFindAll = function(response) {
				if (response.status > 399) {
					Message.Show('Problemas ao estabelecer conexão com o servidor!',
								 'Erro ao Conectar',
								 'error');

					return;
				}
				$scope.companies = response.data.companies;
			};

			var _findByIdCompany = function(id) {
				Company.findById(id).then(
					callbackFindById,
					callbackFindById
				);
			};

			var callbackFindById = function(response) {
				if (response.status > 399) {
					Message.Show('Problemas ao estabelecer conexão com o servidor!',
								 'Erro ao Conectar',
								 'error');

					return;
				}

				$scope.editCompany = response.data.company;

				$('#editCompany').modal('show');
			};

			var _init = function() {
				$scope.FindAllCompany();
			};

			$scope.GetAddressByZipcode 	= _getAddressByZipcode;
			$scope.CreateCompany 		= _createCompany;
			$scope.UpdateCompany 		= _updateCompany;
			$scope.ConfirmDeleteCompany = _confirmDeleteCompany;
			$scope.DeleteCompany 		= _deleteCompany;
			$scope.FindAllCompany 		= _findAllCompany;
			$scope.FindByIdCompany 		= _findByIdCompany;
			$scope.Init 				= _init;
}]);