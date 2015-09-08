var app = angular.module("scheduleTraining", []);
app.config(['$locationProvider', function ($locationProvider) {
  $locationProvider.html5Mode(true);
    }]);

app.directive("googleAuthenticator", function () {
  return {
    restrict: 'E',
    templateUrl: 'authenticator.html',
    controller: ['$http', '$location', function ($http, $location) {

      /*--- Google OAuth---*/
      var OAUTHURL = 'https://accounts.google.com/o/oauth2/auth?';
      var VALIDURL = 'https://www.googleapis.com/oauth2/v1/tokeninfo?';
      var SCOPE = 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar';
      var CLIENTID = '301485528711-d5i8eupg3ujg3la01ari9pshrciv9b6a.apps.googleusercontent.com';
      var REDIRECT = 'http://mcdonnellteach.com/training/index.html?'
      var LOGOUT = 'http://accounts.google.com/Logout';
      var TYPE = 'token';
      var params = {};
      var token;

      this.authenticated;
      var that = this
      this.validateToken = function validateToken(token) {
        $http.get(VALIDURL + 'access_token=' + token).success(function (resp) {
          console.log(resp);
          that.authenticated = true;
        });
      }

      if ($location.hash()) {
        var queryString = location.hash.substring(1),
          regex = /([^&=]+)=([^&]*)/g,
          m;
        while (m = regex.exec(queryString)) {
          params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
        }
        console.log(params);
        token = params.access_token;
        this.validateToken(params.access_token);
      }

      this.tokenType = params.token_type;
      this.expiresIn = params.expires_in;
      this.user;
      this._url = OAUTHURL + 'scope=' + SCOPE + '&client_id=' + CLIENTID + '&redirect_uri=' + REDIRECT + '&response_type=' + TYPE;


      this.logout = function () {
        that.authenticated = false;
        $('#myAuth').attr('src', LOGOUT);
        myIFrame.location = 'https://www.google.com/accounts/Logout';
        //$location.search('token');
      };
    }],
    controllerAs: 'authenticator'
  };
});

app.directive("scheduleForm", function () {
  return {
    restrict: 'E',
    templateUrl: 'scheduleForm.html',
    controller: function () {
      this.scheduleMeeting = function () {
        //function to schedule with GoToMeeting
      };
      this.submit = function () {
        //function to 
      };
    },
    controllerAs: 'schedule'
  };
});