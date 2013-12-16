app.factory('championsData', ['$ddragon', function ($ddragon) {
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
