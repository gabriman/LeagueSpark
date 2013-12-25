var app = angular.module('leaguespark',['ngAnimate']);

app.controller('leagueSparkController', ['$scope', '$summoner', '$api', '$ddragon', function($scope, $summoner, $api, $ddragon) {
	$scope.region = 'euw';
	$scope.apikey = '';
	$scope.loading = false;

	$scope.changeRegion = function() {
		$api.setRegion($scope.region);
		$ddragon.setRegion($scope.region);
	};

	$scope.changeApiKey = function() {
		$api.setApiKey($scope.apikey);
	};

	$scope.search = function() {
		if (!$scope.summonerName) return;
		$scope.loading = true;
		$scope.loaded = {};
		$scope.summoner = $summoner.get($scope.summonerName, function() {
			$scope.loaded.summoner = true;
			$scope.getStats();
			$scope.getLeague();
			$scope.getGameHistory();
			$scope.getMasteries();
			$scope.getRunes();
		});
    };
	$scope.getStats = function() {
		$scope.summoner.stats = $summoner.getStats($scope.summoner.id, function () {
			$scope.loaded.stats = true;
		});
	};
	$scope.getLeague = function() {
		$scope.summoner.league = $summoner.getLeague($scope.summoner.id, function () {
			$scope.loaded.league = true;
		});
	};
	$scope.getGameHistory = function() {
		$scope.summoner.games = $summoner.getGameHistory($scope.summoner.id, function () {
			$scope.loaded.games = true;
		});
	};
	$scope.getMasteries = function() {
		$scope.summoner.masteries = $summoner.getMasteries($scope.summoner.id, function () {
			$scope.loaded.masteries = true;
		});
	};
	$scope.getRunes = function() {
		$scope.summoner.runes = $summoner.getRunes($scope.summoner.id, function () {
			$scope.loaded.runes = true;
		});
	};
	$scope.isLoaded = function() {
		if ($scope.loaded) {
			return ($scope.loaded.summoner && $scope.loaded.stats && $scope.loaded.league && $scope.loaded.history && $scope.loaded.masteries && $scope.loaded.runes);
		} else {
			return false;
		}
	};
}]);