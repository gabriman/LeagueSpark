app.factory('$summoner', ['$api', function($api) {
	return {
		get: function(summonerName, callback) {
			var path = 'summoner/by-name/'+summonerName;
			var summoner = {};
			$api.getv11(path).then(function(response) {
				for(var key in response) summoner[key]=response[key];
				if (callback) callback();
			});
			return summoner;
		},
		getStats: function(summonerId, callback) {
			var path = 'stats/by-summoner/'+summonerId+'/summary';
			var stats = [];
			$api.getv11(path).then(function(response) {
				responseStats = response.playerStatSummaries;
				for(var key in responseStats) stats[key]=responseStats[key];
				if (callback) callback();
			})
			return stats;
		},
		getGameHistory: function(summonerId, callback) {
			var path = 'game/by-summoner/'+summonerId+'/recent';
			var games = [];
			$api.getv11(path).then(function(response) {
				responseGames = response.games;
				for(var key in responseGames) games[key]=responseGames[key];
				if (callback) callback();
			})
			return games;
		},
		getLeague: function(summonerId, callback) {
			var path = 'league/by-summoner/'+summonerId;
			var league = [];
			$api.getv21(path).then(function(response) {
				responseLeague = response[summonerId];
				for(var key in responseLeague) league[key]=responseLeague[key];
				if (callback) callback();
			})
			return league;
		},
		getMasteries: function(summonerId, callback) {
			var path = 'summoner/'+summonerId+'/masteries';
			var masteryPages = [];
			$api.getv11(path).then(function(response) {
				responsePages = response.pages;
				for(var key in responsePages) masteryPages[key]=responsePages[key];
				if (callback) callback();
			})
			return masteryPages;
		},
		getRunes: function(summonerId, callback) {
			var path = 'summoner/'+summonerId+'/runes';
			var runePages = [];
			$api.getv11(path).then(function(response) {
				responsePages = response.pages;
				for(var key in responsePages) runePages[key]=responsePages[key];
				if (callback) callback();
			})
			return runePages;
		},
	}

}]);