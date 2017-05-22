"use strict";

var JsonFile = require('jsonfile');

var self = this;

(function() {

	var _create = function(company) {
		var jsonDocument = JsonFile.readFileSync('./files/company.json');

		if (jsonDocument.length == 0) {
			company.id = 1;
		} else {
			company.id = jsonDocument[jsonDocument.length - 1].id + 1;
		}

		jsonDocument.push(company);

		JsonFile.writeFileSync('./files/company.json', jsonDocument);

		return company;
	};

	var _update = function(company, id) {
		var jsonDocument = JsonFile.readFileSync('./files/company.json');

		for (var i = 0; i < jsonDocument.length; ++i) {
			var objCompany = jsonDocument[i];
			if (objCompany.id == id) {
				objCompany.name 		= company.name;
				objCompany.cnpj 		= company.cnpj;
				objCompany.street 		= company.street;
				objCompany.number 		= company.number;
				objCompany.complement 	= company.complement;
				objCompany.district 	= company.district;
				objCompany.zipcode 		= company.zipcode;
				objCompany.city 		= company.city;
				objCompany.state 		= company.state;

				JsonFile.writeFileSync('./files/company.json', jsonDocument);

				return objCompany;
			}
		}

		return null;
	};

	var _remove = function(id) {
		var jsonDocument = JsonFile.readFileSync('./files/company.json');

		var newJsonDocument = [];

		for (var i = 0; i < jsonDocument.length; ++i) {
			if (jsonDocument[i].id != id) {
				newJsonDocument.push(jsonDocument[i]);
			}
		}

		if (newJsonDocument.length !== jsonDocument.length) {
			JsonFile.writeFileSync('./files/company.json', newJsonDocument);

			return true;
		}

		return false;
	};

	var _findAll = function() {
		var jsonDocument = JsonFile.readFileSync('./files/company.json');

		return jsonDocument;
	};

	var _findById = function(id) {
		var jsonDocument = JsonFile.readFileSync('./files/company.json');

		for (var i = 0; i < jsonDocument.length; ++i) {
			var objCompany = jsonDocument[i];
			if (objCompany.id == id) {
				return objCompany;
			}
		}

		return null;
	};

	self.Create 	= _create;
	self.Update 	= _update;
	self.Remove 	= _remove;
	self.FindAll 	= _findAll;
	self.FindById 	= _findById;

})();