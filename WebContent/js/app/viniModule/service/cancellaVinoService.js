angular.module("utentiModule").service("cancellaVino", ["$http", "URLS", "getMessagesCreator", "RESPONSE_CODES", function($http, URLS, getMessagesCreator, RESPONSE_CODES) {
	
	this.response = function(vino){
		var config = {
			      headers : {
			          'Content-Type': 'application/json'
			      }
			  };
		
		var message = getMessagesCreator.cancellaVinoMessage(vino);
		
		return $http.post(URLS.del, message, config);
	}
}]);