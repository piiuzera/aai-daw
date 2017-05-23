"use strict";

var EmployeeApi = require('./EmployeeApi');
var JsonFile 	= require('jsonfile');

var self = this;

(function() {

	var _create = function(office) {
		var jsonDocument = JsonFile.readFileSync('./files/office.json');

		if (jsonDocument.length == 0) {
			office.id = 1;
		} else {
			office.id = jsonDocument[jsonDocument.length - 1].id + 1;
		}

		jsonDocument.push(office);

		JsonFile.writeFileSync('./files/office.json', jsonDocument);

		return office;
	};

	var _update = function(office, id) {
		var jsonDocument = JsonFile.readFileSync('./files/office.json');

		for (var i = 0; i < jsonDocument.length; ++i) {
			var objOffice = jsonDocument[i];
			if (objOffice.id == id) {
				objOffice.name 		= office.name;

				JsonFile.writeFileSync('./files/office.json', jsonDocument);

				return objOffice;
			}
		}

		return null;
	};

	var _remove = function(id) {
		var jsonDocument = JsonFile.readFileSync('./files/office.json');

		var newJsonDocument = [];

		if (EmployeeApi.FindByFkOffice(id) !== null) {
			return false;
		}

		for (var i = 0; i < jsonDocument.length; ++i) {
			if (jsonDocument[i].id != id) {
				newJsonDocument.push(jsonDocument[i]);
			}
		}

		if (newJsonDocument.length !== jsonDocument.length) {
			JsonFile.writeFileSync('./files/office.json', newJsonDocument);

			return true;
		}

		return false;
	};

	var _findAll = function() {
		var jsonDocument = JsonFile.readFileSync('./files/office.json');

		return jsonDocument;
	};

	var _findById = function(id) {
		var jsonDocument = JsonFile.readFileSync('./files/office.json');

		for (var i = 0; i < jsonDocument.length; ++i) {
			var objOffice = jsonDocument[i];
			if (objOffice.id == id) {
				return objOffice;
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