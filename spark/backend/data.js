app.factory('championsData', ['$ddragon', function($ddragon) {
	var champsData;
	var idMap = {};
	$ddragon.getLocalized('champion.json').then(function(response) {
		champsData = response.data;
		for(var index in champsData) {
			idMap[champsData[index].key] = champsData[index]; 
		}
	});
	return {
		nameFromRaw: function(rawName) {
			return (champsData && champsData[rawName]) ? champsData[rawName].name : rawName;
		},
		nameFromId: function(id) {
			return (idMap && idMap[id]) ? idMap[id].name : id;
		},
		rawNameFromId: function(id) {
			return (idMap && idMap[id]) ? idMap[id].id : id;
		}
	}
}]);
