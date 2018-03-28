angular.module("utentiModule").service("cancellaEvento", ["$http", "URLS", "getMessagesCreator", "RESPONSE_CODES", function($http, URLS, getMessagesCreator, RESPONSE_CODES) {
	
	this.response = function(evento){
		var config = {
			      headers : {
			          'Content-Type': 'application/json'
			      }
			  };
		
		var message = getMessagesCreator.deleteEventoMessage(evento);
		
		return $http.post(URLS.del, message, config);
	}
}]);