angular.module('leaguespark').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('championRotation/championRotation.html',
    "<div id=freeChamps><span ng-repeat=\"champ in champions\"><champ-icon raw-name={{champ.name}}></champ-icon></span></div>"
  );


  $templateCache.put('matchHistory/matchHistory.html',
    "<div id=matchHistory><span ng-repeat=\"game in games\"><champ-icon raw-name={{game.championId|RawChampNameFromId}}></champ-icon>{{game.championId|ChampNameFromId}}<br></span></div>"
  );

}]);
