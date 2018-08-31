angular.module("utentiModule").service("sendNotification", ["$http", "URLS", "getMessagesCreator", "RESPONSE_CODES", function($http, URLS, getMessagesCreator, RESPONSE_CODES) {
	
	this.response = function(txt){
		var config = {
			      headers : {
			          'Content-Type': 'application/json'
			      }
			  };
		var message = getMessagesCreator.getNotificationMessage(txt);
		console.log(message)
		return $http.post(URLS.sendNotification, message , config);
	}
}]);