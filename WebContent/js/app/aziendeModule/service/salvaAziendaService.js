angular.module("utentiModule").service("salvaAzienda", ["$http", "URLS", "getMessagesCreator", "RESPONSE_CODES", function($http, URLS, getMessagesCreator, RESPONSE_CODES) {
	
	this.response = function(azienda){
		var config = {
			      headers : {
			          'Content-Type': 'application/json'
			      }
			  };
		
		var message = getMessagesCreator.putAziendaMessage(azienda);
		
		return $http.post(URLS.put, message, config);
	}
}]);