angular.module("utentiModule").service("salvaUtente", ["$http", "URLS", "getMessagesCreator", "RESPONSE_CODES", function($http, URLS, getMessagesCreator, RESPONSE_CODES) {
	
	this.response = function(utente){
		var config = {
			      headers : {
			          'Content-Type': 'application/json'
			      }
			  };
		
		var message = getMessagesCreator.putUtenteMessage(utente);
		
		return $http.post(URLS.put, message, config);
	}
}]);