angular.module('App')
	.controller('employeeController', ['$scope', 'Employee', 'Company', 'Office', 'Address', 'Message',
		function($scope, Employee, Company, Office, Address, Message) {

			$scope.employee 		= {};
			$scope.editEmployee 	= {};
			$scope.employees 		= [];

			$scope.offices 			= [];
			$scope.companies 		= [];

			var _createEmployee = function($event) {
				var element = $event.currentTarget;

				$(element).button('loading');

				if ($scope.employee.company) {
					$scope.employee.fk_company = $scope.employee.company.id;
				}

				if ($scope.employee.office) {
					$scope.employee.fk_office = $scope.employee.office.id;
				}

				Employee.create($scope.employee).then(
					callbackCreateEmployee.bind(this, element),
					callbackCreateEmployee.bind(this, element)
				);
			};

			var callbackCreateEmployee = function(element, response) {
				$(element).button('reset');

				if (!response.data.res) {
					Message.Show(response.data.message, 'Erro ao Cadastrar', 'error');

					return;
				}

				delete $scope.employee;

				$scope.employees.push(response.data.employee);

				$('.modal').modal('hide');

				Message.Show(response.data.message, 'Cadastro Efetuado', 'success');
			};

			var _updateEmployee = function($event, id) {
				var element = $event.currentTarget;

				$(element).button('loading');

				console.log($scope.editEmployee.company);

				if ($scope.editEmployee.company) {
					$scope.editEmployee.fk_company = $scope.editEmployee.company.id;
				} else {
					delete $scope.editEmployee.fk_company;
				}

				if ($scope.editEmployee.office) {
					$scope.editEmployee.fk_office = $scope.editEmployee.office.id;
				} else {
					delete $scope.editEmployee.fk_office;
				}

				Employee.update($scope.editEmployee, id).then(
					callbackUpdateEmployee.bind(this, element),
					callbackUpdateEmployee.bind(this, element)
				);
			};

			var callbackUpdateEmployee = function(element, response) {
				$(element).button('reset');

				if (!response.data.res) {
					Message.Show(response.data.message, 'Erro ao Atualizar', 'error');

					return;
				}

				delete $scope.editEmployee;

				for (var i = 0; i < $scope.employees.length; ++i) {
					if ($scope.employees[i].id == response.data.employee.id) {
						$scope.employees[i].fk_company	= response.data.employee.fk_company;
						$scope.employees[i].fk_office	= response.data.employee.fk_office;
						$scope.employees[i].name 		= response.data.employee.name;
						$scope.employees[i].email 		= response.data.employee.email;
						$scope.employees[i].salary 		= response.data.employee.salary;
						$scope.employees[i].company		= response.data.employee.company;
						$scope.employees[i].office 		= response.data.employee.office;
					}
				}

				$('.modal').modal('hide');

				Message.Show(response.data.message, 'Atualização Efetuada', 'success');
			};

			var _confirmDeleteEmployee = function(id) {
				Message.Confirm('Tem certeza que deseja excluir este funcionário ?',
								'Confirmação de Exclusão',
								$scope.DeleteEmployee.bind(this, id),
								function() { });
			};

			var _deleteEmployee = function(id) {
				Employee.remove(id).then(
					callbackDeleteEmployee.bind(this, id),
					callbackDeleteEmployee.bind(this, id)
				);
			};

			var callbackDeleteEmployee = function(id, response) {
				if (!response.data.res) {
					Message.Show(response.data.message, 'Erro ao Remover', 'error');

					return;
				}

				var employees = [];
				for (var i = 0; i < $scope.employees.length; ++i) {
					if ($scope.employees[i].id != id) {
						employees.push($scope.employees[i]);
					}
				}

				$scope.employees = employees;

				Message.Show(response.data.message, 'Exclusão Efetuada', 'success');
			};

			var _findAllEmployee = function() {
				Employee.findAll().then(
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
				$scope.employees = response.data.employees;
			};

			var _findByIdEmployee = function(id) {
				Employee.findById(id).then(
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

				$scope.editEmployee = response.data.employee;

				$('#editEmployee').modal('show');
			};

			var _findAllCompany = function() {
				Company.findAll().then(
					callbackFindAllCompany,
					callbackFindAllCompany
				);
			};

			var callbackFindAllCompany = function(response) {
				if (!response.data.res) {
					Message.Show(response.data.message,
								 'Erro ao Conectar',
								 'error');

					return;
				}
				$scope.companies = response.data.companies;
			};

			var _findAllOffice = function() {
				Office.findAll().then(
					callbackFindAllOffice,
					callbackFindAllOffice
				);
			};

			var callbackFindAllOffice = function(response) {
				if (!response.data.res) {
					Message.Show(response.data.message,
								 'Erro ao Conectar',
								 'error');

					return;
				}
				$scope.offices = response.data.offices;
			};

			var _init = function() {
				$scope.FindAllEmployee();
				$scope.FindAllCompany();
				$scope.FindAllOffice();
			};

			$scope.CreateEmployee 			= _createEmployee;
			$scope.UpdateEmployee 			= _updateEmployee;
			$scope.ConfirmDeleteEmployee 	= _confirmDeleteEmployee;
			$scope.DeleteEmployee 			= _deleteEmployee;
			$scope.FindAllEmployee 			= _findAllEmployee;
			$scope.FindByIdEmployee 		= _findByIdEmployee;

			$scope.FindAllCompany 			= _findAllCompany;
			$scope.FindAllOffice 			= _findAllOffice;

			$scope.Init 					= _init;
}]);