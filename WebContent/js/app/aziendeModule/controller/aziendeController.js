angular.module("utentiModule").controller("aziendeController", ["getListaAziende", "getAzienda", "salvaAzienda", "cancellaAzienda", "salvaVino", "salvaImmagine", "VARIOUS", "$ngConfirm", "$scope",function(getListaAziende, getAzienda, salvaAzienda, cancellaAzienda, salvaVino, salvaImmagine, VARIOUS, $ngConfirm, $scope){
	
	var aziendeController = this;
	$scope.listaAziende = [];
	$scope.codiceEsito = 'attesa';
	
	$scope.visualizzaEsito = false;
	$scope.messaggioEsito = '';
	$scope.coloreSfondoEsito = VARIOUS.coloreSfondoEsitoNeutro;
	
	$scope.visualizzaEditorVino = false;
	
	$scope.idAzienda = '';
	$scope.nomeAzienda = '';
	$scope.infoAzienda = '';
	$scope.latitudineAzienda = 0.0;
	$scope.longitudineAzienda = 0.0;
	$scope.cittaAzienda = '';
	$scope.zonaAzienda = '';
	$scope.active = true;
		
	$scope.showDis = false;
	
	$scope.viniAzienda = [];
	
	$scope.file = '';
	$scope.fileVino = '';
	$scope.fileLogoVino = '';
	
	$scope.aziendaSelezionata = {};
	
	$scope.vinoSelezionato = {
			idVino : '',
			nomeVino : '',
			annoVino : '',
			aziendaVino : {},
			aziendaVinoInt : '',
			uvaggioVino : '',
			regioneVino : '',
			inBreveVino : '',
			descrizioneVino : '',
			infoVino : '',
			urlImmagineVino : '',
			urlLogoVino : ''
	};
	
	$scope.apriConfiguratoreVino = function(){
		
		$scope.vinoSelezionato.aziendaVino = $scope.aziendaSelezionata;
		$scope.vinoSelezionato.aziendaVinoInt = { idAzienda: $scope.aziendaSelezionata.idAzienda, nomeAzienda: $scope.aziendaSelezionata.nomeAzienda};
		$scope.visualizzaEditorVino = !$scope.visualizzaEditorVino;
	}
	
	$scope.salvaVino = function(){
		
		salvaVino.response($scope.vinoSelezionato).then(function(result){
			var codiceEsito = result.data.esito.codice;
			if(codiceEsito == 100){
				$scope.setEsitoPositivo("Vino inserito correttamente");
				//il vino selezionato lo devo mettere nella lista con una push
				$scope.viniAzienda.push({idVino: result.data.idVino, nomeVino: $scope.vinoSelezionato.nomeVino, annoVino: $scope.vinoSelezionato.annoVino});
				$scope.caricaLista();
				$scope.azzeraVinoSelezionato();
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
	
	$scope.azzeraVinoSelezionato = function(){
		$scope.vinoSelezionato = {
				idVino : '',
				nomeVino : '',
				annoVino : '',
				aziendaVino : {},
				aziendaVinoInt : '',
				uvaggioVino : '',
				regioneVino : '',
				inBreveVino : '',
				descrizioneVino : '',
				infoVino : '',
				urlImmagineVino : '',
				urlLogoVino : ''
		};
	}
	
	$scope.caricaLista = function(){
		getListaAziende.response().then(function(result){
			$scope.listaAziende = result.data.aziende;
			$scope.codiceEsito = result.data.esito.codice;
			
		    console.log($scope.listaAziende);
		}).catch(function(){
		   $scope.codiceEsito = 'ERRORE';
		   console.log('Error');
		});
	}
	
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
	
	$scope.azzeraForm = function(){
		$scope.aziendaSelezionata = {};
		$scope.viniAzienda = [];
	}
	
	$scope.caricaLista();
	
	$scope.clickAzienda = function(azienda){
		$scope.azzeraEsito();
		
		$scope.aziendaSelezionata = azienda;
		
//		$scope.idAzienda = azienda.idAzienda;
//		$scope.nomeAzienda = azienda.nomeAzienda;
//		$scope.infoAzienda = azienda.infoAzienda;
//		$scope.descrizioneAzienda = azienda.descrizioneAzienda;
//		$scope.latitudineAzienda = azienda.latitudineAzienda;
//		$scope.longitudineAzienda = azienda.longitudineAzienda;
//		$scope.cittaAzienda = azienda.cittaAzienda;
//		$scope.zonaAzienda = azienda.zonaAzienda;
//		$scope.urlImmagineAzienda = azienda.urlImmagineAzienda;
//		$scope.active = azienda.active;
		$scope.viniAzienda = azienda.viniAziendaInt;
	}
	
	$scope.showDisable = function (){
		if ($scope.showDis == true) $scope.showDis = false;
		else $scope.showDis = true;
	}
	
//	$scope.clickVino = function(vino){
//		$scope.vinoSelezionato.idVino = vino.idVino;
//		$scope.vinoSelezionato.nomeVino = vino.nomeVino ;
//		$scope.vinoSelezionato.annoVino = vino.annoVino ;
//		$scope.vinoSelezionato.aziendaVino = vino.aziendaVino ;
//		$scope.vinoSelezionato.aziendaVinoInt = vino.aziendaVinoInt ;
//		$scope.vinoSelezionato.uvaggioVino = vino.uvaggioVino ;
//		$scope.vinoSelezionato.regioneVino = vino.regioneVino ;
//		$scope.vinoSelezionato.inBreveVino = vino.inBreveVino ;
//		$scope.vinoSelezionato.descrizioneVino = vino.descrizioneVino ;
//		$scope.vinoSelezionato.infoVino = vino.infoVino ;
//		$scope.vinoSelezionato.urlImmagineVino = vino.urlImmagineVino ;
//		$scope.vinoSelezionato.urlLogoVino = vino.urlLogoVino ;
//	}
	
	$scope.cancellaAzienda = function(azienda){
		cancellaAzienda.response(azienda).then(function(result){
			var codiceEsito = result.data.esito.codice;
			if(codiceEsito == 100){
				$scope.azzeraForm();
				$scope.caricaLista();
				$scope.setEsitoPositivo("Azienda cancellata correttamente");
			} else {
				var messaggioDiErrore = result.data.esito.message;
				$scope.setEsitoNegativo("ATTENZIONE, Problemi nella cancellazione dell'azienda; codice esito: " + codiceEsito + " messaggio di errore:" + messaggioDiErrore);
			}
		}).catch(function(){
			$scope.setEsitoNegativo("ATTENZIONE, Si è verificata un'eccezione nella cancellazione dell'azienda");
		});
	}
	
	$scope.submitImage = function(file){
		if(file){
			$scope.upload(file, VARIOUS.aziendaImageBaseFileName,"image");
		}
		$scope.file = '';
	}
	
	$scope.submitImageLogo = function(file){
		if(file){
			$scope.upload(file, VARIOUS.aziendaImageBaseFileName, "logo");
		}
		$scope.file = '';
	}
	
	$scope.submitImageVino = function(file){
		if(file){
			$scope.upload(file, VARIOUS.vinoImageBaseFileName, "imageVino");
		}
		$scope.file = '';
	}
	
	$scope.submitImageLogoVino = function(file){
		if(file){
			$scope.upload(file, VARIOUS.vinoLogoBaseFileName, "imageLogoVino");
		}
		$scope.file = '';

	}
	
	$scope.submit = function(){
		$scope.azzeraEsito();
		
//		$scope.aziendaSelezionata.idAzienda = $scope.idAzienda;
//		$scope.aziendaSelezionata.nomeAzienda = $scope.nomeAzienda;
//		$scope.aziendaSelezionata.infoAzienda = $scope.infoAzienda;
//		$scope.aziendaSelezionata.descrizioneAzienda = $scope.descrizioneAzienda;
//		$scope.aziendaSelezionata.latitudineAzienda = $scope.latitudineAzienda;
//		$scope.aziendaSelezionata.longitudineAzienda = $scope.longitudineAzienda;
//		$scope.aziendaSelezionata.cittaAzienda = $scope.cittaAzienda;
//		$scope.aziendaSelezionata.zonaAzienda = $scope.zonaAzienda;
//		$scope.aziendaSelezionata.urlImmagineAzienda = $scope.urlImmagineAzienda;
		$scope.aziendaSelezionata.viniAziendaInt = $scope.viniAzienda;
		$scope.aziendaSelezionata.active = $scope.active;
		
		salvaAzienda.response($scope.aziendaSelezionata).then(function(result){
			var codiceEsito = result.data.esito.codice;
			var c = result.data.idAzienda;
			if(codiceEsito == 100){
				$scope.azzeraForm();
				$scope.caricaLista();
				$scope.setEsitoPositivo("Azienda correttamente salvata; codice esito: " + codiceEsito + " idAzienda: " + $scope);
			} else {
				var messaggioDiErrore = result.data.esito.message;
				$scope.setEsitoNegativo("ATTENZIONE, Problemi nel salvataggio dell'azienda; codice esito: " + codiceEsito + " messaggio di errore:" + messaggioDiErrore);
			}
			
		}).catch(function(){
			$scope.setEsitoNegativo("ATTENZIONE, Si è verificata un'eccezione nel salvataggio dell'azienda");
		});
	}
	
	$scope.confirmDecision = function(azienda){
		$scope.azzeraEsito();
        $ngConfirm({
            title: 'Conferma',
            content: 'Si conferma di cancellare azienda : ' + azienda.nomeAzienda + '?',
            scope: $scope,
            buttons: {
                conferma: {
                    text: 'Conferma',
                    btnClass: 'btn-blue',
                    action: function(scope, button){
                        $scope.cancellaAzienda(azienda);
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
	
	$scope.disableAzienda = function (azienda){
		azienda.active = !azienda.active;
		$scope.clickAzienda(azienda);
		$scope.submit();
	}
	
	$scope.duplicaAzienda = function(){
		$scope.aziendaSelezionata.idAzienda = "";
		$scope.aziendaSelezionata.nomeAzienda = $scope.aziendaSelezionata.nomeAzienda + " copia";
		$scope.a
		$scope.submit();
	}
	
	$scope.upload = function (file, baseFileName, flag1) {
		$scope.flag = flag1;
		var reader = new window.FileReader();
		var urlImmagine = '';
		reader.readAsDataURL(file); 
		reader.onloadend = function() {
			base64data = reader.result;                
			console.log(base64data);
			
			 salvaImmagine.response(base64data, baseFileName, "").then(function(result){
				var codiceEsito = result.data.esito.codice;
				if ($scope.flag == "image"){
					$scope.aziendaSelezionata.urlImmagineAzienda = result.data.imageUrl;
				}else if ($scope.flag == "logo"){
					$scope.aziendaSelezionata.urlLogoAzienda = result.data.imageUrl;
				}else if ($scope.flag == "imageVino"){
					$scope.vinoSelezionato.urlImmagineVino = result.data.imageUrl;
				}else if ($scope.flag == "imageLogoVino"){
					$scope.vinoSelezionato.urlLogoVino = result.data.imageUrl;
				}
				if(codiceEsito == 100){
					$scope.setEsitoPositivo("Immagine correttamente salvata; \ncodice esito: " + codiceEsito);
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