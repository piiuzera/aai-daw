"use strict";

var EmployeeApi	= require('../api/EmployeeApi');
var Express 	= require('express');
var Validator 	= require('validatorjs');

var self = this;

(function() {

	var Router = Express.Router();

	Router.post('/create', function(request, response) {
		var validation = new Validator(request.body, {
			fk_company	: 'required',
			fk_office	: 'required',
			name 		: 'required',
			email 		: 'required',
			salary 		: 'required'
		});

		if (validation.fails()) {
			response.status(401).json({
				res: false,
				date: new Date(),
				message: 'Preencha todos os campos obrigatórios!',
				errors: validation.errors
			});

			return;
		}

		var employee = EmployeeApi.Create(request.body);

		response.status(201).json({
			res: true,
			date: new Date(),
			employee: employee,
			message: 'Funcionário cadastrado com sucesso!'
		});
	});

	Router.put('/update/:id', function(request, response) {
		var validation = new Validator(request.body, {
			fk_company	: 'required',
			fk_office	: 'required',
			name 		: 'required',
			email 		: 'required',
			salary 		: 'required'
		});

		if (validation.fails()) {
			response.status(401).json({
				res: false,
				date: new Date(),
				message: 'Preencha todos os campos obrigatórios!',
				errors: validation.errors
			});

			return;
		}

		if (!request.params.id) {
			response.status(401).json({
				res: false,
				date: new Date(),
				message: 'Informe a chave do registro para alteração!'
			});

			return;
		}

		var employee = EmployeeApi.Update(request.body, request.params.id);

		response.status(200).json({
			res: true,
			date: new Date(),
			employee: employee,
			message: 'Funcionário atualizado com sucesso!'
		});
	});

	Router.delete('/delete/:id', function(request, response) {
		if (!request.params.id) {
			response.status(401).json({
				res: false,
				date: new Date(),
				message: 'Informe a chave do registro para exclusão!'
			});

			return;
		}

		if (!EmployeeApi.Remove(request.params.id)) {
			response.status(401).json({
				res: false,
				date: new Date(),
				message: 'Não foi Possível Excluir este Registro!'
			});

			return;
		}

		response.status(200).json({
			res: true,
			date: new Date(),
			message: 'Funcionário excluído com sucesso!'
		});
	});

	Router.get('/', function(request, response) {
		var employees = EmployeeApi.FindAll();

		response.status(200).json({
			res: true,
			date: new Date(),
			employees: employees
		});
	});

	Router.get('/:id', function(request, response) {
		if (!request.params.id) {
			response.status(401).json({
				res: false,
				date: new Date(),
				message: 'Informe a chave do registro para a busca!'
			});

			return;
		}

		var employee = EmployeeApi.FindById(request.params.id);

		if (!employee) {
			response.status(401).json({
				res: false,
				date: new Date(),
				message: 'Registro inexistente em nossa base dados!'
			});

			return;
		}

		response.status(200).json({
			res: true,
			date: new Date(),
			employee: employee
		});
	});

	var _getRouter = function() {
		return Router;
	};

	self.GetRouter = _getRouter;
})();