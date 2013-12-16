var app = angular.module('leaguespark',[]);

app.controller('leagueSparkController', ['$scope', '$summoner', '$api', '$ddragon', function($scope, $summoner, $api, $ddragon) {
	$scope.region = 'euw';
	$scope.apikey = '';

	$scope.changeRegion = function() {
		$api.setRegion($scope.region);
		$ddragon.setRegion($scope.region);
	};

	$scope.changeApiKey = function() {
		$api.setApiKey($scope.apikey);
	};

	$scope.search = function() {
		if (!$scope.summonerName) return;
		$scope.summoner = $summoner.get($scope.summonerName, function() {
			$scope.getStats();
			$scope.getLeague();
			$scope.getGameHistory();
			$scope.getMasteries();
			$scope.getRunes();
		});
    };
	$scope.getStats = function() {
		$scope.summoner.stats = $summoner.getStats($scope.summoner.id);
	};
	$scope.getLeague = function() {
		$scope.summoner.league = $summoner.getLeague($scope.summoner.id);
	};
	$scope.getGameHistory = function() {
		$scope.summoner.games = $summoner.getGameHistory($scope.summoner.id);
	};
	$scope.getMasteries = function() {
		$scope.summoner.masteries = $summoner.getMasteries($scope.summoner.id);
	};
	$scope.getRunes = function() {
		$scope.summoner.runes = $summoner.getRunes($scope.summoner.id);
	};
}]);;app.directive('freeChampRotation', ['$http', function($http) {
	var url = 'https://prod.api.pvp.net/api/lol/euw/v1.1/champion?freeToPlay=true&api_key='+'f54b64a6-7ad9-436a-aaed-e3e250e8630a';
	return {
		templateUrl: 'championRotation/championRotation.html',
		link: function (scope) {
			$http.get(url).then(function (response) {
				scope.champions = angular.fromJson(response.data).champions;
			});
		}
	};
}]);;app.directive('matchHistory', function() {
	return {
		scope: {
			games: '='
		},
		templateUrl: 'matchHistory/matchHistory.html'
	};
});;app.factory('$api', ['$http', function ($http) {
    "use strict";
    var apikey, region, baseUrlv11, baseUrlv21;

    region = 'euw';

    function recalculateURLs() {
        baseUrlv11 = 'https://prod.api.pvp.net/api/lol/' + region + '/v1.1/';
        baseUrlv21 = 'https://prod.api.pvp.net/api/' + region + '/v2.1/';
    }
    recalculateURLs();

    return {
        getv11: function (path) {
            return $http.get(baseUrlv11 + path + '?api_key=' + apikey).then(function (response) {
                return angular.fromJson(response.data);
            });
        },
        getv21: function (path) {
            return $http.get(baseUrlv21 + path + '?api_key=' + apikey).then(function (response) {
                return angular.fromJson(response.data);
            });
        },
        setRegion: function (newRegion) {
            region = newRegion;
            recalculateURLs();
        },
        setApiKey: function (key) {
            apikey = key;
        }
    };
}]);;app.factory('championsData', ['$ddragon', function ($ddragon) {
    "use strict";
    var champsData, idMap;
    idMap = {};
    $ddragon.getLocalized('champion.json').then(function (response) {
        var index;
        champsData = response.data;
        for (index in champsData) {
            if (champsData.hasOwnProperty(index)) {
                idMap[champsData[index].key] = champsData[index];
            }
        }
    });
    return {
        nameFromRaw: function (rawName) {
            return (champsData && champsData[rawName]) ? champsData[rawName].name : rawName;
        },
        nameFromId: function (id) {
            return (idMap && idMap[id]) ? idMap[id].name : id;
        },
        rawNameFromId: function (id) {
            return (idMap && idMap[id]) ? idMap[id].id : id;
        }
    };
}]);
;app.factory('$ddragon', ['$http', function ($http) {
    "use strict";
    var region, language, versionUrl, currentVersion, baseUrl, baseLocalizedUrl;

    function recalulateUrls() {
        baseUrl = 'http://ddragon.leagueoflegends.com/cdn/' + currentVersion + '/';
        baseLocalizedUrl = baseUrl + 'data/' + language + '/';
    }

    function getVersion() {
        versionUrl = 'realms/' + region + '.json';
        $http.get(versionUrl).then(function (response) {
            currentVersion = angular.fromJson(response.data).v;
            recalulateUrls();
        });
    }

    region = 'euw';
    language = 'en_US';

    //This doesn't work as of right now because there is no Access-Control-Allow-Origin defined for this URL
    //Already reported to Riot, will see when I get an answer
    //versionUrl = 'http://ddragon.leagueoflegends.com/realms/'+region+'.json';

    //For now we can just store the file on local server
    versionUrl = 'realms/' + region + '.json';

    currentVersion = '3.15.5';

    recalulateUrls();
    getVersion();

    return {
        get: function (path) {
            return $http.get(baseUrl + path).then(function (response) {
                var parsed = angular.fromJson(response.data);
                return parsed;
            });
        },
        getLocalized: function (path) {
            return $http.get(baseLocalizedUrl + path).then(function (response) {
                var parsed = angular.fromJson(response.data);
                return parsed;
            });
        },
        getBaseUrl: function () {
            return baseUrl;
        },
        setLanguage: function (newLanguage) {
            language = newLanguage;
            recalulateUrls();
        },
        setRegion: function (newRegion) {
            region = newRegion;
            getVersion();
        }
    };

}]);;app.filter('prettyChampName', ['championsData', function (championsData) {
    "use strict";
    return function (rawName) {
        return championsData.nameFromRaw(rawName);
    };
}]);

app.filter('ChampNameFromId', ['championsData', function (championsData) {
    "use strict";
    return function (id) {
        return championsData.nameFromId(id);
    };
}]);

app.filter('RawChampNameFromId', ['championsData', function (championsData) {
    "use strict";
    return function (id) {
        return championsData.rawNameFromId(id);
    };
}]);;app.directive('champIcon', ['$ddragon', function ($ddragon) {
    "use strict";
    return {
        restrict: 'EA',
        scope: {
            'rawName' : '@',
            'width' : '@'
        },
        template: '<img ng-src="{{baseUrl}}img/champion/{{rawName}}.png" width={{width}}>',
        link: function (scope, element, attrs) {
            if (!attrs.width) { attrs.width = 42; }
            scope.baseUrl = $ddragon.getBaseUrl();
        }
    };
}]);;app.factory('$summoner', ['$api', function ($api) {
    "use strict";
    return {
        get: function (summonerName, callback) {
            var summoner = {}, path;
            path = 'summoner/by-name/' + summonerName;
            $api.getv11(path).then(function (response) {
                var key;
                for (key in response) {
                    if (response.hasOwnProperty(key)) {
                        summoner[key] = response[key];
                    }
                }
                if (callback) {
                    callback();
                }
            });
            return summoner;
        },
        getStats: function (summonerId, callback) {
            var stats = [], path;
            path = 'stats/by-summoner/' + summonerId + '/summary';
            $api.getv11(path).then(function (response) {
                var i, responseStats;
                responseStats = response.playerStatSummaries;
                for (i = 0; i < responseStats.length; i += 1) {
                    stats[i] = responseStats[i];
                }
                if (callback) {
                    callback();
                }
            });
            return stats;
        },
        getGameHistory: function (summonerId, callback) {
            var games = [], path;
            path = 'game/by-summoner/' + summonerId + '/recent';
            $api.getv11(path).then(function (response) {
                var i, responseGames;
                responseGames = response.games;
                for (i = 0; i < responseGames.length; i += 1) {
                    games[i] = responseGames[i];
                }
                if (callback) {
                    callback();
                }
            });
            return games;
        },
        getLeague: function (summonerId, callback) {
            var league = [], path;
            path = 'league/by-summoner/' + summonerId;
            $api.getv21(path).then(function (response) {
                var i, responseLeague;
                responseLeague = response[summonerId];
                for (i = 0; i < responseLeague.length; i += 1) {
                    league[i] = responseLeague[i];
                }
                if (callback) {
                    callback();
                }
            });
            return league;
        },
        getMasteries: function (summonerId, callback) {
            var masteryPages = [], path;
            path = 'summoner/' + summonerId + '/masteries';
            $api.getv11(path).then(function (response) {
                var i, responsePages;
                responsePages = response.pages;
                for (i = 0; i < responsePages.length; i += 1) {
                    masteryPages[i] = responsePages[i];
                }
                if (callback) {
                    callback();
                }
            });
            return masteryPages;
        },
        getRunes: function (summonerId, callback) {
            var runePages = [], path;
            path = 'summoner/' + summonerId + '/runes';
            $api.getv11(path).then(function (response) {
                var i, responsePages;
                responsePages = response.pages;
                for (i = 0; i < responsePages.length; i += 1) {
                    runePages[i] = responsePages[i];
                }
                if (callback) {
                    callback();
                }
            });
            return runePages;
        }
    };

}]);;angular.module('leaguespark').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('championRotation/championRotation.html',
    "<div id=freeChamps><span ng-repeat=\"champ in champions\"><champ-icon raw-name={{champ.name}}></champ-icon></span></div>"
  );


  $templateCache.put('matchHistory/matchHistory.html',
    "<div id=matchHistory><span ng-repeat=\"game in games\"><champ-icon raw-name={{game.championId|RawChampNameFromId}}></champ-icon>{{game.championId|ChampNameFromId}}<br></span></div>"
  );

}]);
