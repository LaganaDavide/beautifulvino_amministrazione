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
    		mess = "a";
    		sendNotification.response(mess).then(function(result){
    		    console.log(result);
    		}).catch(function(e){
    		   $scope.codiceEsito = 'ERRORE' + e;
    		   console.log('Error');
    		});
	    	console.log(mess);
	    //	let cr = new AWS.Credentials('AKIAIWUYFO7ZZTCH74QQ','uxWlnMFL29FGS323S27h5Q0JBKCHnBCcOK6GcUdv', null);
//	    	var sns = new AWS.SNS({region: 'eu-central-1' ,credentials : cr });
//	    	var params = {
//			  Message: mess,
//			  MessageStructure: 'json',
//			  TopicArn: 'arn:aws:sns:eu-central-1:801532940274:test'
//			};
//			sns.publish(params, function(err, data) {
//			  if (err) console.log(err, err.stack); // an error occurred
//			  else     console.log(data);           // successful response
//			});
    	}else{
    	  console.log ("hai premuto annulla");
    	}
    	
    	
    }
    
}]);