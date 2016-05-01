angular.module('starter.controllers', ['starter.services','ngStorage'])

.controller('Ctrl',function($scope,$rootScope,$http,$state,$location,$ionicLoading,$timeout,$ionicHistory,$ionicSideMenuDelegate,ApiEndpoint,$ionicPopup,LoginService){
            
            $scope.len=0;
     // $rootScope.myData = [{"eventname":"Cricket","venue":"ROLLER SKATING COURT","domain":"sports","description":"Cricket is a bat-and-ball game played between two teams of 11 players each on a field at the centre of which is a rectangular 22-yard-long pitch. The game is played by 120 million players in many countries, making it the world's second most popular sport after association football.","date":"2016-04-06","time":"09:30:00","contact":"satish:987056452","image":"http://rajkar.esy.es/yuthopia/images/cric.jpg","show":"False","id":"1"}];
        
        $rootScope.shows =[];
			$scope.items = [];
		//	$scope.noMoreItemsAvailable = false;
			 $rootScope.x=0;
      $rootScope.phonenumber = window.localStorage.getItem("phonenumber");
      $rootScope.username = window.localStorage.getItem("username");
      $rootScope.verified = window.localStorage.getItem("verified");
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
              					$scope.showAlert("Your Phone Number Does not Exist","Authentication Failed");
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

         $scope.registerview = function()
         {
          $location.url('/Side/register');
         } 


          $scope.register=function(user){
             $ionicLoading.show();

                 if(user.phonenumber=='')
                       {
                        $scope.showAlert("Please Enter a Phone number","Error");
                         user.phonenumber="";
                          $ionicLoading.hide();
                       }
                         else {
                        
                          window.localStorage.setItem("phonenumber", user.phonenumber);
                          $rootScope.phonenumber = window.localStorage.getItem("phonenumber");
                                  $http({
                                        method: 'POST',
                                        url: ApiEndpoint.url+ 'register.php',
                                        data:{'phone':user.phonenumber},
                                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                                      }).then(function successCallback(response) {
                                         $ionicLoading.hide();
                                        if (response.data == '0')
                                        {
                                         $scope.showAlert("<center>Your Phone Number is succesfully registered</center>","Success");
                                         $location.url('/otp');
                                        }
                                        else 
                                        {
                                          $scope.showAlert("<center>Your Phone Number is already registered</center>","Failure");
                                          
                                        }
                                               
                                              }, function errorCallback(response) {
                                                $ionicLoading.hide(); 
                                          $scope.showAlert("<center>No Internet Connection</center>","Network Error");
                                        }  ) ;
                               
                             
                        
                                      }
                                    }       
				 
        $scope.events=function()
        {
          alert($scope.len);
          $ionicLoading.show();
          $location.url('/Side/dash');
             $http({
                        method: 'POST',
                        url: ApiEndpoint.url+ 'events.php',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                      }).then(function successCallback(response){
                       $rootScope.myData = response.data.events;
                        $scope.groups = [];
                                for (var i=0; i<=$rootScope.myData.length; i++) {
                                  
                                  $scope.groups[i] = {
                                    name: i,
                                    show: false
                                  };
                                }      
                       $ionicLoading.hide();
                    
                       //$scope.showAlert($scope.myData);
                      },function errorCallback(response) {
                        $ionicLoading.hide();
                          console.log("ERROR");
              $scope.showAlert("<center>No Internet Connection</center>","ERROR");
              
                      });
        }




        
   $scope.noMoreItemsAvailable = false;
       $scope.loadMore = function() {
        $scope.len = $scope.shows.length;
       
        
    $scope.shows.push({time:$rootScope.myData[$scope.len].time,date:$rootScope.myData[$scope.len].date,id:$rootScope.myData[$scope.len].id,eventname:$rootScope.myData[$scope.len].eventname,domain:$rootScope.myData[$scope.len].domain,venue:$rootScope.myData[$scope.len].venue,image:$rootScope.myData[$scope.len].image});
   
    if ( $scope.shows.length == 38 ) {
      $scope.noMoreItemsAvailable = true;

    }
    $scope.$broadcast('scroll.infiniteScrollComplete');
  };




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
          $ionicLoading.show();
             $http({
                        method: 'POST',
                        url: ApiEndpoint.url+ 'guest.php',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                      }).then(function successCallback(response){
                       $scope.Data = response.data.res;
                        $state.go('Side.guest');
                       $ionicLoading.hide();

                       //$scope.showAlert($scope.myData);
                      },function errorCallback(response) {
                        $ionicLoading.hide();
                          console.log("ERROR");
              $scope.showAlert("<center>No Internet Connection</center>","ERROR");
              
                      });
        }
		

          $scope.yourevent=function()
        {

          $ionicLoading.show();
          $state.go('Side.yourevent');
             $http({
                        method: 'POST',
                        url: ApiEndpoint.url+ 'viewsubscribe.php',
                        data:{phone:$rootScope.phonenumber},
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                      }).then(function successCallback(response){
                        $ionicLoading.hide();
                          if(response.data.yevents)
                          {
                            $scope.myData = response.data.yevents;
                            $ionicLoading.hide();
                          }
                          else
                          {
                            $scope.showAlert('<center>'+response.data+'</center>');
                            $state.go('Side.yuthopia', {}, {reload: true}); 
                          }
                      },function errorCallback(response) {
                        $ionicLoading.hide();
                          console.log("ERROR");
              $scope.showAlert("<center>No Internet Connection</center>","ERROR");
              
                      });
        }

        $scope.unsubscribe=function(id)
        {
          $ionicLoading.show();
             $http({
                        method: 'POST',
                        url: ApiEndpoint.url+ 'unsubscribe.php',
                        data:{phone:$rootScope.phonenumber,id:id},
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                      }).then(function successCallback(response){
                        $ionicLoading.hide();
                       $scope.myData = response.data;
                       $scope.showAlert('<center>'+$scope.myData+'</center>');
                       $state.go('Side.yuthopia', {}, {reload: true}); 
                        // $scope.events();
                      },function errorCallback(response) {
                          console.log("ERROR");
                          $ionicLoading.hide();
              $scope.showAlert("<center>No Internet Connection</center>","ERROR");
              
                      });
        }




			
			$scope.logout = function()
			{ 
              window.localStorage.clear();
              $ionicHistory.clearCache();
              $ionicHistory.clearHistory(); 
              window.localStorage.setItem("verified", 0);
              $rootScope.verified= window.localStorage.getItem("verified");
              //$scope.showAlert($rootScope.verified);
              $state.go('Side.yuthopia', {}, {reload: true}); 
              $window.location.reload(true);
				// $http({
    //                     method: 'POST',
    //                     url: ApiEndpoint.url+ 'loggedout/',
    //                     data:{loggedout:1}
    //                   }).then(function successCallback(response) {
    //                      					window.localStorage.setItem("phonenumber", null);
    //                               window.localStorage.setItem("username",null);
    //                               alert(window.localStorage.getItem("phonenumber"));
    //                               alert(window.localStorage.getItem("username"));
                                 
                                  
    //                   }, function errorCallback(response) {
                         
    //                   });
			}
			
		
			$scope.verify = function(n,user) {
				if(n==0)
        {
					
				$http({
                        method: 'POST',
                        url: ApiEndpoint.url+ 'resend.php',
                        data:{session:$rootScope.phonenumber},
                         headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                      }).then(function successCallback(response) {
						         $scope.showAlert("<center>Another OTP will be sent shortly to your registered Phone Number</center>","Success");
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
               window.localStorage.setItem("verified",1);
              $rootScope.verified=window.localStorage.getItem("verified");
              //$scope.showAlert($rootScope.verified);
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
          $ionicLoading.show();
          if ($rootScope.verified == 0)
          {
            $ionicLoading.hide();
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
                         $ionicLoading.hide();
                      $scope.showAlert('<center>'+response.data+'</center>',"SUCCESS");
                      },function errorCallback(response) {
                          console.log("ERROR");
                          $ionicLoading.hide();
                     $scope.showAlert("<center>No Internet Connection</center>","ERROR");
              
                      });


          }
             
        }


     

    
  /*
   * if given group is the selected group, deselect it
   * else, select the given group
   */
  $scope.toggleGroup = function(group) {
    group.show = !group.show;
  };
  $scope.isGroupShown = function(group,name,id) {
  if(name == id)
  {
    return group.show;
  }
  };
  


			$scope.showAlert = function(msg,head) {
   var alertPopup = $ionicPopup.alert({
     title: head,
     template: msg
	 
			});


$timeout(function() {
     alertPopup.close(); 
  }, 5000);
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

  
  
  
  
            })
			.controller('Ctrl1',function($scope,$rootScope,$http,$state,$location,$ionicLoading,$timeout,$ionicHistory,$ionicSideMenuDelegate,ApiEndpoint,$ionicPopup,LoginService){
				
				      $rootScope.myData = [{"eventname":"Cricket","venue":"ROLLER SKATING COURT","domain":"sports","description":"Cricket is a bat-and-ball game played between two teams of 11 players each on a field at the centre of which is a rectangular 22-yard-long pitch. The game is played by 120 million players in many countries, making it the world's second most popular sport after association football.","date":"2016-04-06","time":"09:30:00","contact":"satish:987056452","image":"http://rajkar.esy.es/yuthopia/images/cric.jpg","show":"False","id":"1"}];
				$scope.noMoreItemsAvailable = false;
				 $scope.events=function()
        {
          alert($scope.len);
          $ionicLoading.show();
          $location.url('/Side/dash');
             $http({
                        method: 'POST',
                        url: ApiEndpoint.url+ 'events.php',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                      }).then(function successCallback(response){
                       $rootScope.myData = response.data.events;
                        $scope.groups = [];
                                for (var i=0; i<=$rootScope.myData.length; i++) {
                                  
                                  $scope.groups[i] = {
                                    name: i,
                                    show: false
                                  };
                                }      
                       $ionicLoading.hide();
                    
                       //$scope.showAlert($scope.myData);
                      },function errorCallback(response) {
                        $ionicLoading.hide();
                          console.log("ERROR");
              $scope.showAlert("<center>No Internet Connection</center>","ERROR");
              
                      });
        }
		
		  $scope.noMoreItemsAvailable = false;
       $scope.loadMore = function() {
        $scope.len = $scope.shows.length;
       
        
    $scope.shows.push({time:$rootScope.myData[$scope.len].time,date:$rootScope.myData[$scope.len].date,id:$rootScope.myData[$scope.len].id,eventname:$rootScope.myData[$scope.len].eventname,domain:$rootScope.myData[$scope.len].domain,venue:$rootScope.myData[$scope.len].venue,image:$rootScope.myData[$scope.len].image});
   
    if ( $scope.shows.length == 38 ) {
      $scope.noMoreItemsAvailable = true;

    }
    $scope.$broadcast('scroll.infiniteScrollComplete');
  };
		
				
			})
			
			
			;