app.directive('matchHistory', function() {
	return {
		scope: {
			games: '='
		},
		templateUrl: 'matchHistory/matchHistory.html'
	}
});