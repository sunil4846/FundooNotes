(function() {
  angular.module('app', ['ui.router','ngMaterial', 'ngMessages'])

  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    //if any unmatched url, route it to home state!
    // $urlRouterProvider.otherwise("/home");

    $stateProvider
      .state('register', {
        url: "/register",
        templateUrl: "register.html",
        controller: "registerCtrl"
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
      .state('dashboard', {
        url: "/dashboard",
        templateUrl: "dashboard.html",
        controller: "dashboardCtrl"
      })
      .state('updateNotes', {
        controller: "DialogController"
      })
      .state('archive', {
        url: "/archive",
        templateUrl: "archive.html",
        controller: "archiveCtrl"
      })
  }])

    .controller('homeCtrl', ['$scope', function($scope) {}])
  
    // dashboard contorller
    .controller('dashboardCtrl', ['$scope','$state','$http','$location','$mdDialog',function ($scope,$state,$http, $location,$mdDialog) {
      console.log('creating notes calling');
      $scope.show = false;
      $scope.note = {
        title:'',
        description:''
      }
      $scope.createNoteSubmit = function(){
        // console.log('something here..',$scope.note);
        var user = {
          'title': $scope.note.title,
          'description': $scope.note.description        
        }
        console.log("creating note", user);
        $http({
          method: 'POST',
          url: 'http://fundoonotes.incubation.bridgelabz.com/api/notes/addNotes',
          headers: {
            'Authorization': localStorage.getItem('token') 
          },
          data: user    
        }).then(
          function successCallback(response) {
            console.log("note created successful");
            console.log(response);
            $scope.message = "note created successful";
            // $location.path('/signin');
          },
          function errorCallback(response) {
            console.log("note not created ", response);
            $scope.message = response.data.message;
          }
        );
      }
      $scope.modalOpen = function () {
        $scope.show = true; 
      };
      // get all notes
      var user = {
        'title': $scope.note.title,
        'description': $scope.note.description        
      }
      console.log("creating note", user);
      $scope.notes = [
        {
          'title': user.title,
          'description': user.description       
        },
        $http({ 
          method: 'GET',
          url: 'http://fundoonotes.incubation.bridgelabz.com/api/notes/getNotesList',
          headers: {
            'Authorization': localStorage.getItem('token') 
          },
          // data: user    
        }).then(
          function successCallback(response) {
            // console.log("get note created successful");
            console.log(response);
            $scope.notesArray = response.data.data.data;
            $scope.notes = $scope.notesArray.filter((item) => {
              console.log(item);
              return item.isArchived === false && item.isDeleted === false;

            })
            console.log($scope.notes);
            // $scope.notes = response.data.data.data;
            console.log($scope.notes);
            $scope.message = "get note created successful";
            // $location.path('/signin');
          },
          function errorCallback(response) {
            console.log("get note not created ", response);
            $scope.message = response.data.message;
          }
        )
      ];
      
      //modal popup 
      $scope.getNoteModalOpen = function(ev,note){
        $scope.user = {
          'title': note.title,
          'description': note.description
        }
        $mdDialog.show({
          controller: 'DialogController',
          templateUrl: 'updatenotes.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true,
          resolve: {
            user: function(){
              return user;
            }
          }
        })
      }

      // archive notes
      $scope.archiveNote = function(note){
        let req = {
          noteIdList: [note.id],
          isArchived: true,
        }
        console.log(req);
        $http({ 
          method: 'POST',
          url: 'http://fundoonotes.incubation.bridgelabz.com/api/notes/archiveNotes',
          headers: {
            'Authorization': localStorage.getItem('token') 
          },          
          data: req    
        }).then(
          function successCallback(response) {
            console.log("note archived successful");
            console.log(response);
            $scope.notes = response.data;
            console.log($scope.notes);
            $scope.message = "note archived successful";
            $location.path('/dashboard');
          },
          function errorCallback(response) {
            console.log("note not archived", response);
            $scope.message = response.data.message;
          }
        )
      }
      //delete Note 
      $scope.deleteNote = function(note){
        // console.log(note);
        let req = {
          noteIdList: [note.id],
          isDeleted: true,
        }
        console.log(req);
        // url:'http://fundoonotes.incubation.bridgelabz.com/api/notes/trashNotes';
        $http({ 
          method: 'POST',
          url: 'http://fundoonotes.incubation.bridgelabz.com/api/notes/trashNotes',
          headers: {
            'Authorization': localStorage.getItem('token') 
          },          
          data: req    
        }).then(
          function successCallback(response) {
            console.log("note deleted successful");
            console.log(response);
            $scope.notes = response.data;
            console.log($scope.notes);
            $scope.message = "note deleted successful";
            $location.path('/dashboard');
          },
          function errorCallback(response) {
            console.log("note not deleted  ", response);
            $scope.message = response.data.message;
          }
        )
      }

      // color palette
      

    }])
    .controller('DialogController',['$scope','$mdDialog', function($scope, $mdDialog) {
      console.log($scope.user);
      $scope.title = user.title;
      $scope.description = user.description;
      $scope.hide = function() {
        $mdDialog.hide();
      };
  
      $scope.cancel = function() {
        $mdDialog.cancel();
      };
  
      $scope.answer = function(answer) {
        $mdDialog.hide(answer);
      };
    }])

  //archive display note
  .controller('archiveCtrl',['$scope','$http', function($scope,$http) {
     // get all archive notes
     var user = {
      'title': $scope.note.title,
      'description': $scope.note.description        
    }
    console.log("creating note", user);
    $scope.archiveNotes = [
      {
        'title': user.title,
        'description': user.description       
      },
      $http({ 
        method: 'GET',
        url: 'http://fundoonotes.incubation.bridgelabz.com/api/notes/getNotesList',
        headers: {
          'Authorization': localStorage.getItem('token') 
        },
        // data: user    
      }).then(
        function successCallback(response) {
          // console.log("get note created successful");
          console.log(response);
          $scope.notesArray = response.data.data.data;
          $scope.notes = $scope.notesArray.filter((item) => {
            console.log(item);
            return item.isArchived === false && item.isDeleted === false;

          })
          console.log($scope.notes);
          // $scope.notes = response.data.data.data;
          $scope.message = "get all archive note created successful";
          // $location.path('/signin');
        },
        function errorCallback(response) {
          console.log("get all archive note not created ", response);
          $scope.message = response.data.message;
        }
      )
    ];
  }]) 
  // registration controller
  .controller('registerCtrl', ['$scope', '$state', '$http', '$location', function ($scope, $state, $http, $location) {
      console.log("register calling");
      $scope.register = function () {
        console.log("register calling");
        var user = {
          'firstName': $scope.firstName,
          'lastName': $scope.lastName,
          'email': $scope.email,
          'password': $scope.password,
          'cPassword': $scope.cPassword,
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
          console.log(response.data.id);
          localStorage.setItem('token',response.data.id);
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

