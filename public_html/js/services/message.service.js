angular.module('App')
	.service('Message', [
		function() {

			var _show = function(message, title, type) {
				if (!message) {
					throw 'Mensagem é obrigatório!';
				}

				if (!title) {
					title = 'Mensagem';
				}

				if (!type) {
					type = 'info';
				}

				toastr[type](message, title);
			};

			var _confirm = function(message, title, successCallback, errorCallback) {
				if (!message) {
					throw 'Mensagem é obrigatório!';
				}

				if (!title) {
					title = 'Mensagem';
				}

				$.confirm({
					title: title,
					content: message,
					buttons: {
				        ok: {
				            text: "Ok",
				            btnClass: 'btn-primary',
				            action: successCallback
				        },
				        cancel: errorCallback
					}
				});
			};

			return {
				Show 		: _show,
				Confirm 	: _confirm
			};
}]);