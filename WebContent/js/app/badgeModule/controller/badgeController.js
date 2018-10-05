angular.module("utentiModule").controller("badgeController", ["getListaBadge", "salvaBadgeService", "salvaImmagine","VARIOUS", "$ngConfirm", "$scope",function(getListaBadge, salvaBadgeService, salvaImmagine, VARIOUS, $ngConfirm, $scope){
	
	var badgeController = this;
	$scope.listaBadges = [];
	$scope.codiceEsito = 'attesa';
	
	$scope.visualizzaEsito = false;
	$scope.messaggioEsito = '';
	$scope.coloreSfondoEsito = VARIOUS.coloreSfondoEsitoNeutro;
	
	$scope.badgeSelezionato = {};
	
	$scope.goToEventi = function (){
		$scope.setIdEventoBadgePass($scope.badgeSelezionato.idBadge);
		$scope.setEventiView();
	}
	
	$scope.azzeraBadgeSelezionato = function(){
		$scope.badgeSelezionato = {};
	}
	
	$scope.getDayOrMonthNumberString = function(num){
		var prefix = '';
		if(num < 10){
			prefix = '0';
		}
		return prefix + num;
	}
	
	$scope.getNormalDate = function (){
		console.log($scope.listaBadges);
		$scope.listaBadges.forEach(
				function (e){
					let date = new Date(e.dataBadge);
					let formattedDate = $scope.getDayOrMonthNumberString(date.getDate()) + '/' + $scope.getDayOrMonthNumberString((date.getMonth()+1)) + '/' + date.getFullYear();
					e.normalDate = formattedDate;
				}
		)
	}
	
	$scope.caricaLista = function(){
		getListaBadge.response().then(function(result){
			$scope.listaBadges = result.data.badges;
			$scope.codiceEsito = result.data.esito.codice;
			
			$scope.getNormalDate();
		    console.log($scope.listaBadges);
		}).catch(function(){
		   $scope.codiceEsito = 'ERRORE';
		   console.log('Error');
		});
	}
	
	$scope.caricaLista();
	
	 $scope.page = 1;

		$scope.displayItems = $scope.listaBadges.slice(0, 20);
		
		$scope.pageChanged = function() {
		  var startPos = ($scope.page - 1) * 20;
		  //$scope.displayItems = $scope.totalItems.slice(startPos, startPos + 3);
		  console.log($scope.page);
		};
	
	
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
		
	}
	
	$scope.clickVuoto = function (){
		$scope.azzeraEsito();	
		$scope.azzeraForm();
		if ($scope.badgeSelezionato != null) $scope.badgeSelezionato = null
		console.log ("ciao");
	}
	
	$scope.clickBadge= function(badge){
		$scope.azzeraEsito();
		$scope.badgeSelezionato = badge;

	}
	
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
	

	$scope.submit = function(){
		if ($scope.badgeSelezionato.idBadge.length > 1){
			salvaBadgeService.response($scope.badgeSelezionato).then(function(result){
				var codiceEsito = result.data.esito.codice;
				if(codiceEsito == 100){
					$scope.setEsitoPositivo("Badge inserito correttamente");
					//il vino selezionato lo devo mettere nella lista con una push
					$scope.caricaLista();
					
				} else {
					var messaggioDiErrore = result.data.esito.message;
					$scope.setEsitoNegativo("ATTENZIONE, Problemi nell'inserimento del badge; codice esito: " + codiceEsito + " messaggio di errore:" + messaggioDiErrore);
				}
			}).catch(function(error){
				$scope.setEsitoNegativo("ATTENZIONE, Si è verificata un'eccezione nell'inserimento del badge: " + error);
	
			});
		}
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
	
	$scope.submitImage = function(file){
		if(file){
			$scope.upload(file, VARIOUS.eventoImageBaseFileName);
		}
		$scope.fileEvento = '';
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
					$scope.badgeSelezionato.urlLogoBadge = result.data.imageUrl;
				} else {
					var messaggioDiErrore = result.data.esito.message;
					$scope.setEsitoNegativo("ATTENZIONE, Problemi nel salvataggio dell'immagine dell'evento; \ncodice esito: " + codiceEsito + " \nmessaggio di errore:" + messaggioDiErrore);
				}
				
			}).catch(function(){
				$scope.setEsitoNegativo("ATTENZIONE, Si è verificata un'eccezione nel salvataggio dell'immagine dell'evento");
			});					
		 }
    };
    
}]);