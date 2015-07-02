"use strict";

var exampleApp = angular.module("exampleApp", ["schemaForm"]);

exampleApp.controller("exampleController", ["$scope", function ($scope) {

	// schema definition
	$scope.schema = {
		"type": "object",
		"title": "Comment",
		"properties": {
			"name": {
				"title": "Name",
				"type": "string"
			},
			"email": {
				"title": "Email",
				"type": "string",
				"pattern": "^\\S+@\\S+$",
				"description": "Email will be used for evil."
			},
			"comment": {
				"title": "Comment",
				"type": "string",
				"maxLength": 20,
				"validationMessage": "Don't be greedy!"
			}
		},
		"required": [
			"name",
			"email",
			"comment"
		]
	};

	// Define all UI aspects of the form
	$scope.form = [
		"name",
		"email",
		{
			"key": "adrhome",
			"type": "leafletDraggableMarker"
		},
		{
			"key": "adrjob",
			"type": "leafletDraggableMarker"
		},
		{
			"key": "comment",
			"type": "textarea",
			"placeholder": "Make a comment"
		},
		{
			"type": "submit",
			"style": "btn-info",
			"title": "OK"
		}
	];

	// Initiate the model
	$scope.model = {};

	// This is called by asf on submit, specified in example.html, ng-submit.
	$scope.submitted = function (form) {
		$scope.$broadcast("schemaFormValidate");
		console.log($scope.model);
	};
}]);
