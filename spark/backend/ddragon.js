app.factory('$ddragon', ['$http', function($http) {
	var region = 'euw';
	var language = 'en_US';
	var versionUrl = 'http://ddragon.leagueoflegends.com/realms/'+region+'.json';
	var currentVersion = '';
	var baseUrl = 'http://ddragon.leagueoflegends.com/cdn/3.14.41/';
	var baseLocalizedUrl = baseUrl+'data/fr_FR/';
	$http.get(versionUrl).then(function(response) {
				currentVersion = angular.fromJson(response.data).v;
				baseUrl = 'http://ddragon.leagueoflegends.com/cdn/'+currentVersion+'/data/'+language+'/';
				var baseLocalizedUrl = baseUrl+'data/fr_FR/';
			});
	return {
		get: function(path) {
			return $http.get(baseUrl+path).then(function(response) {
				parsed = angular.fromJson(response.data)
				return parsed
			})
		},
		getLocalized: function(path) {
			return $http.get(baseLocalizedUrl+path).then(function(response) {
				parsed = angular.fromJson(response.data)
				return parsed
			})
		},
		getBaseUrl: function() {
			return baseUrl;
		}
	}

}]);