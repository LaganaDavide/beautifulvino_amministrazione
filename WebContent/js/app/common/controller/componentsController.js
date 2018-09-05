angular.module("applicationModule").controller("componentsController", ["$scope", function($scope) {

	$scope.isUtenti = true;
	$scope.isAziende = false;
	$scope.isVini = false;
	$scope.isEventi = false;
	$scope.isFeed = false;
	$scope.isBadge = false;
	$scope.isNotifiche = false;
	
	//variabile per passare l'id evento dalla pagina dei badge alla pagina degli eventi
	$scope.idEventoBadgePass = "";
	
	$scope.getIdEventoBadgePass = function (){
		return $scope.idEventoBadgePass = "";
	}
	
	$scope.setIdEventoBadgePass = function (id){
		$scope.idEventoBadgePass = id;
	}
	
	$scope.resetView = function(){
		$scope.isUtenti = false;
		$scope.isAziende = false;
		$scope.isVini = false;
		$scope.isEventi = false;
		$scope.isFeed = false;
		$scope.isBadge = false;
		$scope.isNotifiche = false;
	}
	
	$scope.setUtentiView = function(){
		$scope.resetView();
		$scope.isUtenti = true;
	};

	$scope.setAziendeView = function(){
		$scope.resetView();
		$scope.isAziende = true;
	};
	
	$scope.setViniView = function(){
		$scope.resetView();
		$scope.isVini = true;
	};
	
	$scope.setEventiView = function(){
		$scope.resetView();
		$scope.isEventi = true;
	};
	
	$scope.setFeedView = function(){
		$scope.resetView();
		$scope.isFeed = true;
	};
	
	$scope.setBadgeView = function(){
		$scope.resetView();
		$scope.isBadge = true;
	};
	
	$scope.setNotificheView = function(){
		$scope.resetView();
		$scope.isNotifiche = true;
	};
}]);
