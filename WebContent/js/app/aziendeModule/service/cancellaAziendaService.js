angular.module("utentiModule").service("cancellaAzienda", ["$http", "URLS", "getMessagesCreator", "RESPONSE_CODES", function($http, URLS, getMessagesCreator, RESPONSE_CODES) {
	
	this.response = function(azienda){
		var config = {
			      headers : {
			          'Content-Type': 'application/json'
			      }
			  };
		
		var message = getMessagesCreator.cancellaAziendaMessage(azienda);
		
		return $http.post(URLS.del, message, config);
	}
}]);