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
		  if (get == null || id == null || code == null ){
			  console.log("errore parametri");
			  $("#footer").removeClass("correct").addClass("incorrect");
		        $("#footerText").html("errore parametri");
			  return;
		  }
		  var params = {
			  ClientId: "6vn5bioh2pj0nr999k8j79hhgu", /* required */
			  ConfirmationCode: code, /* required */
			  Password: passOne, /* required */
			  Username: id, /* required */
			};
		var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider({region: 'EU_CENTRAL_1'});
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

  var args = new Array();
  var query = window.location.search.substring(1);
  if (query)
  {
    var strList = query.split('&');
    for(str in strList)
    {
      var parts = strList[str].split('=');
      args[unescape(parts[0])] = unescape(parts[1]);
    }
  }
  return args;
}
