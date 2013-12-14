app.directive('champIcon', ['$ddragon', function($ddragon) {
	return {
		restrict: 'EA',
		scope: {
            'rawName' : '@',
            'width' : '@'
        },
		template: '<img ng-src="{{baseUrl}}img/champion/{{rawName}}.png" width={{width}}>',
		link: function(scope, element, attrs) {
			if (!attrs.width) { attrs.width = 42; }
			scope.baseUrl = $ddragon.getBaseUrl();
		}
	}
}]);