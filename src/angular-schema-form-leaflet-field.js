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
					// Default values
					if($scope.form.markLat && $scope.form.markLng && !$scope.form.mapLat && !$scope.form.mapLng) {
						$scope.form.mapLat = $scope.form.markLat;
						$scope.form.mapLng = $scope.form.markLng;
					} else if($scope.form.mapLat && $scope.form.mapLng && !$scope.form.markLat && !$scope.form.markLng) {
						$scope.form.markLat = $scope.form.mapLat;
						$scope.form.markLng = $scope.form.mapLng;
					}
					if(!$scope.form.mapLat) { $scope.form.mapLat = 43.575137; }
					if(!$scope.form.mapLng) { $scope.form.mapLng = 1.406327; }
					if(!$scope.form.mapZoom) { $scope.form.mapZoom = 16; }
					if(!$scope.form.mapUrl) { $scope.form.mapUrl = "http://{s}.tile.osm.org/{z}/{x}/{y}.png"; }
					if(!$scope.form.mapAttr) { $scope.form.mapAttr = "&copy; <a href=\"http://osm.org/copyright\">OpenStreetMap</a> contributors"; }
					if(!$scope.form.markLat) { $scope.form.markLat = 43.575137; }
					if(!$scope.form.markLng) { $scope.form.markLng = 1.406327; }
					if(!$scope.form.markMsg) { $scope.form.markMsg = "This marker is draggable! Move it around."; }

					// Form key
					var mapDivId = $scope.form.key[0];
					console.log(mapDivId);

					// Leaflet
					$timeout(function() {
						// Map
						var map = L.map(mapDivId).setView([$scope.form.mapLat,$scope.form.mapLng], $scope.form.mapZoom);
						L.tileLayer($scope.form.mapUrl, {
							attribution: $scope.form.mapAttr
						}).addTo(map);

						// Marker
						var marker = L.marker(new L.LatLng($scope.form.markLat,$scope.form.markLng), {
							draggable: true
						});
						marker.bindPopup($scope.form.markMsg);
						marker.addTo(map);

						// Default model
						$scope.model[mapDivId] = marker.getLatLng();

						// Event
						marker.on('dragend', function(e) {
							$scope.model[mapDivId] = this.getLatLng();
						});
					});
				});
			}]
		};
	}]);
