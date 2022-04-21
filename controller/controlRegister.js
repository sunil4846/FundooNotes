app.controller('controlRegister', function ($scope, serviceRegister) {
    // console.log("rtfrey",serviceRegister)
    console.log("register calling");
    $scope.register = function () {
        console.log("register calling");

        var user = {
            'firstname': $scope.firstName,
            'lastname': $scope.lastName,
            'email': $scope.email,
            'password': $scope.password,

        }
        console.log("register calling", user);

        serviceRegister.registerUser(user, $scope);
    }
});