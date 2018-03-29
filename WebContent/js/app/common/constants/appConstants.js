angular.module('utentiModule').constant('URLS',{
		get: 'https://gmnh1plxq7.execute-api.eu-central-1.amazonaws.com/BeautifulVinoGet',
		put: 'https://4aqjw0dwx0.execute-api.eu-central-1.amazonaws.com/BeautifulVinoPut',
		del: 'https://g214kd676g.execute-api.eu-central-1.amazonaws.com/BeautifulVinoDelete',
		getUtenti: 'https://kzfo5h0sc1.execute-api.eu-central-1.amazonaws.com/BeautifulVinoGetUtenti',
		putUtente: 'https://ber7hi49n1.execute-api.eu-central-1.amazonaws.com/BeautifulVinoPutUtente',
		cancellaUtente: 'https://iuhb8o4k59.execute-api.eu-central-1.amazonaws.com/BeautifulVinoDeleteUtente',
		getAziende: 'https://juyy4fga74.execute-api.eu-central-1.amazonaws.com/BeautifulVinoGetAziende',
		getAzienda: 'https://zny9me5dt8.execute-api.eu-central-1.amazonaws.com/BeautifulVinoGetAzienda',
		putAzienda: 'https://f07zj2mdfa.execute-api.eu-central-1.amazonaws.com/BeautifulVinoPutAzienda',
		cancellaAzienda: 'https://qjodthlswb.execute-api.eu-central-1.amazonaws.com/BeautifulVinoDeleteAzienda',
		putVino: 'https://dzvptfmcw2.execute-api.eu-central-1.amazonaws.com/BeautifulVinoPutVino',
		getVini: 'https://msbr19n8sg.execute-api.eu-central-1.amazonaws.com/BeautifulVinoGetVini',
		putImage: 'https://ltf72bsjgl.execute-api.eu-central-1.amazonaws.com/BeautifulVinoPutImage',
		putEvento: 'https://ksjcidu1zh.execute-api.eu-central-1.amazonaws.com/BeautifulVinoPutEvento',
		cancellaEvento: 'https://q0kuva8ii0.execute-api.eu-central-1.amazonaws.com/BeautifulVinoDeleteEvento'
	}
).constant('RESPONSE_CODES',{
	okResponse: 100
}).constant('VARIOUS',{
	coloreSfondoEsitoOk: '#CCFF00',
	coloreSfondoEsitoKo: '#FF6633',
	coloreSfondoEsitoNeutro: '#FFFFFF',
	utenteImageBaseFileName: 'utenteImagefile',
	aziendaImageBaseFileName: 'aziendaImagefile',
	vinoImageBaseFileName: 'vinoImagefile',
	vinoLogoBaseFileName: 'logoVinofile',
	eventoImageBaseFileName: 'eventoImagefile',
	badgeImageBaseFileName: 'logoBadgeImagefile',
	feedImageBaseFileName: 'feedImagefile'	
});