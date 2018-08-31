angular.module("utentiModule").controller("notificheController", ["sendNotification", "VARIOUS", "$ngConfirm", "$scope", function(sendNotification, VARIOUS, $ngConfirm, $scope){

    
    $scope.invia = function (){
    	var domanda = confirm("conferma invio notifica con testo " + $scope.testo);
    	if (domanda === true) {
    		let mess = "{" +
	    		'"default": "'+ $scope.testo +'",' +
	    		'"APNS_SANDBOX":"{\\"aps\\":{\\"alert\\":\\"' + $scope.testo +'\\", \\"badge\\" :1,\\"sound\\" : \\"default\\"}}",' +
	    		'"APNS":"{\\"aps\\":{\\"alert\\":\\"' + $scope.testo +'\\", \\"badge\\" :1,\\"sound\\" : \\"default\\"}}",' +
	    		'"GCM": "{ \\"notification\\": { \\"text\\": \\"' + $scope.testo +'\\",\\"sound\\":\\"default\\" } }"' +
	    	"}";
    		
    		sendNotification.response(mess).then(function(result){
    		    console.log(result);
    		}).catch(function(e){
    		   $scope.codiceEsito = 'ERRORE' + e;
    		   console.log('Error');
    		});
	    	console.log(mess);
    	}else{
    	  console.log ("hai premuto annulla");
    	}
    	
    	
    }
    
}]);