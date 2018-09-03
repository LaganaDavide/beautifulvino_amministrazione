angular.module("utentiModule").controller("eventiController", ["getListaEventi", "salvaEvento", "cancellaEvento", "salvaBadgeService","salvaProvinciaService", "getListaBadge", "getListaAziende", "getListaProvince", "getListaVini", "salvaImmagine", "VARIOUS", "$ngConfirm", "$scope", function(getListaEventi, salvaEvento, cancellaEvento, salvaBadgeService, salvaProvinciaService, getListaBadge, getListaAziende, getListaProvince, getListaVini, salvaImmagine, VARIOUS, $ngConfirm, $scope){
	
	var eventiController = this;
	$scope.listaEventi = [];
	$scope.codiceEsito = 'attesa';
	
	$scope.visualizzaEsito = false;
	$scope.messaggioEsito = '';
	$scope.coloreSfondoEsito = VARIOUS.coloreSfondoEsitoNeutro;
	
	$scope.urlImmagineEvento = '';
	
	$scope.fileEvento = '';
	
	$scope.eventoSelezionato = {};
	
	$scope.dataEvento = '';
	
	$scope.oldIdAzienda = '';
	$scope.listaViniCancellati = [];
	
	//gestione aziende
	$scope.aziende = [];
	$scope.aziendaOspitanteSelezionata = {};
	
	//gestione badge
	$scope.visualizzaEditorBadge = false;
	$scope.badgeSelezionato = {};
	$scope.listaBadges = [];
	
	//gestione province
	$scope.visualizzaEditorProvince = false;
	$scope.provinciaSelezionata = {};
	$scope.listaProvince = [];
	
	//gestione vini
	$scope.visualizzaEditorListaVini = false;
	$scope.vinoSelezionato = {};
	$scope.listaViniSelezionati = [];
	$scope.listaVini = [];
	$scope.idVinoTemp = '';
	
//	// encode(decode) html text into html entity
//	 $scope.decodeHtmlEntity = function(str) {
//	  return str.replace(/&#(\d+);/g, function(match, dec) {
//	    return String.fromCharCode(dec);
//	  });
//	};
//
//	 $scope.encodeHtmlEntity = function(str) {
//	  var buf = [];
//	  for (var i=str.length-1;i>=0;i--) {
//	    buf.unshift(['&#', str[i].charCodeAt(), ';'].join(''));
//	  }
//	  return buf.join('');
//	};
//
//	var entity = '&agrave;&egrave;&eacute;&igrave;&ograve;&ugrave;';
//	var str = 'àèéìòù';
	
//	$scope.corrIn = function (){
//		//$scope.eventoSelezionato.titoloEvento =  $scope.encodeHtmlEntity($scope.eventoSelezionato.titoloEvento);
//	}
//	
//	$scope.corrOut = function (){
//		//$scope.eventoSelezionato.titoloEvento =  $scope.decodeHtmlEntity($scope.eventoSelezionato.titoloEvento);
//	}
	$scope.salvaEvento = function(){
		
		//verifica e parsing della data
		//eventuale controllo di validità
		//gestione data vecchia
		$scope.eventoSelezionato.oldDate = $scope.eventoSelezionato.dataEvento;
		$scope.eventoSelezionato.dataEvento = Date.parse($scope.dataEvento); 
		//gestione azienda vecchia
		$scope.eventoSelezionato.oldIdAzienda = $scope.oldIdAzienda;
		//gestione provinciaEvento
		$scope.eventoSelezionato.provinciaEventoInt = $scope.provinciaSelezionata.selected;
		//gestione acquistabile 
		if ($scope.acquistabileEvento == true) $scope.eventoSelezionato.acquistabileEvento = 1;
		else $scope.eventoSelezionato.acquistabileEvento = 0;
		//gestione badgeEvento
		$scope.eventoSelezionato.badgeEventoInt = $scope.badgeSelezionato;
		
		//gestione aziende evento
		var aziendaOspitanteEventoInt = {};
		if ($scope.aziendaOspitanteSelezionata != null){
			aziendaOspitanteEventoInt.idAzienda = $scope.aziendaOspitanteSelezionata.selected.idAzienda;
			$scope.eventoSelezionato.aziendaOspitanteEvento = aziendaOspitanteEventoInt;
			$scope.eventoSelezionato.aziendaOspitanteEventoInt = aziendaOspitanteEventoInt;
		}
		//gestione vini evento
		$scope.eventoSelezionato.viniEventoInt = $scope.listaViniSelezionati;
		 //gestione vini cancellati
		$scope.eventoSelezionato.listaViniCancellati = $scope.listaViniCancellati;
		if ($scope.listaViniCancellati.length == null)
			$scope.eventoSelezionato.listaViniCancellati = null;
		else 
			$scope.eventoSelezionato.listaViniCancellati = $scope.listaViniCancellati;
		salvaEvento.response($scope.eventoSelezionato).then(function(result){
			var codiceEsito = result.data.esito.codice;
			if(codiceEsito == 100){
				$scope.setEsitoPositivo("Evento inserito correttamente");
				//il vino selezionato lo devo mettere nella lista con una push
				$scope.caricaLista();
				$scope.azzeraEventoSelezionato();
				$scope.visualizzaEditorBadge = false;
			} else {
				var messaggioDiErrore = result.data.esito.message;
				$scope.setEsitoNegativo("ATTENZIONE, Problemi nell'inserimento del'evento; codice esito: " + codiceEsito + " messaggio di errore:" + messaggioDiErrore);
				$scope.visualizzaEditorBadge = false;
			}
		}).catch(function(error){
			$scope.setEsitoNegativo("ATTENZIONE, Si è verificata un'eccezione nell'inserimento dell'evento");
			$scope.visualizzaEditorBadge = false;
		});
		
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
	
	$scope.azzeraEventoSelezionato = function(){
		$scope.eventoSelezionato = {};
		$scope.annoEvento = '';
		$scope.meseEvento = '';
		$scope.giornoEvento = '';
		$scope.urlImmagineEvento = '';
		$scope.listaViniSelezionati = [];
		$scope.dataEvento = '';
		$scope.aziendaOspitanteSelezionata.selected = {};
		$scope.provinciaSelezionata.selected = '';
		$scope.badgeSelezionato = {};
		$scope.oldIdAzienda = '';
		$scope.acquistabileEvento = false;
		$scope.listaViniCancellati = [];
	}
	
	$scope.caricaLista = function(){
		getListaEventi.response().then(function(result){
			$scope.listaEventi = result.data.eventi;
			$scope.codiceEsito = result.data.esito.codice;
			
		    console.log($scope.listaVini);
		}).catch(function(){
		   $scope.codiceEsito = 'ERRORE';
		   console.log('Error');
		});
	}
	$scope.caricaLista();
	
	$scope.caricaBadges = function(){
		getListaBadge.response().then(function(result){
			$scope.listaBadges = result.data.badges;
		}).catch(function(){
		   $scope.codiceEsito = 'ERRORE';
		   console.log('Error');
		});
	}
	$scope.caricaBadges();
	
	
	$scope.salvaBadge = function(){
		$scope.badgeSelezionato.dataBadge = Date.parse($scope.dataEvento); 
		$scope.badgeSelezionato.badgeEvento.dataEvento = Date.parse($scope.dataEvento);
		$scope.badgeSelezionato.badgeEvento.idEvento = $scope.idEvento;
		salvaBadgeService.response($scope.badgeSelezionato).then(function(result){
			var codiceEsito = result.data.esito.codice;
			if(codiceEsito == 100){
				$scope.setEsitoPositivo("Badge inserito correttamente");
				//il vino selezionato lo devo mettere nella lista con una push
				$scope.caricaBadges();
				$scope.visualizzaEditorBadge = false;
				
			} else {
				var messaggioDiErrore = result.data.esito.message;
				$scope.setEsitoNegativo("ATTENZIONE, Problemi nell'inserimento del badge; codice esito: " + codiceEsito + " messaggio di errore:" + messaggioDiErrore);
				$scope.visualizzaEditorBadge = false;
			}
		}).catch(function(error){
			$scope.setEsitoNegativo("ATTENZIONE, Si è verificata un'eccezione nell'inserimento del badge: " + error);
			$scope.visualizzaEditorBadge = false;
		});
	}
	
	$scope.apriEditorProvince = function(){
		$scope.visualizzaEditorProvince = !$scope.visualizzaEditorProvince;
		$scope.provinciaSelezionata.selected = {};
	}
	
	$scope.apriEditorBadge = function(){
		$scope.visualizzaEditorBadge = !$scope.visualizzaEditorBadge;
		$scope.badgeSelezionato.selected = {};
	}
	
	
	$scope.salvaProvincia = function(){
		salvaProvinciaService.response($scope.provinciaSelezionata.selected).then(function(result){
			var codiceEsito = result.data.esito.codice;
			if(codiceEsito == 100){
				$scope.setEsitoPositivo("Provincia inserita correttamente");
				//il vino selezionato lo devo mettere nella lista con una push
				$scope.caricaProvince();
				$scope.visualizzaEditorProvince = false;
				$scope.provinciaSelezionata.selected.idProvincia = result.data.idProvincia;
			} else {
				var messaggioDiErrore = result.data.esito.message;
				$scope.setEsitoNegativo("ATTENZIONE, Problemi nell'inserimento della provincia; codice esito: " + codiceEsito + " messaggio di errore:" + messaggioDiErrore);
				$scope.visualizzaEditorProvince = false;
			}
		}).catch(function(error){
			$scope.setEsitoNegativo("ATTENZIONE, Si è verificata un'eccezione nell'inserimento della provincia: " + error);
			$scope.visualizzaEditorProvince = false;
		});
	}
	
	$scope.caricaProvince = function(){
		getListaProvince.response().then(function(result){
			$scope.listaProvince = result.data.province;
		}).catch(function(){
		   $scope.codiceEsito = 'ERRORE';
		   console.log('Error');
		});
	}
	$scope.caricaProvince();
	
	$scope.aggiungiProvincia = function(){
		$scope.salvaProvincia();
		$scope.caricaProvince();
		$scope.visualizzaEditorProvince = false;
	}
	
	$scope.caricaAziende = function(){
		getListaAziende.response().then(function(result){
			$scope.aziende = result.data.aziende;
		}).catch(function(){
		   $scope.codiceEsito = 'ERRORE';
		   console.log('Error');
		});
	}
	$scope.caricaAziende();
	
	$scope.caricaVini = function(){
		getListaVini.response().then(function(result){
			$scope.listaVini = result.data.vini;
		}).catch(function(){
		   $scope.codiceEsito = 'ERRORE';
		   console.log('Error');
		});
	}
	$scope.caricaVini();
	
	$scope.clickVino = function(vino){
		$scope.vinoSelezionato = vino;
	}
	
	$scope.aggiungiVinoALista = function(){
		var vinoSelezionatoTemp = $scope.vinoSelezionato.selected;
		vinoSelezionatoTemp.nomeAziendaVino = vinoSelezionatoTemp.aziendaVinoInt.nomeAzienda;
		vinoSelezionatoTemp.idAziendaVino = vinoSelezionatoTemp.aziendaVinoInt.idAzienda;
		var flag = false;
		$scope.listaViniSelezionati.forEach (function (vino){
			if (vino.idVino == vinoSelezionatoTemp.idVino){
				flag = true;
				}
			}
		);
		if (flag == false) $scope.listaViniSelezionati.push(vinoSelezionatoTemp);
		var vinoRe = null;
		if ($scope.listaViniCancellati != undefined && $scope.listaViniCancellati != null){
			$scope.listaViniCancellati.forEach (function (vino){
				if (vino.idVino == vinoSelezionatoTemp.idVino){
					vinoRe = vino;
					}
				}
			);
		}
		if (vinoRe != null){
			var index = $scope.listaViniCancellati.indexOf(vinoRe);
			$scope.listaViniCancellati.splice(index, 1);
		}
		$scope.vinoSelezionato = {};
		$scope.vinoSelezionato.selected = {};		
	}
	
	$scope.rimuoviVinoDaLista = function(vinoSelezionato){
		var indiceViniSelezionati = $scope.listaViniSelezionati.indexOf(vinoSelezionato);
		$scope.listaViniSelezionati.splice(indiceViniSelezionati, 1);
		if($scope.listaViniCancellati.indexOf(vinoSelezionato) == -1){
			$scope.listaViniCancellati.push(vinoSelezionato);
		}
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
	
	$scope.clickEvento = function(evento){
		$scope.azzeraEsito();
		$scope.azzeraEventoSelezionato();
		$scope.eventoSelezionato = evento;
		$scope.listaViniSelezionati = $scope.eventoSelezionato.viniEventoInt;
		$scope.dataEvento = new Date($scope.eventoSelezionato.dataEvento);
		if (evento.acquistabileEvento == 1) $scope.acquistabileEvento = true;
		else  $scope.acquistabileEvento = false;
		if (evento.aziendaOspitanteEventoInt != null && evento.aziendaOspitanteEventoInt.idAzienda != null ) {
			$scope.oldIdAzienda =  evento.aziendaOspitanteEventoInt.idAzienda;
			//carico l'azienda corrispondente 
			$scope.caricaAziendaOspitante();
		}
		if ($scope.eventoSelezionato.provinciaEventoInt!= null){
			$scope.caricaProvinciaInterfaccia();
		}
		//$scope.caricaBadgeInterfaccia();
		$scope.badgeSelezionato = evento.badgeEventoInt;
		$scope.listaViniCancellati = [];
		
		for (let j = 0; j < $scope.listaBadges.length ; j++){
			if ($scope.badgeSelezionato.idBadge == $scope.listaBadges[j].idBadge){
				$scope.badgeSelezionato.nomeBadge = $scope.listaBadges[j].nomeBadge;
				$scope.badgeSelezionato.infoBadge = $scope.listaBadges[j].infoBadge;
				$scope.badgeSelezionato.urlLogoBadge = $scope.listaBadges[j].urlLogoBadge;
			}
		}
	}
	
	$scope.caricaBadgeInterfaccia = function(){
		var arrayLength = $scope.listaBadges.length;
		for (var i = 0; i < arrayLength; i++) {
			var badge = $scope.listaBadges[i];
			if($scope.eventoSelezionato.badgeEventoInt != null && badge.idBadge == $scope.eventoSelezionato.badgeEventoInt.idBadge){
				$scope.badgeSelezionato.selected = badge;
				return;
			}
		}
	}
	
	$scope.caricaProvinciaInterfaccia = function(){
		var arrayLength = $scope.listaProvince.length;
		for (var i = 0; i < arrayLength; i++) {
			var provincia = $scope.listaProvince[i];
			if(provincia.idProvincia == $scope.eventoSelezionato.provinciaEventoInt.idProvincia){
				$scope.provinciaSelezionata.selected = provincia;
				return;
			}
		}
	}
	
	$scope.caricaAziendaOspitante = function(){
		var arrayLength = $scope.aziende.length;
		for (var i = 0; i < arrayLength; i++) {
			var azienda = $scope.aziende[i];
			if(azienda.idAzienda == $scope.eventoSelezionato.aziendaOspitanteEventoInt.idAzienda){
				$scope.aziendaOspitanteSelezionata.selected = azienda;
				return;
			}
		}
	}
	
	$scope.togliAzienda = function (){
		$scope.aziendaOspitanteSelezionata.selected = {};
	}
	
	$scope.cancellaEvento = function(evento){
		cancellaEvento.response(evento).then(function(result){
			var codiceEsito = result.data.esito.codice;
			if(codiceEsito == 100){
				$scope.azzeraEventoSelezionato();
				$scope.caricaLista();
				$scope.setEsitoPositivo("Evento cancellato correttamente");
			} else {
				var messaggioDiErrore = result.data.esito.message;
				$scope.setEsitoNegativo("ATTENZIONE, Problemi nella cancellazione dell'evento; codice esito: " + codiceEsito + " messaggio di errore:" + messaggioDiErrore);
			}
		}).catch(function(error){
			$scope.setEsitoNegativo("ATTENZIONE, Si è verificata un'eccezione nella cancellazione dell'evento: " + error);
		});
	}
	
	$scope.duplicaEvento = function(){
		$scope.eventoSelezionato.idEvento = "";
		$scope.eventoSelezionato.titoloEvento = $scope.eventoSelezionato.titoloEvento + " copia";
		$scope.eventoSelezionato.iscrittiEvento = [];
		$scope.eventoSelezionato.iscrittiEventoInt = [];
		$scope.eventoSelezionato.preferitiEventoInt = [];
		$scope.aziendaOspitanteSelezionata.selected = {};
		$scope.salvaEvento();
	}
	
	$scope.submitImageEvento = function(file){
		if(file){
			$scope.upload(file, VARIOUS.eventoImageBaseFileName);
		}
		$scope.fileEvento = '';
	}
	
	$scope.submitImageLogoBadge = function(file){
		if(file){
			$scope.uploadImmagineBadge(file, VARIOUS.badgeImageBaseFileName);
		}
		$scope.fileBadge = '';
	}
	
	$scope.confirmDecision = function(evento){
		$scope.azzeraEsito();
        $ngConfirm({
            title: 'Conferma',
            content: 'Si conferma di cancellare evento : ' + evento.titoloEvento + '?',
            scope: $scope,
            buttons: {
                conferma: {
                    text: 'Conferma',
                    btnClass: 'btn-blue',
                    action: function(scope, button){
                        $scope.cancellaEvento(evento);
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
				if(codiceEsito == 100){
					$scope.setEsitoPositivo("Immagine correttamente salvata; \ncodice esito: " + codiceEsito);
					$scope.eventoSelezionato.urlFotoEvento = result.data.imageUrl;
				} else {
					var messaggioDiErrore = result.data.esito.message;
					$scope.setEsitoNegativo("ATTENZIONE, Problemi nel salvataggio dell'immagine dell'evento; \ncodice esito: " + codiceEsito + " \nmessaggio di errore:" + messaggioDiErrore);
				}
				
			}).catch(function(){
				$scope.setEsitoNegativo("ATTENZIONE, Si è verificata un'eccezione nel salvataggio dell'immagine dell'evento");
			});					
		 }
    };
    
    
    $scope.uploadImmagineBadge = function (file, baseFileName) {
		var reader = new window.FileReader();
		reader.readAsDataURL(file); 
		reader.onloadend = function() {
			base64data = reader.result;                
			console.log(base64data);
			
			 salvaImmagine.response(base64data, baseFileName, "").then(function(result){
				var codiceEsito = result.data.esito.codice;
				if(codiceEsito == 100){
					$scope.setEsitoPositivo("Immagine correttamente salvata; \ncodice esito: " + codiceEsito);
					$scope.badgeSelezionato.urlLogoBadge = result.data.imageUrl;
				} else {
					var messaggioDiErrore = result.data.esito.message;
					$scope.setEsitoNegativo("ATTENZIONE, Problemi nel salvataggio dell'immagine dell'evento; \ncodice esito: " + codiceEsito + " \nmessaggio di errore:" + messaggioDiErrore);
				}
				
			}).catch(function(){
				$scope.setEsitoNegativo("ATTENZIONE, Si è verificata un'eccezione nel salvataggio dell'immagine dell'azienda");
			});					
		 }
    };
    $scope.azzeraEventoSelezionato();
}]);