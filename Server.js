"use strict";

var BodyParser      = require('body-parser');
var CompanyRouter   = require('./router/CompanyRouter');
var CookieParser    = require('cookie-parser');
var Cors            = require('cors');
var EJS             = require('EJS');
var Express         = require('express');
var Path            = require('path');

var self = this;

(function() {

	var _init = function() {
		var App = Express();

		App.engine('html', EJS.renderFile);

		App.use(BodyParser.urlencoded({
			extended: true
		}));
		App.use(BodyParser.json());
		App.use(CookieParser());
		App.use(Cors());
		App.use(Express.static(Path.join(__dirname, 'public_html')));

		App.use('/api/company', CompanyRouter.GetRouter());

		App.listen(8080, function() {
			console.log("Server has Started: http://localhost:8080");
		});
	};

	self.Init = _init;

})();

self.Init();