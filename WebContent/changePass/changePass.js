$(document).ready(function(){
  var passOne = $("#passOne").val();
  var passTwo = $("#passTwo").val();
  
  $("#footerText").html("Fields don't match");
  
  var checkAndChange = function()
  {
    if(passOne.length < 1){
      if($("#footer").hasClass("correct")){
        $("#footer").removeClass("correct").addClass("incorrect");
        $("#footerText").html("They don't match");
      }else{
        $("#footerText").html("They don't match");
      }
    }
    else if($("#footer").hasClass("incorrect"))
    {
      if(passOne == passTwo){
        $("#footer").removeClass("incorrect").addClass("correct");
        $("#footerText").html("Continue");
      }
    }
    else
    {
      if(passOne != passTwo){
        $("#footer").removeClass("correct").addClass("incorrect");
        $("#footerText").html("They don't match");
      } 
    }   
  }
   
  $("input").keyup(function(){
    var newPassOne = $("#passOne").val();
    var newPassTwo = $("#passTwo").val();
    
    passOne = newPassOne;
    passTwo = newPassTwo;
    
    checkAndChange();
  });
  
  $("#footer").click(function (){
	  if($("#footer").hasClass("correct")){
		  var get = parseGetVars();
		  let id = get['id'];
		  let code = get['code'];
		  let name = get['name'];
		  if (get == null || id == null || code == null || name == null){
			  console.log("errore parametri");
			  $("#footer").removeClass("correct").addClass("incorrect");
		        $("#footerText").html("errore parametri");
			  return;
		  }
		  var params = {
			  ClientId: id, /* required */
			  ConfirmationCode: code, /* required */
			  Password: passOne, /* required */
			  Username: name, /* required */
			};
		var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
		if (cognitoidentityserviceprovider != null){
			cognitoidentityserviceprovider.confirmForgotPassword(params, function(err, data) {
			  if (err) {
				  console.log(err, err.stack);
				  $("#footer").removeClass("correct").addClass("incorrect");
			        $("#footerText").html("errore connessione");
				  } // an error occurred
			  else  {   
				  console.log(data);    
			        $("#footerText").html("Success");
				  }       // successful response
			});
		}else{
			console.log("errore connessione");
			$("#footer").removeClass("correct").addClass("incorrect");
	        $("#footerText").html("errore connessione");
		}
	  }
  })
});


function parseGetVars()
{
  // creo una array
  var args = new Array();
  // individuo la query (cioè tutto quello che sta a destra del ?)
  // per farlo uso il metodo substring della proprietà search
  // dell'oggetto location
  var query = window.location.search.substring(1);
  // se c'è una querystring procedo alla sua analisi
  if (query)
  {
    // divido la querystring in blocchi sulla base del carattere &
    // (il carattere & è usato per concatenare i diversi parametri della URL)
    var strList = query.split('&');
    // faccio un ciclo per leggere i blocchi individuati nella querystring
    for(str in strList)
    {
      // divido ogni blocco mediante il simbolo uguale
      // (uguale è usato per l'assegnazione del valore)
      var parts = strList[str].split('=');
      // inserisco nella array args l'accoppiata nome = valore di ciascun
      // parametro presente nella querystring
      args[unescape(parts[0])] = unescape(parts[1]);
    }
  }
  return args;
}
