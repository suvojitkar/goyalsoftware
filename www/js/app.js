angular.module('starter', ['ionic','starter.controllers','ngCordova'])

.constant('ApiEndpoint',{
        url: 'http://localhost:8100/api/'
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
                     controller:'Ctrl'
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
					

              .state('Side.profile',{
                       url:'/profile',
                       views: {
                      'appContent' :{
                        templateUrl: 'profile.html',
                        controller : 'Ctrl'
                      }
                      }               
                     })
              .state('Side.delivery',{
                       url:'/delivery',
                       views: {
                      'appContent' :{
                        templateUrl: 'delivery.html',
                        controller : 'Ctrl'
                      }
                      }               
                     })
              .state('Side.promotion',{
                       url:'/promotion',
                       views: {
                      'appContent' :{
                        templateUrl: 'promotion.html',
                        controller : 'Ctrl'
                      }
                      }               
                     })
              .state('Side.vieworders',{
                       url:'/vieworders',
                       views: {
                      'appContent' :{
                        templateUrl: 'vieworders.html',
                        controller : 'Ctrl'
                      }
                      }               
                     })
              .state('Side.address_details',{
                       url:'/address_details',
                       views: {
                      'appContent' :{
                        templateUrl: 'address_details.html',
                        controller : 'Ctrl'
                      }
                      }               
                     })
                  
             .state('Side.modeofpayment',{
                       url:'/modeofpayment',
                       views: {
                      'appContent' :{
                        templateUrl: 'modeofpayment.html',
                        controller : 'Ctrl'
                      }
                      }               
                     })

              .state('signup',{
                     url: '/signup',
                     templateUrl:'Signup.html',
                     controller:'Ctrl'
                     })
              
              .state('profile',{
                      url:'/profile',
                      templateUrl:'profile.html',
                      comtroller:'Ctrl'
                      })
              .state('delivery',{
                      url:'/delivery',
                      templateUrl:'delivery.html',
                      comtroller:'Ctrl'
                      })
              .state('promotion',{
                      url:'/promotion',
                      templateUrl:'promotion.html',
                      comtroller:'Ctrl'
                      })
              .state('vieworders',{
                      url:'/vieworders',
                      templateUrl:'vieworders.html',
                      comtroller:'Ctrl'
                      })
               .state('address_details',{
                      url:'/address_details',
                      templateUrl:'address_details.html',
                      comtroller:'Ctrl'
                      })
                            

 $urlRouterProvider.otherwise('/Page1');
    });