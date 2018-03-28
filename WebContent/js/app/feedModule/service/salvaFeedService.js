angular.module("utentiModule").service("salvaFeed", ["$http", "URLS", "getMessagesCreator", "RESPONSE_CODES", function($http, URLS, getMessagesCreator, RESPONSE_CODES) {
	
	this.response = function(feed){
		var config = {
			      headers : {
			          'Content-Type': 'application/json'
			      }
			  };
		var message = getMessagesCreator.putFeedMessage(feed);
		return $http.post(URLS.put, message, config);
	}
}]);