app.filter('prettyChampName', ['championsData', function (championsData) {
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
}]);