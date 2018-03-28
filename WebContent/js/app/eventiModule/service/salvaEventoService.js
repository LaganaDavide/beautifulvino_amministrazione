angular.module("utentiModule").service("salvaEvento", ["$http", "URLS", "getMessagesCreator", "RESPONSE_CODES", function($http, URLS, getMessagesCreator, RESPONSE_CODES) {
	
	this.response = function(evento){
		var config = {
			      headers : {
			          'Content-Type': 'application/json'
			      }
			  };
		
		var message = getMessagesCreator.putEventoMessage(evento);
		
		return $http.post(URLS.put, message, config);
	}
}]);