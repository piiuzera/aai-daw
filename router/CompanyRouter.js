"use strict";

var CompanyApi 	= require('../api/CompanyApi');
var Express 	= require('express');
var Validator 	= require('validatorjs');

var self = this;

(function() {

	var Router = Express.Router();

	Router.post('/create', function(request, response) {
		var validation = new Validator(request.body, {
			name 		: 'required',
			cnpj 		: 'required',
			street 		: 'required',
			number 		: 'required',
			district 	: 'required',
			zipcode 	: 'required',
			city 		: 'required',
			state 		: 'required'
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

		var company = CompanyApi.Create(request.body);

		response.status(201).json({
			res: true,
			date: new Date(),
			company: company,
			message: 'Empresa cadastrada com sucesso!'
		});
	});

	Router.put('/update/:id', function(request, response) {
		var validation = new Validator(request.body, {
			name 		: 'required',
			cnpj 		: 'required',
			street 		: 'required',
			number 		: 'required',
			district 	: 'required',
			zipcode 	: 'required',
			city 		: 'required',
			state 		: 'required'
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

		var company = CompanyApi.Update(request.body, request.params.id);

		response.status(200).json({
			res: true,
			date: new Date(),
			company: company,
			message: 'Empresa atualizada com sucesso!'
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

		if (!CompanyApi.Remove(request.params.id)) {
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
			message: 'Empresa excluída com sucesso!'
		});
	});

	Router.get('/', function(request, response) {
		var companies = CompanyApi.FindAll();

		response.status(200).json({
			res: true,
			date: new Date(),
			companies: companies
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

		var company = CompanyApi.FindById(request.params.id);

		if (!company) {
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
			company: company
		});
	});

	var _getRouter = function() {
		return Router;
	};

	self.GetRouter = _getRouter;
})();