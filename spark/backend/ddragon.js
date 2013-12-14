app.factory('$ddragon', ['$http', function ($http) {
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

}]);