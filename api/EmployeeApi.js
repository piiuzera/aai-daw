"use strict";

var CompanyApi 	= require('./CompanyApi');
var JsonFile 	= require('jsonfile');
var OfficeApi 	= require('./OfficeApi');

var self = this;

(function() {

	var _create = function(employee) {
		var jsonDocument = JsonFile.readFileSync('./files/employee.json');

		if (jsonDocument.length == 0) {
			employee.id = 1;
		} else {
			employee.id = jsonDocument[jsonDocument.length - 1].id + 1;
		}

		var newEmployee = {
			id 			: employee.id,
			fk_company 	: employee.fk_company,
			fk_office 	: employee.fk_office,
			name 		: employee.name,
			email 		: employee.email,
			salary 		: employee.salary
		};

		jsonDocument.push(newEmployee);

		JsonFile.writeFileSync('./files/employee.json', jsonDocument);

		newEmployee.office 	= OfficeApi.FindById(employee.fk_office);
		newEmployee.company = CompanyApi.FindById(employee.fk_company);

		return newEmployee;
	};

	var _update = function(employee, id) {
		var jsonDocument = JsonFile.readFileSync('./files/employee.json');

		for (var i = 0; i < jsonDocument.length; ++i) {
			var objEmployee = jsonDocument[i];
			if (objEmployee.id == id) {
				objEmployee.fk_office	= employee.fk_office;
				objEmployee.fk_company	= employee.fk_company;
				objEmployee.name 		= employee.name;
				objEmployee.email 		= employee.email;
				objEmployee.salary 		= employee.salary;

				JsonFile.writeFileSync('./files/employee.json', jsonDocument);

				objEmployee.office 		= OfficeApi.FindById(objEmployee.fk_office);
				objEmployee.company 	= CompanyApi.FindById(objEmployee.fk_company);

				return objEmployee;
			}
		}

		return null;
	};

	var _remove = function(id) {
		var jsonDocument = JsonFile.readFileSync('./files/employee.json');

		var newJsonDocument = [];

		for (var i = 0; i < jsonDocument.length; ++i) {
			if (jsonDocument[i].id != id) {
				newJsonDocument.push(jsonDocument[i]);
			}
		}

		if (newJsonDocument.length !== jsonDocument.length) {
			JsonFile.writeFileSync('./files/employee.json', newJsonDocument);

			return true;
		}

		return false;
	};

	var _findAll = function() {
		var jsonDocument = JsonFile.readFileSync('./files/employee.json');

		for (var i = 0; i < jsonDocument.length; ++i) {
			jsonDocument[i].office 		= OfficeApi.FindById(jsonDocument[i].fk_office);
			jsonDocument[i].company 	= CompanyApi.FindById(jsonDocument[i].fk_company);
		}

		return jsonDocument;
	};

	var _findById = function(id) {
		var jsonDocument = JsonFile.readFileSync('./files/employee.json');

		for (var i = 0; i < jsonDocument.length; ++i) {
			var objEmployee = jsonDocument[i];
			if (objEmployee.id == id) {
				objEmployee.office 		= OfficeApi.FindById(objEmployee.fk_office);
				objEmployee.company 	= CompanyApi.FindById(objEmployee.fk_company);

				return objEmployee;
			}
		}

		return null;
	};

	var _findByFkCompany = function(fk_company) {
		var jsonDocument = JsonFile.readFileSync('./files/employee.json');

		for (var i = 0; i < jsonDocument.length; ++i) {
			var objEmployee = jsonDocument[i];
			if (objEmployee.fk_company == fk_company) {
				objEmployee.office 		= OfficeApi.FindById(objEmployee.fk_office);
				objEmployee.company 	= CompanyApi.FindById(objEmployee.fk_company);

				return objEmployee;
			}
		}

		return null;
	};

	var _findByFkOffice = function(fk_office) {
		var jsonDocument = JsonFile.readFileSync('./files/employee.json');

		for (var i = 0; i < jsonDocument.length; ++i) {
			var objEmployee = jsonDocument[i];
			if (objEmployee.fk_office == fk_office) {
				objEmployee.office 		= OfficeApi.FindById(objEmployee.fk_office);
				objEmployee.company 	= CompanyApi.FindById(objEmployee.fk_company);

				return objEmployee;
			}
		}

		return null;
	};

	self.Create 			= _create;
	self.Update 			= _update;
	self.Remove 			= _remove;
	self.FindAll 			= _findAll;
	self.FindById 			= _findById;
	self.FindByFkCompany 	= _findByFkCompany;
	self.FindByFkOffice 	= _findByFkOffice;

})();