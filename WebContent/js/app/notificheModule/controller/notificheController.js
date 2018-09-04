angular.module("utentiModule").controller("notificheController", ["sendNotification", "VARIOUS", "$ngConfirm", "$scope", function(sendNotification, VARIOUS, $ngConfirm, $scope){

    
    $scope.invia = function (){
    	var domanda = confirm("conferma invio notifica con testo " + $scope.testo);
    	if (domanda === true) {
    		//$scope.testo = $scope.testo.replace (/\"/g, `\\"`);
//    		let mess = "{" +
//	    		'\"default\": \"'+ $scope.testo +'\",' +
//	    		`\"APNS_SANDBOX\":"{\\"aps\\":{\\"alert\\":\'` + $scope.testo +`\', \\"badge\\" :1,\\"sound\\" : \\"default\\"}}",` +
//	    		`\"APNS\":"{\\"aps\\":{\\"alert\\":\'` + $scope.testo +`\', \\"badge\\" :1,\\"sound\\" : \\"default\\"}}",` +
//	    		`\"GCM\": "{ \\"notification\\": { \\"text\\": \'` + $scope.testo +`\',\\"sound\\":\\"default\\" } }"` +
//	    	"}";
    		
    		let mess = 
    		`{
				"default": "`+$scope.testo+`", 
				"GCM": "{ \\"data\\": { \\"message\\": \\"`+$scope.testo + `\\",\\"sound\\":\\"default\\" } }",
				"APNS": "{\\"aps\\":{\\"alert\\": \\"`+ $scope.testo +`\\", \\"badge\\" :1,\\"sound\\" : \\"default\\"} }", 
				"APNS_SANDBOX":"{\\"aps\\":{\\"alert\\": \\"`+ $scope.testo +`\\", \\"badge\\" :1,\\"sound\\" : \\"default\\"} }"
			}`
    		
    		sendNotification.response(mess).then(function(result){
    		    console.log(result);
    		    alert("notifica inviata con successo");
    		}).catch(function(e){
    		   $scope.codiceEsito = 'ERRORE' + e;
    		   console.log('Error');
    		   alert("errore invio notifica");
    		});
	    	console.log(mess);
    	}else{
    	  console.log ("hai premuto annulla");
    	}
    	
    	
    }
    
}]);