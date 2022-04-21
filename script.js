(function() {
  angular.module('app', ['ui.router'])

  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    //if any unmatched url, route it to home state!
    // $urlRouterProvider.otherwise("/home");

    $stateProvider
      .state('register', {
        url: "/register",
        templateUrl: "register.html",
        controller: "kitchenCtrl"
      })
      .state('signin', {
        url: "/signin",
        templateUrl: "signin.html",
        controller: "signInCtrl"
      })
      .state('resetPassword', {
        url: "/resetPassword",
        templateUrl: "resetPassword.html",
        controller: "resetPassCtrl"
      })
      .state('forgotPassword', {
        url: "/forgotPassword",
        templateUrl: "forgotPassword.html",
        controller: "forgotPasswordCtrl"
      })
      .state('home', {
        url: "/home",
        templateUrl: "home.html",
        controller: "homeCtrl"
      })
      .state('daashboard', {
        url: "/dashboard",
        templateUrl: "dashboard.html",
        controller: "dashboardCtrl"
      })
      // .state('kitchen', {
      //   url: "/kitchen",
      //   templateUrl: "kitchen.html",
      //   controller: "kitchenCtrl"
      // })
      .state('den', {
        url: "/denCtrl",
        templateUrl: "den.html",
        controller: "denCtrl"
      })
  }])

  .controller('registerCtrl', ['$scope', function($scope) {
    // console.log("register calling");
    $scope.navigateTo = function () {
      console.log("register calling");
        // var user = {
        //     'firstname': $scope.firstName,
        //     'lastname': $scope.lastName,
        //     'email': $scope.email,
        //     'password': $scope.password,

        // }
        // console.log("register calling", user);

        // serviceRegister.registerUser(user, $scope);
    }
  }])
  .controller('homeCtrl', ['$scope', function($scope) {}])
  // dashboard contorller
  .controller('dashboardCtrl', ['$scope', function($scope) {}])
  // registration controller
  .controller('kitchenCtrl', ['$scope', '$state', '$http', '$location', function ($scope, $state, $http, $location) {
      console.log("register calling");
      $scope.register = function () {
        console.log("register calling");
        var user = {
          'firstName': $scope.firstName,
          'lastName': $scope.lastName,
          'email': $scope.email,
          'password': $scope.password,
          'service': 'advance'
        }
        console.log("register calling", user);
        $http({
          method: 'POST',
          url: 'http://fundoonotes.incubation.bridgelabz.com/api/user/userSignUp',
          data: user

        }).then(
          function successCallback(response) {
            console.log("registration successful");
            console.log(response);
            $scope.message = "registration successful";
            $location.path('/signin');
          },
          function errorCallback(response) {
            console.log("registration  unsuccessful", response);
            $scope.message = response.data.message;
          }
        );

      };
  }])

  // login controller
  .controller('signInCtrl', ['$scope', '$state', '$http', '$location', function ($scope, $state, $http, $location) {
    console.log("signin calling");
    $scope.signinF = function () {
      console.log("signin calling");
      var user = {
        'email': $scope.email,
        'password': $scope.password
      }
      console.log("signin calling", user);
      $http({
        method: 'POST',
        url: 'http://fundoonotes.incubation.bridgelabz.com/api/user/login',
        data: user

      }).then(
        function successCallback(response) {
          console.log("signin successful");
          console.log(response);
          $scope.message = "signin successful";
          $location.path('/dashboard');
        },
        function errorCallback(response) {
          console.log("signin unsuccessful", response);
          $scope.message = response.data.message;
        }
      );

    };
  }])
  
  // resetpassword controller
  .controller('resetPassCtrl', ['$scope', '$state', '$http', '$location', function ($scope, $state, $http, $location) {
    console.log("reset password calling");
    $scope.resetPass = function () {
      console.log("reset password calling");
      var user = {
        'password': $scope.password,
        'repassword': $scope.repassword
      }
      console.log("reset password calling", user);
      $http({
        method: 'POST',
        url: 'http://fundoonotes.incubation.bridgelabz.com/api/user/reset-password',
        data: user

      }).then(
        function successCallback(response) {
          console.log("reset successful");
          console.log(response);
          $scope.message = "reset successful";
          $location.path('/login');
        },
        function errorCallback(response) {
          console.log("reset unsuccessful", response);
          $scope.message = response.data.message;
        }
      );

    };
  }])
  // forgot password controller
  .controller('forgotPasswordCtrl', ['$scope', '$state', '$http', '$location', function ($scope, $state, $http, $location) {
    console.log("forgot password calling");
    $scope.forgotPassF = function () {
      console.log("forgot password calling");
      var user = {
        'email': $scope.email
      }
      console.log("forgot password calling", user);
      $http({
        method: 'POST',
        url: 'http://fundoonotes.incubation.bridgelabz.com/api/user/reset',
        data: user

      }).then(
        function successCallback(response) {
          console.log("forgot password set successful");
          console.log(response);
          $scope.message = "forgot password set successful";
          $location.path('/login');
        },
        function errorCallback(response) {
          console.log("forgot password set unsuccessful", response);
          $scope.message = response.data.message;
        }
      );

    };
  }])
  .controller('denCtrl', ['$scope', function($scope) {}])

})();

