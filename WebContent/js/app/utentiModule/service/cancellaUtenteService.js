angular.module("utentiModule").service("cancellaUtente", ["$http", "URLS", "getMessagesCreator", "RESPONSE_CODES", function($http, URLS, getMessagesCreator, RESPONSE_CODES) {
	
	this.response = function(utente){
		var config = {
			      headers : {
			          'Content-Type': 'application/json'
			      }
			  };
		
		var message = getMessagesCreator.cancellaUtenteMessage(utente);
		
		return $http.post(URLS.del, message, config);
	}
}]);