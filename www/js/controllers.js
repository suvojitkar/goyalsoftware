angular.module('starter.controllers', ['starter.services','ngStorage'])

.controller('Ctrl',function($scope,$rootScope,$http,$state,$location,$ionicLoading,$timeout,$ionicHistory,$ionicSideMenuDelegate,ApiEndpoint,$ionicPopup,LoginService){
            
            $scope.len=0;
			$rootScope.show = [];
			$scope.items = [];
			$scope.noMoreItemsAvailable = false;
			$scope.len=0, $rootScope.x=0;
      $rootScope.phonenumber = window.localStorage.getItem("phonenumber");
      $rootScope.username = window.localStorage.getItem("username");
      // $scope.session = function() {
      //   if($rootScope.phonenumber != undefined)
      //   {
      //     alert($rootScope.phonenumber);
      //     $state.go('/Side/dash');
      //     return 'true';        }

      //     else {
      //       return 'false';
      //     }

      // }

      // $scope.session();
            $scope.submit=function(user){


                 if(user.phonenumber=='')
              				 {
              					 $scope.showAlert("Field Empty!","Error");
              					 user.phonenumber="";
              				 }
                				 else {
                					$ionicLoading.show();

                                  $http({
                                        method: 'POST',
                                        url: ApiEndpoint.url+ 'login.php',
                                        data:{'phone':user.phonenumber},
                                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                                      }).then(function successCallback(response) {
                                        // alert(response.data.result[0].name);
                                        $ionicLoading.hide(); 
                                        if (response.data == '0')
                                        {
                                         $scope.showAlert("Your Phone Number Does not Exist","Authentication Failed");
                                        }
                                        else 
                                        {

                                          // LoginService.loginUser(response.data.result[0].phonenumber).success(function(data) {
                                          //     $state.go('Side.dash');

                                          // }).error(function(data) {
                                          //     var alertPopup = $ionicPopup.alert({
                                          //         title: 'Login failed!',
                                          //         template: 'Please check your credentials!'
                                          //     });
                                          // });
                                          // $rootScope.session = response.data;
                                          window.localStorage.setItem("phonenumber", response.data.result[0].phonenumber);
                                          window.localStorage.setItem("username", response.data.result[0].name);
                                          $rootScope.phonenumber = window.localStorage.getItem("phonenumber");
                                          $rootScope.username = window.localStorage.getItem("username");
                                          $location.url('/otp');
                                        }
                                               
                                              }, function errorCallback(response) {
                                                $ionicLoading.hide(); 
                                          $scope.showAlert("<center>No Internet Connection</center>","Network Error");
                                        }  ) ;
                               
                						 
                				
                                      }
                                    }

                      /*, function errorCallback(response) {
						  $scope.showAlert("Error during login!","Internal Error");
						  user.password='';
                         
						 });*/
				 
        $scope.events=function()
        {
             $http({
                        method: 'POST',
                        url: ApiEndpoint.url+ 'events.php',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                      }).then(function successCallback(response){
                       $scope.myData = response.data.events;
                       $location.url('/Side/dash');
                       //$scope.showAlert($scope.myData);
                      },function errorCallback(response) {
                          console.log("ERROR");
              $scope.showAlert("<center>No Internet Connection</center>","ERROR");
              
                      });
        }

         $scope.email=function(user)
        {
          $http({
                        method: 'POST',
                        url: ApiEndpoint.url+ 'email.php',
                        data:{name:$rootScope.username, phone:$rootScope.phonenumber, query:user.query},
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                      }).then(function successCallback(response){
                      
                       $scope.showAlert("<center>Your query is submitted successfully","Thank You");
                      },function errorCallback(response) {
                          console.log("ERROR");
              $scope.showAlert("<center>No Internet Connection</center>","ERROR");
              
                      });
        }



         $scope.guest=function()
        {
             $http({
                        method: 'POST',
                        url: ApiEndpoint.url+ 'events.php',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                      }).then(function successCallback(response){
                       $scope.myData = response.data.events;
                       //$scope.showAlert($scope.myData);
                      },function errorCallback(response) {
                          console.log("ERROR");
              $scope.showAlert("<center>No Internet Connection</center>","ERROR");
              
                      });
        }




			
			$scope.logout = function()
			{
              window.localStorage.clear();
              $state.go('Side.yuthopia', {}, {reload: true}); 
              $window.location.reload(true);
              $ionicHistory.clearCache();
              $ionicHistory.clearHistory(); 
				
			}
			
		
			$scope.verify = function(n,user) {
				if(n==0)
        {
					$scope.showAlert("Another OTP will be sent shortly to your registered email id","Resend");
				$http({
                        method: 'POST',
                        url: ApiEndpoint.url+ 'checkotp.php',
                        data:{verify:n, session:$rootScope.phonenumber},
                         headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                      }).then(function successCallback(response) {
						  if(response.data == "true")
						  {
							  $location.url("/yuthopia");
						  }
                      }, function errorCallback(response) {
                          console.log("ERROR");
						  $scope.showAlert("<center>No Internet Connection</center>","ERROR");
						  
                      });

            }
            else
            {
              $ionicLoading.show();
              $http({
                        method: 'POST',
                        url: ApiEndpoint.url+ 'checkotp.php',
                        data:{otp:user.otp, verify:n,session:$rootScope.phonenumber}
                      }).then(function successCallback(response) {
              if(response.data == "true")
              {
                $scope.showAlert("<center>Verified successfully!</center>","Success");
                $location.url("/Side/yuthopia");
                $ionicLoading.hide();
              }
              else if(response.data == "false")
              {
                $scope.showAlert("<center>Invalid OTP</center>","ERROR");
                user.otp = "";
                 $ionicLoading.hide();
              }
          
                      }, function errorCallback(response) {
                          console.log("ERROR");
              $scope.showAlert("<center>No Internet Connection</center>","ERROR");
              $ionicLoading.hide();
                      });

            }
			}


       $scope.subscribe=function(id)
        {

          if ($rootScope.username == null)
          {
             $scope.showAlert("<center>Please Login</center>","INFO");
          }
          else 
          {
             $http({
                        method: 'POST',
                        url: ApiEndpoint.url+ 'subscribe.php',
                        data:{eventid: id, username: $rootScope.username, phonenumber: $rootScope.phonenumber},
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                      }).then(function successCallback(response){
                      $scope.showAlert('<center>'+response.data+'</center>',"SUCCESS");
                      },function errorCallback(response) {
                          console.log("ERROR");
                     $scope.showAlert("<center>No Internet Connection</center>","ERROR");
              
                      });


          }
             // $http({
             //            method: 'POST',
             //            url: ApiEndpoint.url+ 'events.php',
             //            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
             //          }).then(function successCallback(response){
             //           $scope.myData = response.data.events;

             //           //$scope.showAlert($scope.myData);
             //          },function errorCallback(response) {
             //              console.log("ERROR");
             //  $scope.showAlert("<center>No Internet Connection</center>","ERROR");
              
             //          });
        }





			$scope.showAlert = function(msg,head) {
   var alertPopup = $ionicPopup.alert({
     title: head,
     template: msg
	 
			});
$timeout(function() {
     alertPopup.close(); 
  }, 3000);
 			}
			$scope.hide = function(){
    $ionicLoading.hide();
  };
  
      $scope.save=function() {
      alert("Saved!");
      $location.url('/Side/dash');
      } 

      $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  })

   $timeout(function () {
   $ionicLoading.hide();},1000)

  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  }

  $scope.signup_redirect = function(){
     $location.url('/signup');
  }
  
  $scope.loadMore = function() {
	  
	  for($scope.i = $rootScope.x;($scope.i<=($rootScope.x+5)) && ($rootScope.x<$scope.len);$scope.i++)
	  
    $rootScope.show.push({ id: $scope.i,p_id:$scope.items($scope.i).id,name:$scope.items($scope.i).name,price:$scope.items($scope.i).price,image:''});
   
    if ($scope.items.length == $scope.len) {
      $scope.noMoreItemsAvailable = true;
    }
    $scope.$broadcast('scroll.infiniteScrollComplete');
	  
  };
  
  
  
  
            });