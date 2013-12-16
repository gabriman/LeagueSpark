app.directive('freeChampRotation', ['$http', function($http) {
	var url = 'https://prod.api.pvp.net/api/lol/euw/v1.1/champion?freeToPlay=true&api_key='+'f54b64a6-7ad9-436a-aaed-e3e250e8630a';
	return {
		templateUrl: 'championRotation/championRotation.html',
		link: function (scope) {
			$http.get(url).then(function (response) {
				scope.champions = angular.fromJson(response.data).champions;
			});
		}
	};
}]);