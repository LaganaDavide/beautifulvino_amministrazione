angular.module("utentiModule").service("salvaProvinciaService", ["$http", "URLS", "getMessagesCreator", "RESPONSE_CODES", function($http, URLS, getMessagesCreator, RESPONSE_CODES) {
	
	this.response = function(provincia){
		var config = {
			      headers : {
			          'Content-Type': 'application/json'
			      }
			  };
		
		var message = getMessagesCreator.putProvinciaMessage(provincia);
		
		return $http.post(URLS.put, message, config);
	}
}]);