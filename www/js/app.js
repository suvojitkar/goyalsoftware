angular.module('starter', ['ionic','starter.controllers','ngCordova','ngStorage'])

.constant('ApiEndpoint',{
        url: 'http://salert.co.in/youthopia/'
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


// .run(function($ionicPlatform,$state,$location) {
//     $ionicPlatform.ready(function(){
//         // Do sweet stuff!
//         alert(window.localStorage.getItem("phonenumber"));
//         if(window.localStorage.getItem("phonenumber") != null)
//         {
//           alert('inside local storage');
//           $state.go('Side.dash');
//         }
//     });
// })

.run(function($ionicPlatform, $ionicPopup) {
  // Disable BACK button on home
  $ionicPlatform.registerBackButtonAction(function(event) {
    if (true) { // your check here
      $ionicPopup.confirm({
        title: 'Warning',
        template: '<center>Are you sure you want to exit?</center>'
      }).then(function(res) {
        if (res) {
          ionic.Platform.exitApp();
        }
      })
    }
  }, 100);
})




.run(function($cordovaSplashscreen,$state) {

  setTimeout(function() {
    $cordovaSplashscreen.hide()
  }, 3000)
  // alert(window.localStorage.getItem("phonenumber"));
    if(window.localStorage.getItem("phonenumber") != null)
        {
          // alert('inside local storage');
          $state.go('Side.yuthopia');
        }
})


.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
            
           
           .state('otp',{
                     url: '/otp',
                     templateUrl:'otp.html',
                     controller:'Ctrl'
                     })

              .state('Side',{
                     cache: false,
                     url: '/Side',
                     templateUrl:'Side.html',
                     abstract: true,
                     controller:'Ctrl'
                     })

              .state('Side.dash',{
                      cache: true,
                     url:'/dash',
                     views: {
                    'appContent' :{
                      templateUrl: 'dash.html',
                      controller : 'Ctrl'
                    }
                    }               
                     })

               .state('Side.eventdesc',{
                      cache: true,
                     url:'/eventdesc',
                     views: {
                    'appContent' :{
                      templateUrl: 'eventdesc.html',
                      controller : 'Ctrl'
                    }
                    }               
                     })
              .state('Side.Page1',{
                     url: '/Page1',
                     views: {
                    'appContent' :{
                      templateUrl: 'Page1.html',
                      controller : 'Ctrl'
                    }
                    }     
                     })

              .state('Side.yuthopia',{
                     url:'/yuthopia',
                     views: {
                    'appContent' :{
                      templateUrl: 'yuthopia.html',
                      controller : 'Ctrl'
                    }
                    }               
                     })

               .state('Side.heritage',{
                     url:'/heritage',
                     views: {
                    'appContent' :{
                      templateUrl: 'heritage.html',
                      controller : 'Ctrl'
                    }
                    }               
                     })

               .state('Side.principal',{
                     url:'/principal',
                     views: {
                    'appContent' :{
                      templateUrl: 'principal.html',
                      controller : 'Ctrl'
                    }
                    }               
                     })

               .state('Side.presedent',{
                     url:'/presedent',
                     views: {
                    'appContent' :{
                      templateUrl: 'presedent.html',
                      controller : 'Ctrl'
                    }
                    }               
                     })


               .state('Side.contactus',{
                     url:'/contactus',
                     views: {
                    'appContent' :{
                      templateUrl: 'contactus.html',
                      controller : 'Ctrl'
                    }
                    }               
                     })

              

               .state('Side.credit',{
                     url:'/credit',
                     views: {
                    'appContent' :{
                      templateUrl: 'credit.html',
                      controller : 'Ctrl'
                    }
                    }               
                     })

                .state('Side.guest',{
                  cache: false,
                     url:'/guest',
                     views: {
                    'appContent' :{
                      templateUrl: 'guest.html',
                      controller : 'Ctrl'
                    }
                    }               
                     })
                .state('Side.yourevent',{
                     cache: false,
                     url:'/yourevent',
                     views: {
                    'appContent' :{
                      templateUrl: 'yourevent.html',
                      controller : 'Ctrl'
                    }
                    }               
                     })
                .state('Side.register',{
                     url:'/register',
                     views: {
                    'appContent' :{
                      templateUrl: 'register.html',
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
                            

 $urlRouterProvider.otherwise('/Side/yuthopia');
    });