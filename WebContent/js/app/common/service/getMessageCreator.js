angular.module("utentiModule").service("getMessagesCreator", function() {
	
	this.genericMessage = function(functionName){// il messaggio è vuoto, non c'è bisogno di filtri
		var message = {};
		message.functionName = functionName;
		return message;
	};
	
	this.putUtenteMessage = function(utente){
		
		var message = {};
		message.utente = utente;
		message.functionName = "putUtenteGen";
		
		return message;
	}
	
	this.cancellaUtenteMessage = function(utente){
		var message = {};
		message.idUtente = utente.idUtente;
		message.functionName = "deleteUtenteGen";
		return message;
	}
	
	this.putAziendaMessage = function(azienda){
		
		var message = {};
		message.azienda = azienda;
		message.functionName = "putAziendaGen";
		
		return message;
	}
	
	this.cancellaAziendaMessage = function(azienda){
		var message = {};
		message.idAzienda = azienda.idAzienda;
		message.functionName = "deleteAziendaGen"
		return message;
	}
	
	this.getAziendaMessage = function(idAzienda){
		var message = {};
		message.idAzienda = idAzienda;
		message.functionName = "getAziendaGen";
		
		return message;
	}
	
	this.putVinoMessage = function(vino){
		
		var message = {};
		message.vino = vino;
		message.functionName = "putVinoGen";
		
		return message;
	}

	this.putEventoMessage = function(evento){
		
		var message = {};
		message.evento = evento;
		message.functionName = "putEventoGen";
		
		return message;
	}
	
	this.deleteEventoMessage = function(evento){
		
		var message = {};
		message.idEvento = evento.idEvento;
		message.dataEvento = evento.dataEvento;
		message.functionName = "deleteEventoGen"
		
		return message;
	}

	this.putBadgeMessage = function(badge){
		
		var message = {};
		message.badge = badge;
		message.functionName = "putBadgeGen";
		
		return message;
	}
	
	this.putProvinciaMessage = function(provincia){
		
		var message = {};
		message.provincia = provincia;
		message.functionName = "putProvinciaGen";
		
		return message;
	}
	
	this.salvaImmagineMessage = function(file, filename, tipoEntita){
		var message = {};
		
		message.base64Image = file;
		message.filename = filename; 
		message.tipoEntita = tipoEntita;
		message.functionName = "putImageGen";
		
		return message;
	}
	
	this.getFeedMessage = function(){
		var message = {};
		
		message.elencoCompleto = "S";
		message.functionName = "getFeedGen";
		
		return message;
	}
	
	this.putFeedMessage = function(feed){
		var message = {};
		message.feed = feed;
		message.functionName = "putFeedGen";
		
		return message;
	}
	
	this.cancellaFeedMessage = function(feed){
			
			var message = {};
			message.idFeed = feed.idFeed;
			message.dataFeed = feed.dataFeed;
			message.functionName = "deleteFeedGen"
			
			return message;
		}
	
	this.cancellaVinoMessage = function (vino){
		var message = {};
		message.idVino = vino.idVino;
		message.functionName = "deleteVinoGen"
			
		return message;
	}
	
	this.getEventiMessage = function(){
		var message = {};
		message.idUtente = "";
		message.functionName = "getEventiGen";
		message.elencoCompleto = "S";
		
		return message;
	}
	
	this.getNotificationMessage = function(txt){
		var mess = {};
		mess.messaggio = txt;
		return mess;
	}
	
});