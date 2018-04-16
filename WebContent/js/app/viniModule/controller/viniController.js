angular.module("utentiModule").controller("viniController", ["getListaVini", "salvaVino", "getListaAziende", "salvaImmagine", "cancellaVino", "VARIOUS", "$ngConfirm", "$scope",function(getListaVini, salvaVino, getListaAziende, salvaImmagine, cancellaVino, VARIOUS, $ngConfirm, $scope){
	
	var viniController = this;
	$scope.listaAziende = [];
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
	
	$scope.salvaVino = function(){
		
		var aziendaInt = {
				idAzienda: $scope.aziendaSelezionata.selected.idAzienda, nomeAzienda: $scope.aziendaSelezionata.selected.nomeAzienda
		}
		$scope.vinoSelezionato.aziendaVino = aziendaInt;
		$scope.vinoSelezionato.aziendaVinoInt = aziendaInt;
		salvaVino.response($scope.vinoSelezionato).then(function(result){
			var codiceEsito = result.data.esito.codice;
			if(codiceEsito == 100){
				$scope.setEsitoPositivo("Vino inserito correttamente");
				//il vino selezionato lo devo mettere nella lista con una push
				$scope.caricaLista();
				$scope.azzeraVinoSelezionato();
				$scope.azzeraAziendaSelezionata();
				$scope.visualizzaEditorVino = false;
			} else {
				var messaggioDiErrore = result.data.esito.message;
				$scope.setEsitoNegativo("ATTENZIONE, Problemi nell'inserimento del vino; codice esito: " + codiceEsito + " messaggio di errore:" + messaggioDiErrore);
				$scope.visualizzaEditorVino = false;
			}
		}).catch(function(){
			$scope.setEsitoNegativo("ATTENZIONE, Si è verificata un'eccezione nell'inserimento del vino");
			$scope.visualizzaEditorVino = false;
		});
		
	}
	
	$scope.azzeraForm = function (){
		$scope.vinoSelezionato = {};
		$scope.aziendaSelezionata.selected = {};
	}
	
	$scope.azzeraAziendaSelezionata = function(){
		$scope.aziendaSelezionata = {};
	}
	
	$scope.azzeraVinoSelezionato = function(){
		$scope.vinoSelezionato = {};
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
	
	$scope.clickVino = function(vino){
		$scope.azzeraEsito();
		$scope.vinoSelezionato = vino;
		$scope.aziendaSelezionata.selected = $scope.vinoSelezionato.aziendaVinoInt;
	}
	
	$scope.cancellaVino = function(vino){
		cancellaVino.response(vino).then(function(result){
			var codiceEsito = result.data.esito.codice;
			if(codiceEsito == 100){
				$scope.azzeraForm();
				$scope.caricaLista();
				$scope.setEsitoPositivo("Vino cancellato correttamente");
			} else {
				var messaggioDiErrore = result.data.esito.message;
				$scope.setEsitoNegativo("ATTENZIONE, Problemi nella cancellazione del vino; codice esito: " + codiceEsito + " messaggio di errore:" + messaggioDiErrore);
			}
		}).catch(function(){
			$scope.setEsitoNegativo("ATTENZIONE, Si è verificata un'eccezione nella cancellazione del vino");
		});
	}
	
	$scope.submitImageVino = function(file){
		if(file){
			$scope.upload(file, VARIOUS.vinoImageBaseFileName);
		}
		$scope.file = '';
		$scope.vinoSelezionato.urlImmagineVino = $scope.urlImmagine;
	}
	
	$scope.submitImageLogoVino = function(file){
		if(file){
			$scope.upload(file, VARIOUS.vinoLogoBaseFileName);
		}
		$scope.file = '';
		$scope.vinoSelezionato.urlLogoVino = $scope.urlImmagine;
	}
	
	$scope.duplicaVino = function(){
		$scope.vinoSelezionato.idVino = "";
		$scope.idVino = "";
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
	
	$scope.upload = function (file, baseFileName) {
		var reader = new window.FileReader();
		reader.readAsDataURL(file); 
		reader.onloadend = function() {
			base64data = reader.result;                
			console.log(base64data);
			
			 salvaImmagine.response(base64data, baseFileName, "").then(function(result){
				var codiceEsito = result.data.esito.codice;
				$scope.urlImmagine = result.data.imageUrl;
				if(codiceEsito == 100){
					$scope.setEsitoPositivo("Immagine correttamente salvata; \ncodice esito: " + codiceEsito);
					$scope.urlImmagineAzienda = urlImmagine;
				} else {
					var messaggioDiErrore = result.data.esito.message;
					$scope.setEsitoNegativo("ATTENZIONE, Problemi nel salvataggio dell'immagine dell'azienda; \ncodice esito: " + codiceEsito + " \nmessaggio di errore:" + messaggioDiErrore);
				}
				
			}).catch(function(){
				$scope.setEsitoNegativo("ATTENZIONE, Si è verificata un'eccezione nel salvataggio dell'immagine dell'azienda");
			});					
		 }
    };
    
}]);