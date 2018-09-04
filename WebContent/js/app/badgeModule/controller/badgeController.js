angular.module("utentiModule").controller("badgeController", ["getListaBadge", "VARIOUS", "$ngConfirm", "$scope",function(getListaBadge, VARIOUS, $ngConfirm, $scope){
	
	var badgeController = this;
	$scope.listaBadges = [];
	$scope.codiceEsito = 'attesa';
	
	$scope.visualizzaEsito = false;
	$scope.messaggioEsito = '';
	$scope.coloreSfondoEsito = VARIOUS.coloreSfondoEsitoNeutro;
	
	$scope.badgeSelezionato = {};
	
	
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
		getListaBadge.response().then(function(result){
			$scope.listaBadges = result.data.badges;
			$scope.codiceEsito = result.data.esito.codice;
			
		    console.log($scope.listaBadges);
		}).catch(function(){
		   $scope.codiceEsito = 'ERRORE';
		   console.log('Error');
		});
	}
	
	$scope.caricaLista();
	
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
    
}]);