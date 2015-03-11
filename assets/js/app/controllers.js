angular.module('app.controllers', ['angularFileUpload'])
.controller('HomeCtrl', function($scope, $upload) {
	$scope.upload = function(files) {
		console.log(files);
		$upload.upload({
			url: '/upload/index',
			method: 'POST',
			data: {}, // Any data needed to be submitted along with the files
			file: files
		});
	};
});