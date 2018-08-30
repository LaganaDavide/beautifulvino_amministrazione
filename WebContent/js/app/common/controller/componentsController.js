angular.module("applicationModule").controller("componentsController", ["$scope", function($scope) {

	$scope.isUtenti = true;
	$scope.isAziende = false;
	$scope.isVini = false;
	$scope.isEventi = false;
	$scope.isFeed = false;
	$scope.isNotifiche = false;
	
	$scope.resetView = function(){
		$scope.isUtenti = false;
		$scope.isAziende = false;
		$scope.isVini = false;
		$scope.isEventi = false;
		$scope.isFeed = false;
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
	
	$scope.setNotificheView = function(){
		$scope.resetView();
		$scope.isNotifiche = true;
	};
}]);
