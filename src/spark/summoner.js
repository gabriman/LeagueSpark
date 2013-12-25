app.factory('$summoner', ['$api', function ($api) {
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
                var key, responseLeague;
                responseLeague = response[summonerId];
                for (key in responseLeague) {
                    if (responseLeague.hasOwnProperty(key)) {
                        league[key] = responseLeague[key];
                    }
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

}]);