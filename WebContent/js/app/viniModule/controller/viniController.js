angular.module("utentiModule").controller("viniController", ["getListaVini", "salvaVino", "getListaAziende", "salvaImmagine", "cancellaVino", "VARIOUS", "$ngConfirm", "$scope",function(getListaVini, salvaVino, getListaAziende, salvaImmagine, cancellaVino, VARIOUS, $ngConfirm, $scope){
	
	var viniController = this;
	$scope.listaVini = [];
	$scope.codiceEsito = 'attesa';
	
	$scope.visualizzaEsito = false;
	$scope.messaggioEsito = '';
	$scope.coloreSfondoEsito = VARIOUS.coloreSfondoEsitoNeutro;
	
	$scope.urlImmagine = '';
	
	$scope.file = '';
	$scope.fileVino = '';
	$scope.fileLogoVino = '';
	
	$scope.aziendaSelezionata = {};
	$scope.aziende = [];
	
	$scope.vinoSelezionato = {};
	$scope.oldIdAzienda = '';
	
	$scope.acquistabileVino = false;
	
	$scope.salvaVino = function(){
		$scope.vinoSelezionato.urlLogoVino  = $scope.vinoSelezionato.urlImmagineVino;
		if ($scope.aziendaSelezionata.selected != null ){
			if ($scope.aziendaSelezionata.selected.nomeAzienda == null)$scope.aziendaSelezionata.selected.nomeAzienda = "";
			var aziendaInt = {
					idAzienda: $scope.aziendaSelezionata.selected.idAzienda, nomeAzienda: $scope.aziendaSelezionata.selected.nomeAzienda
			}
		}
		if ($scope.acquistabileVino == true) $scope.vinoSelezionato.acquistabileVino = 1;
		else $scope.vinoSelezionato.acquistabileVino = 0;
		$scope.vinoSelezionato.aziendaVino = aziendaInt;
		$scope.vinoSelezionato.aziendaVinoInt = aziendaInt;
		$scope.vinoSelezionato.oldIdAzienda = $scope.oldIdAzienda;
		salvaVino.response($scope.vinoSelezionato).then(function(result){
			var codiceEsito = result.data.esito.codice;
			if(codiceEsito == 100){
				$scope.setEsitoPositivo("Vino inserito correttamente");
				//il vino selezionato lo devo mettere nella lista con una push
				$scope.caricaLista();
				$scope.visualizzaEditorVino = false;
			} else {
				var messaggioDiErrore = result.data.esito.message;
				$scope.setEsitoNegativo("ATTENZIONE, Problemi nell'inserimento del vino; codice esito: " + codiceEsito + " messaggio di errore:" + messaggioDiErrore);
				$scope.visualizzaEditorVino = false;
				$scope.caricaLista();
				$scope.azzeraVinoSelezionato();
				$scope.azzeraAziendaSelezionata();
				$scope.visualizzaEditorVino = false;
			}
		}).catch(function(){
			$scope.setEsitoNegativo("ATTENZIONE, Si è verificata un'eccezione nell'inserimento del vino");
			$scope.visualizzaEditorVino = false;
			$scope.caricaLista();
			$scope.azzeraVinoSelezionato();
			$scope.azzeraAziendaSelezionata();
			$scope.visualizzaEditorVino = false;
		});		
	}
	
	$scope.azzeraForm = function (){
		$scope.vinoSelezionato = {};
		$scope.oldIdAzienda = '';
		$scope.acquistabileVino = false;
	}
	
	$scope.azzeraAziendaSelezionata = function(){
		$scope.aziendaSelezionata = {};
		$scope.oldIdAzienda = '';
	}
	
	$scope.azzeraVinoSelezionato = function(){
		$scope.azzeraForm();
		$scope.azzeraAziendaSelezionata();
	}
	
	$scope.caricaLista = function(){
		getListaVini.response().then(function(result){
			$scope.listaVini = result.data.vini;
			$scope.codiceEsito = result.data.esito.codice;
			
		    console.log($scope.listaVini);
		}).catch(function(){
		   $scope.codiceEsito = 'ERRORE';
		   console.log('Error');
		});
	}
	$scope.caricaLista();
	
	 $scope.page = 1;

	$scope.displayItems = $scope.listaVini.slice(0, 20);
	
	$scope.pageChanged = function() {
	  var startPos = ($scope.page - 1) * 20;
	  //$scope.displayItems = $scope.totalItems.slice(startPos, startPos + 3);
	  console.log($scope.page);
	};
	
	$scope.caricaAziende = function(){
		getListaAziende.response().then(function(result){
			$scope.aziende = result.data.aziende;
		}).catch(function(){
		   $scope.codiceEsito = 'ERRORE';
		   console.log('Error');
		});
	}
	$scope.caricaAziende();
	
	$scope.azzeraEsito = function(){
		$scope.visualizzaEsito = false;
		$scope.messaggioEsito = '';
		$scope.coloreSfondoEsito = VARIOUS.coloreSfondoEsitoNeutro;
	}
	
	$scope.setEsitoPositivo = function(message){
		$scope.visualizzaEsito = true;
		$scope.messaggioEsito = message;
		$scope.coloreSfondoEsito = VARIOUS.coloreSfondoEsitoOk;
	}
	
	$scope.setEsitoNegativo = function(message){
		$scope.visualizzaEsito = true;
		$scope.messaggioEsito = message;
		$scope.coloreSfondoEsito = VARIOUS.coloreSfondoEsitoKo;
	}
	
	$scope.caricaAzienda = function(){
		var arrayLength = $scope.aziende.length;
		for (var i = 0; i < arrayLength; i++) {
			var azienda = $scope.aziende[i];
			if(azienda.idAzienda ==  $scope.vinoSelezionato.aziendaVinoInt.idAzienda){
				 $scope.aziendaSelezionata.selected = azienda;
				return;
			}
		}
	}
	
	$scope.clickVuoto = function (){
		$scope.azzeraEsito();	
		$scope.azzeraVinoSelezionato();
		if ($scope.vinoSelezionato != null) $scope.vinoSelezionato = null
		console.log ("ciao");
	}
	
	$scope.clickVino = function(vino){
		$scope.azzeraEsito();
		$scope.azzeraVinoSelezionato();
		$scope.vinoSelezionato = vino;
		if (vino.acquistabileVino == 1)$scope.acquistabileVino = true;
		else $scope.acquistabileVino = false;
		if ($scope.vinoSelezionato.aziendaVinoInt != null){
			$scope.caricaAzienda();
			$scope.oldIdAzienda = $scope.vinoSelezionato.aziendaVinoInt.idAzienda;
		}
	}
	
	$scope.cancellaVino = function(vino){
		cancellaVino.response(vino).then(function(result){
			var codiceEsito = result.data.esito.codice;
			if(codiceEsito == 100){
				$scope.azzeraVinoSelezionato();
				$scope.azzeraAziendaSelezionata();
				$scope.caricaLista();
				$scope.setEsitoPositivo("Vino cancellato correttamente");
			} else {
				var messaggioDiErrore = result.data.esito.message;
				$scope.setEsitoNegativo("ATTENZIONE, Problemi nella cancellazione del vino; codice esito: " + codiceEsito + " messaggio di errore:" + messaggioDiErrore);
				$scope.azzeraVinoSelezionato();
				$scope.azzeraAziendaSelezionata();
			}
		}).catch(function(){
			$scope.setEsitoNegativo("ATTENZIONE, Si è verificata un'eccezione nella cancellazione del vino");
			$scope.azzeraVinoSelezionato();
			$scope.azzeraAziendaSelezionata();
		});
	}
	
	$scope.submitImageVino = function(file){
		if(file){
			$scope.upload(file, VARIOUS.vinoImageBaseFileName, "image");
		}
		$scope.file = '';

	}
	
	$scope.submitImageLogoVino = function(file){
		if(file){
			$scope.upload(file, VARIOUS.vinoLogoBaseFileName, "logo");
		}
		$scope.file = '';
	}
	
	$scope.duplicaVino = function(){
		$scope.vinoSelezionato.idVino = "";
		$scope.idVino = "";
		$scope.vinoSelezionato.utentiVinoInt = [];
		$scope.vinoSelezionato.utentiVino = [];
		$scope.oldIdAzienda = '';
		$scope.vinoSelezionato.aziendaVino = null;
		$scope.vinoSelezionato.aziendaVinoInt = null;
		$scope.vinoSelezionato.oldIdAzienda = '';
		$scope.vinoSelezionato.nomeVino = $scope.vinoSelezionato.nomeVino + " copia";
		$scope.nomeVino = $scope.nomeVino + " copia";
		$scope.salvaVino();
	}
	
	$scope.confirmDecision = function(vino){
		$scope.azzeraEsito();
        $ngConfirm({
            title: 'Conferma',
            content: 'Si conferma di cancellare vino : ' + vino.nomeVino + '?',
            scope: $scope,
            buttons: {
                conferma: {
                    text: 'Conferma',
                    btnClass: 'btn-blue',
                    action: function(scope, button){
                        $scope.cancellaVino(vino);
                    }
                },
                esci: {
                    text: 'Esci',
                    btnClass: 'btn-red',
                    action: function(scope, button){
                    }
                }
            }
        });
    }
	
	$scope.upload = function (file, baseFileName, flag) {
		var reader = new window.FileReader();
		reader.readAsDataURL(file); 
		reader.onloadend = function() {
			base64data = reader.result;                
			console.log(base64data);
			
			 salvaImmagine.response(base64data, baseFileName, "").then(function(result){
				var codiceEsito = result.data.esito.codice;
				if (flag == "image"){
					$scope.vinoSelezionato.urlImmagineVino = result.data.imageUrl;
				}else if (flag == "logo"){
					$scope.vinoSelezionato.urlLogoVino = result.data.imageUrl;
				}
				if(codiceEsito == 100){
					$scope.setEsitoPositivo("Immagine correttamente salvata; \ncodice esito: " + codiceEsito);
				} else {
					var messaggioDiErrore = result.data.esito.message;
					$scope.setEsitoNegativo("ATTENZIONE, Problemi nel salvataggio dell'immagine del vino; \ncodice esito: " + codiceEsito + " \nmessaggio di errore:" + messaggioDiErrore);
				}
				
			}).catch(function(){
				$scope.setEsitoNegativo("ATTENZIONE, Si è verificata un'eccezione nel salvataggio dell'immagine del vino");
			});					
		 }
    };
    
}]);