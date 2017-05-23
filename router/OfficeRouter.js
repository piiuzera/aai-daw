"use strict";

var OfficeApi	= require('../api/OfficeApi');
var Express 	= require('express');
var Validator 	= require('validatorjs');

var self = this;

(function() {

	var Router = Express.Router();

	Router.post('/create', function(request, response) {
		var validation = new Validator(request.body, {
			name 		: 'required'
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

		var office = OfficeApi.Create(request.body);

		response.status(201).json({
			res: true,
			date: new Date(),
			office: office,
			message: 'Cargo cadastrado com sucesso!'
		});
	});

	Router.put('/update/:id', function(request, response) {
		var validation = new Validator(request.body, {
			name 		: 'required'
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

		var office = OfficeApi.Update(request.body, request.params.id);

		response.status(200).json({
			res: true,
			date: new Date(),
			office: office,
			message: 'Cargo atualizado com sucesso!'
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

		if (!OfficeApi.Remove(request.params.id)) {
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
			message: 'Cargo excluído com sucesso!'
		});
	});

	Router.get('/', function(request, response) {
		var offices = OfficeApi.FindAll();

		response.status(200).json({
			res: true,
			date: new Date(),
			offices: offices
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

		var office = OfficeApi.FindById(request.params.id);

		if (!office) {
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
			office: office
		});
	});

	var _getRouter = function() {
		return Router;
	};

	self.GetRouter = _getRouter;
})();