angular.module("schemaForm")
	.config(["schemaFormProvider", "schemaFormDecoratorsProvider", function(schemaFormProvider, schemaFormDecoratorsProvider) {
		schemaFormDecoratorsProvider.addMapping(
			"bootstrapDecorator",
			"leafletDraggableMarker",
			"build/leaflet-draggable-marker.html");
		schemaFormDecoratorsProvider.createDirective(
			"leafletDraggableMarker",
			"build/leaflet-draggable-marker.html");
	}])

	.directive('leafletDraggableMarker', ['$timeout', function($timeout) {
		return {
			controller: ['$scope', function($scope) {
				$scope.$watch($scope.form, function() {
					// Form key
					var mapDivId = $scope.form.key[0];
					console.log(mapDivId);

					// Leaflet
					$timeout(function() {
						// Map
						var map = L.map(mapDivId).setView([43.575137,1.406327], 16);
						L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
							attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
						}).addTo(map);

						// Marker
						var marker = L.marker(new L.LatLng(43.575137,1.406327), {
							draggable: true
						});
						marker.bindPopup('This marker is draggable! Move it around.');
						marker.addTo(map);
					});
				});
			}]
		};
	}]);
