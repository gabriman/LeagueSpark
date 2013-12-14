app.filter('prettyChampName', ['championsData', function(championsData) {
	return function(rawName) {
		return championsData.nameFromRaw(rawName);
	}
}]);

app.filter('ChampNameFromId', ['championsData', function(championsData) {
	return function(id) {
		return championsData.nameFromId(id);
	}
}]);

app.filter('RawChampNameFromId', ['championsData', function(championsData) {
	return function(id) {
		return championsData.rawNameFromId(id);
	}
}]);	