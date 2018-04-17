angular.module("utentiModule").controller("feedController", ["getListaFeed", "salvaFeed", "getListaVini", "getListaAziende", "getListaEventi", "salvaImmagine", "cancellaFeed", "VARIOUS", "$ngConfirm", "$scope", function(getListaFeed, salvaFeed, getListaVini, getListaAziende, getListaEventi,salvaImmagine, cancellaFeed, VARIOUS, $ngConfirm, $scope){
//angular.module("utentiModule").controller("feedController", ["getListaFeed", "salvaFeed", "cancellaFeed", "getListaAziende", "getListaProvince", "getListaVini", "salvaImmagine", "VARIOUS", "$ngConfirm", "$scope", function(getListaFeed, salvaFeed, cancellaFeed, getListaAziende, getListaProvince, getListaVini, salvaImmagine, VARIOUS, $ngConfirm, $scope){
	var feedController = this;
	$scope.listafeed = [];
	$scope.listaVini = [];
	$scope.listaEventi = [];
	$scope.codiceEsito = 'attesa';
	
	$scope.idFeed = '';
	$scope.titoloFeed = '';
	$scope.testoFeed = '';
	$scope.dataFeed = 0;
	
	$scope.visualizzaEsito = false;
	$scope.messaggioEsito = '';
	$scope.coloreSfondoEsito = VARIOUS.coloreSfondoEsitoNeutro;
	
	
	$scope.vinoSelezionato = {};
	$scope.aziendaSelezionata = {};
	$scope.eventoSelezionato = {};
	
	$scope.fileEvento = '';	
	$scope.eventoSelezionato = {};
	$scope.dataEvento = '';

	
	$scope.caricaFeed = function (){
		getListaFeed.response().then(function(result){
			$scope.listaFeed = result.data.feed;
			$scope.codiceEsito = result.data.esito.codice;
			
		    console.log($scope.listaFeed);
		}).catch(function(e){
		   $scope.codiceEsito = 'ERRORE' + e;
		   console.log('Error');
		});
	}
	
	$scope.caricaFeed();
	
	$scope.clickFeed = function(feed){
		$scope.azzeraEsito();
		
		$scope.feedSelezionato = feed;
		$scope.idFeed = feed.idFeed;
		$scope.titoloFeed = feed.titoloFeed;
		$scope.testoFeed = feed.testoFeed;
		$scope.tipoFeed = feed.tipoFeed;
		$scope.dataFeed = feed.dataFeed;
		$scope.headerFeed = feed.headerFeed;
		$scope.idEntitaFeed = feed.idEntitaFeed;
		$scope.idEntitaHeaderFeed = feed.idEntitaHeaderFeed;
		$scope.sottoHeaderFeed = feed.sottoHeaderFeed;
		$scope.testoLabelFeed = feed.testoLabelFeed;
		$scope.tipoEntitaHeaderFeed = feed.tipoEntitaHeaderFeed;
		$scope.urlImmagineFeed = feed.urlImmagineFeed;
		if (feed.vinoFeedInt != null){
			$scope.caricaVino();
		}
		if (feed.eventoFeedInt != null){
			$scope.caricaEvento();
		}
		if (feed.aziendaFeedInt != null){
			$scope.caricaAzienda();
		}
		if (feed.dataEntitaHeader != null)
			$scope.dataEntitaHeader = feed.dataEntitaHeaderFeed;
		
	}
	
	$scope.caricaVino = function(){
		var arrayLength = $scope.listaVini.length;
		for (var i = 0; i < arrayLength; i++) {
			var vino = $scope.listaVini[i];
			if(vino.idVino == $scope.feedSelezionato.vinoFeedInt.idVino){
				$scope.vinoSelezionato.selected = vino;
				return;
			}
		}
	}
	
	$scope.caricaEvento = function(){
		var arrayLength = $scope.listaEventi.length;
		for (var i = 0; i < arrayLength; i++) {
			var evento = $scope.listaEventi[i];
			if(evento.idEvento == $scope.feedSelezionato.eventoFeedInt.idEvento){
				$scope.eventoSelezionato.selected = evento;
				return;
			}
		}
	}
	
	$scope.caricaAzienda = function(){
		var arrayLength = $scope.listaAziende.length;
		for (var i = 0; i < arrayLength; i++) {
			var azienda = $scope.listaAziende[i];
			if(azienda.idAzienda == $scope.feedSelezionato.aziendaFeedInt.idAzienda){
				$scope.aziendaSelezionata.selected = azienda;
				return;
			}
		}
	}
	$scope.submit = function (){
		$scope.azzeraEsito();
		
		$scope.feedSelezionato.idFeed = $scope.idFeed;
		$scope.feedSelezionato.titoloFeed = $scope.titoloFeed;
		$scope.feedSelezionato.testoFeed = $scope.testoFeed;
		$scope.feedSelezionato.tipoFeed = $scope.tipoFeed;
		$scope.feedSelezionato.dataEntitaHeader = $scope.dataEntitaHeaderFeed;
		$scope.feedSelezionato.dataFeed = $scope.dataFeed;
		$scope.feedSelezionato.headerFeed = $scope.headerFeed;
		$scope.feedSelezionato.idEntitaFeed = $scope.idEntitaFeed;
		$scope.feedSelezionato.idEntitaHeaderFeed = $scope.idEntitaHeaderFeed;
		$scope.feedSelezionato.sottoHeaderFeed = $scope.sottoHeaderFeed;
		$scope.feedSelezionato.testoLabelFeed = $scope.testoLabelFeed;
		$scope.feedSelezionato.tipoEntitaHeaderFeed = $scope.tipoEntitaHeaderFeed;
		$scope.feedSelezionato.urlImmagineFeed = $scope.urlImmagineFeed;
		
		if ($scope.tipoFeed == 1 || $scope.tipoFeed == 2 || $scope.tipoFeed == 4)
			$scope.feedSelezionato.dataEntitaHeader = $scope.dataEntitaHeaderFeed;
		if ($scope.tipoFeed == 1 || $scope.tipoFeed == 3)
			$scope.feedSelezionato.vinoFeedInt = $scope.vinoSelezionato.selected;
		if ($scope.tipoFeed == 4)
			$scope.feedSelezionato.eventoFeedInt = $scope.eventoSelezionato.selected;
		if ($scope.tipoFeed == 2){
			$scope.feedSelezionato.aziendaFeedInt = {};
			$scope.feedSelezionato.aziendaFeedInt.idAzienda = $scope.aziendaSelezionata.selected.idAzienda;
			$scope.feedSelezionato.aziendaFeedInt.nomeAzienda = $scope.aziendaSelezionata.selected.nomeAzienda;
			$scope.feedSelezionato.aziendaFeedInt.cittaAzienda = $scope.aziendaSelezionata.selected.cittaAzienda;
			$scope.feedSelezionato.aziendaFeedInt.active = $scope.aziendaSelezionata.selected.active;
			
		}

		console.log($scope.feedSelezionato);
		salvaFeed.response($scope.feedSelezionato).then(function(result){
			var codiceEsito = result.data.esito.codice;
			var c = result.data.idAzienda;
			if(codiceEsito == 100){
				$scope.azzeraForm();
				$scope.caricaFeed();
				$scope.setEsitoPositivo("Azienda correttamente salvata; codice esito: " + codiceEsito + " idAzienda: " + $scope);
			} else {
				var messaggioDiErrore = result.data.esito.message;
				$scope.setEsitoNegativo("ATTENZIONE, Problemi nel salvataggio di un feed; codice esito: " + codiceEsito + " messaggio di errore:" + messaggioDiErrore);
			}
			
		}).catch(function(){
			$scope.setEsitoNegativo("ATTENZIONE, Si è verificata un'eccezione nel salvataggio di un feed");
		});
	}
	
	$scope.submitImage = function(file){
		if(file){
			$scope.upload(file, VARIOUS.feedImageBaseFileName);
		}
		$scope.file = '';
		$scope.urlImmagineFeed = $scope.urlImmagine;
	}
	
	$scope.convertDateFromMilliseconds = function(millis){
		var date = new Date(millis);
		var formattedDate = $scope.getDayOrMonthNumberString(date.getDate()) + '/' + $scope.getDayOrMonthNumberString((date.getMonth()+1)) + '/' + date.getFullYear();
		return formattedDate;
	} 
	
	$scope.getDayOrMonthNumberString = function(num){
		var prefix = '';
		if(num < 10){
			prefix = '0';
		}
		return prefix + num;
	}
	
	$scope.azzeraForm = function(){
		$scope.azzeraEsito();	
		$scope.feedSelezionato = {};
		$scope.idFeed = '';
		$scope.titoloFeed = '';
		$scope.testoFeed = '';
		$scope.tipoFeed = 1;
		$scope.dataEntitaHeader = '';
		$scope.dataFeed = 0;
		$scope.headerFeed = '';
		$scope.idEntitaFeed = '';
		$scope.idEntitaHeaderFeed = '';
		$scope.sottoHeaderFeed = '';
		$scope.testoLabelFeed = '';
		$scope.tipoEntitaHeaderFeed = '';
		$scope.urlImmagineFeed = '';
		$scope.vinoSelezionato.selected = '';
	    $scope.eventoSelezionato.selected = '';
		$scope.aziendaSelezionata.selected = '';
	}
	
//	$scope.azzeraEventoSelezionato = function(){
//		$scope.eventoSelezionato.urlFotoEvento = '';
//		$scope.eventoSelezionato = {};
//		$scope.annoEvento = '';
//		$scope.meseEvento = '';
//		$scope.giornoEvento = '';
//		$scope.urlImmagineEvento = '';
//		$scope.listaViniSelezionati = [];
//		$scope.dataEvento = '';
//		$scope.aziendaOspitanteSelezionata.selected = {};
//		$scope.aziendaFornitriceSelezionata.selected = {};
//		$scope.provinciaSelezionata.selected = {};
//		$scope.badgeSelezionato.selected = {};
//	}
	
	$scope.caricaListaVini = function(){
		getListaVini.response().then(function(result){
			$scope.listaVini = result.data.vini;
			$scope.codiceEsito = result.data.esito.codice;
			
		    console.log($scope.listaVini);
		}).catch(function(){
		   $scope.codiceEsito = 'ERRORE';
		   console.log('Error');
		});
	}
	$scope.caricaListaVini();

	$scope.caricaListaAziende = function(){
		getListaAziende.response().then(function(result){
			$scope.listaAziende = result.data.aziende;
			$scope.codiceEsito = result.data.esito.codice;
			
		    console.log($scope.listaAziende);
		}).catch(function(){
		   $scope.codiceEsito = 'ERRORE';
		   console.log('Error');
		});
	}
	$scope.caricaListaAziende();
	
	$scope.caricaListaEventi = function(){
		getListaEventi.response().then(function(result){
			$scope.listaEventi = result.data.eventi;
			$scope.codiceEsito = result.data.esito.codice;
			
		    console.log($scope.listaEventi);
		}).catch(function(){
		   $scope.codiceEsito = 'ERRORE';
		   console.log('Error');
		});
	}
	$scope.caricaListaEventi();
//	$scope.caricaAziende = function(){
//		getListaAziende.response().then(function(result){
//			$scope.aziende = result.data.aziende;
//		}).catch(function(){
//		   $scope.codiceEsito = 'ERRORE';
//		   console.log('Error');
//		});
//	}
//	$scope.caricaAziende();
	
//	$scope.caricaVini = function(){
//		getListaVini.response().then(function(result){
//			$scope.listaVini = result.data.vini;
//		}).catch(function(){
//		   $scope.codiceEsito = 'ERRORE';
//		   console.log('Error');
//		});
//	}
//	$scope.caricaVini();

	
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

//	
//	$scope.cancellaEvento = function(evento){
//		cancellaEvento.response(evento).then(function(result){
//			var codiceEsito = result.data.esito.codice;
//			if(codiceEsito == 100){
//				$scope.azzeraEventoSelezionato();
//				$scope.caricaLista();
//				$scope.setEsitoPositivo("Evento cancellato correttamente");
//			} else {
//				var messaggioDiErrore = result.data.esito.message;
//				$scope.setEsitoNegativo("ATTENZIONE, Problemi nella cancellazione dell'evento; codice esito: " + codiceEsito + " messaggio di errore:" + messaggioDiErrore);
//			}
//		}).catch(function(error){
//			$scope.setEsitoNegativo("ATTENZIONE, Si è verificata un'eccezione nella cancellazione dell'evento: " + error);
//		});
//	}
//	
//	$scope.submitImageEvento = function(file){
//		if(file){
//			$scope.upload(file, VARIOUS.eventoImageBaseFileName);
//		}
//		$scope.fileEvento = '';
//	}
	
	$scope.duplicaFeed = function(){
		$scope.feedSelezionato.idFeed = "";
		$scope.idFeed = "";
		$scope.feedSelezionato.titoloFeed = $scope.feedSelezionato.titoloFeed + " copia";
		$scope.titoloFeed = $scope.titoloFeed + " copia";
		$scope.submit();
	}
	
	$scope.cancellaFeed = function(feed){
		cancellaFeed.response(feed).then(function(result){
			var codiceEsito = result.data.esito.codice;
			if(codiceEsito == 100){
				$scope.azzeraForm();
				$scope.caricaFeed();
				$scope.setEsitoPositivo("Azienda cancellata correttamente");
			} else {
				var messaggioDiErrore = result.data.esito.message;
				$scope.setEsitoNegativo("ATTENZIONE, Problemi nella cancellazione dell feed; codice esito: " + codiceEsito + " messaggio di errore:" + messaggioDiErrore);
			}
		}).catch(function(){
			$scope.setEsitoNegativo("ATTENZIONE, Si è verificata un'eccezione nella cancellazione dell feed");
		});
	}
	
	$scope.confirmDecision = function(feed){
		$scope.azzeraEsito();
        $ngConfirm({
            title: 'Conferma',
            content: 'Si conferma di cancellare il feed : ' + feed.titoloFeed + '?',
            scope: $scope,
            buttons: {
                conferma: {
                    text: 'Conferma',
                    btnClass: 'btn-blue',
                    action: function(scope, button){
                        $scope.cancellaFeed(feed);
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
		var urlImmagine = '';
		reader.readAsDataURL(file); 
		reader.onloadend = function() {
			base64data = reader.result;                
			console.log(base64data);
			
			 salvaImmagine.response(base64data, baseFileName, "").then(function(result){
				var codiceEsito = result.data.esito.codice;
				$scope.urlImmagineFeed = result.data.imageUrl;
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
    
    
//    $scope.uploadImmagineBadge = function (file, baseFileName) {
//		var reader = new window.FileReader();
//		reader.readAsDataURL(file); 
//		reader.onloadend = function() {
//			base64data = reader.result;                
//			console.log(base64data);
//			
//			 salvaImmagine.response(base64data, baseFileName, "").then(function(result){
//				var codiceEsito = result.data.esito.codice;
//				if(codiceEsito == 100){
//					$scope.setEsitoPositivo("Immagine correttamente salvata; \ncodice esito: " + codiceEsito);
//					$scope.badgeSelezionato.urlLogoBadge = result.data.imageUrl;
//				} else {
//					var messaggioDiErrore = result.data.esito.message;
//					$scope.setEsitoNegativo("ATTENZIONE, Problemi nel salvataggio dell'immagine dell'azienda; \ncodice esito: " + codiceEsito + " \nmessaggio di errore:" + messaggioDiErrore);
//				}
//				
//			}).catch(function(){
//				$scope.setEsitoNegativo("ATTENZIONE, Si è verificata un'eccezione nel salvataggio dell'immagine dell'azienda");
//			});					
//		 }
//    };
    
    $scope.azzeraForm();
    
}]);