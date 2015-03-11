angular.module('app.controllers', []).
controller('RegisterCtrl', function($scope, $http) {
	$scope.user = {
		username: '',
		email: '',
		firstName: '',
		lastName: '',
		address: '',
		city: '',
		state: '',
		zip: '',
		password: ''
	};

	$scope.register = function(user) {
		console.log('register');
		user.username = user.email;
		$http.post('/auth/local/register', user)
		.success(function(data) {
			console.log(data);
		})
		.error(function(err) {
			console.log(err);
		});
	};
});