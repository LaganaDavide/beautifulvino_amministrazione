angular.module("utentiModule").service("cancellaFeed", ["$http", "URLS", "getMessagesCreator", "RESPONSE_CODES", function($http, URLS, getMessagesCreator, RESPONSE_CODES) {
	
	this.response = function(feed){
		var config = {
			      headers : {
			          'Content-Type': 'application/json'
			      }
			  };
		
		var message = getMessagesCreator.cancellaFeedMessage(feed);
		
		return $http.post(URLS.del, message, config);
	}
}]);