app.factory('$api', ['$http', function($http) {
	var apikey = '';
	var region = 'euw';
	var baseUrlv11;
	var baseUrlv21;
	var recalculateURLs = function() {
		baseUrlv11 = 'https://prod.api.pvp.net/api/lol/'+region+'/v1.1/'
		baseUrlv21 = 'https://prod.api.pvp.net/api/'+region+'/v2.1/'
	}
	recalculateURLs();
	return {
		getv11: function(path) {
			return $http.get(baseUrlv11+path+'?api_key='+apikey).then(function(response) {
				return angular.fromJson(response.data);
			});
		},
		getv21: function(path) {
			return $http.get(baseUrlv21+path+'?api_key='+apikey).then(function(response) {
				return angular.fromJson(response.data);
			});
		},
		setRegion: function(newRegion) {
			region = newRegion;
			recalculateURLs();
		},
		setApiKey: function(key) {
			apikey = key;
		}
	}
}]);