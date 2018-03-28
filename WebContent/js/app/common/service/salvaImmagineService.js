angular.module("utentiModule").service("salvaImmagine", ["$http", "URLS", "getMessagesCreator", "RESPONSE_CODES", function($http, URLS, getMessagesCreator, RESPONSE_CODES) {
	
	this.response = function(file, filename, tipoEntita){
		var config = {
			      headers : {
			          'Content-Type': 'application/json'
			      }
			  };
		
		var message = getMessagesCreator.salvaImmagineMessage(file, filename, tipoEntita);
		
		return $http.post(URLS.put, message, config);
	}
}]);