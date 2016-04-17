angular.module('starter', ['ionic','starter.controllers','ngCordova'])

.constant('ApiEndpoint',{
        url: 'http://rajkar.esy.es/yuthopia/'
     })

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})


.run(function($ionicPlatform,$state,$location) {
    $ionicPlatform.ready(function(){
        // Do sweet stuff!
        alert(window.localStorage.getItem("phonenumber"));
        if(window.localStorage.getItem("phonenumber") != null)
        {
          alert('inside local storage');
          $location.url('/Side/dash');
        }
    });
})

.run(function($ionicPlatform, $ionicPopup) {
  // Disable BACK button on home
  $ionicPlatform.registerBackButtonAction(function(event) {
    if (true) { // your check here
      $ionicPopup.confirm({
        title: 'System warning',
        template: 'are you sure you want to exit?'
      }).then(function(res) {
        if (res) {
          ionic.Platform.exitApp();
        }
      })
    }
  }, 100);
})


.run(function($cordovaSplashscreen) {
  setTimeout(function() {
    $cordovaSplashscreen.hide()
  }, 3000)
})


.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
            .state('Page1',{
                     url: '/Page1',
                     templateUrl:'Page1.html',
                     controller:'Ctrl',
                     })
           
           .state('otp',{
                     url: '/otp',
                     templateUrl:'otp.html',
                     controller:'Ctrl'
                     })

              .state('Side',{
                     url: '/Side',
                     templateUrl:'Side.html',
                     abstract: true,
                     controller:'Ctrl'
                     })

              .state('Side.dash',{
                     url:'/dash',
                     views: {
                    'appContent' :{
                      templateUrl: 'dash.html',
                      controller : 'Ctrl'
                    }
                    }               
                     })
					

              
            
              
              // .state('profile',{
              //         url:'/profile',
              //         templateUrl:'profile.html',
              //         comtroller:'Ctrl'
              //         })
              // .state('delivery',{
              //         url:'/delivery',
              //         templateUrl:'delivery.html',
              //         comtroller:'Ctrl'
              //         })
              // .state('promotion',{
              //         url:'/promotion',
              //         templateUrl:'promotion.html',
              //         comtroller:'Ctrl'
              //         })
              // .state('vieworders',{
              //         url:'/vieworders',
              //         templateUrl:'vieworders.html',
              //         comtroller:'Ctrl'
              //         })
              //  .state('address_details',{
              //         url:'/address_details',
              //         templateUrl:'address_details.html',
              //         comtroller:'Ctrl'
              //         })
                            

 $urlRouterProvider.otherwise('/Page1');
    });