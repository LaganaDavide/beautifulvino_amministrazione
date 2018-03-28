angular.module("utentiModule").service("salvaVino", ["$http", "URLS", "getMessagesCreator", "RESPONSE_CODES", function($http, URLS, getMessagesCreator, RESPONSE_CODES) {
	
	this.response = function(vino){
		var config = {
			      headers : {
			          'Content-Type': 'application/json'
			      }
			  };
		
		var message = getMessagesCreator.putVinoMessage(vino);
		
		return $http.post(URLS.put, message, config);
	}
}]);