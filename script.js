var app = angular.module('lolapi',[]);

app.controller('lolapiController', ['$scope', '$summoner', '$api', function($scope, $summoner, $api) {
	$scope.region = 'euw';
	$scope.apikey = '';

	$scope.changeRegion = function() {
		$api.setRegion($scope.region);
	}

	$scope.changeApiKey = function() {
		$api.setApiKey($scope.apikey);
	}

	$scope.search = function() {
		if (!$scope.summonerName) return;
		$scope.summoner = $summoner.get($scope.summonerName, function() {
			$scope.getStats();
			$scope.getLeague();
			$scope.getGameHistory();
			$scope.getMasteries();
			$scope.getRunes();
		});
    }
	$scope.getStats = function() {
		$scope.summoner.stats = $summoner.getStats($scope.summoner.id);
	}
	$scope.getLeague = function() {
		$scope.summoner.league = $summoner.getLeague($scope.summoner.id);
	}
	$scope.getGameHistory = function() {
		$scope.summoner.games = $summoner.getGameHistory($scope.summoner.id);
	}
	$scope.getMasteries = function() {
		$scope.summoner.masteries = $summoner.getMasteries($scope.summoner.id);
	}
	$scope.getRunes = function() {
		$scope.summoner.runes = $summoner.getRunes($scope.summoner.id);
	}
}]);