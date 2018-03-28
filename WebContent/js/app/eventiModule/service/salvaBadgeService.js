angular.module("utentiModule").service("salvaBadgeService", ["$http", "URLS", "getMessagesCreator", "RESPONSE_CODES", function($http, URLS, getMessagesCreator, RESPONSE_CODES) {
	
	this.response = function(badge){
		var config = {
			      headers : {
			          'Content-Type': 'application/json'
			      }
			  };
		
		var message = getMessagesCreator.putBadgeMessage(badge);
		
		return $http.post(URLS.put, message, config);
	}
}]);