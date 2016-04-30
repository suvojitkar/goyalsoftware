angular.module('starter.controllers', ['starter.services','ngStorage'])

.controller('Ctrl',function($scope,$rootScope,$http,$state,$location,$ionicLoading,$timeout,$ionicHistory,$ionicSideMenuDelegate,ApiEndpoint,$ionicPopup,LoginService){
            
            $scope.len=0;
			$rootScope.show = [];
			$scope.items = [];
			$scope.noMoreItemsAvailable = false;
			$scope.len=0, $rootScope.x=0;
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
          $ionicLoading.show();
          $location.url('/Side/dash');
             $http({
                        method: 'POST',
                        url: ApiEndpoint.url+ 'events.php',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                      }).then(function successCallback(response){
                       $scope.myData = response.data.events;
                        $scope.groups = [];
                                for (var i=0; i<=20; i++) {
                                  // alert(response.data.events);
                                  $scope.groups[i] = {
                                    name: response.data.events[i].id,
                                    items: ['hello','hello','hello'],
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
                        url: ApiEndpoint.url+ 'events.php',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                      }).then(function successCallback(response){
                       $scope.myData = response.data.events;
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


           // $scope.groups = [];
           //    for (var i=0; i<=0; i++) {
           //      $scope.groups[i] = {
           //        name: i,
           //        items: [],
           //        show: false
           //      }
           //    }
//               $scope.groups = [];
//   for (var i=0; i<10; i++) {
//     if(i==0)
//     {
//     $scope.groups[i] = {
//       name: 'Football',
//       items: ['Number of participants-7+6.','Duration- 30 minutes consisting of two equal halves.','Roll-in substitution allowed.','No offside rules','Separate event for boys and girls.','Dress Code- school football jersey with shorts and football boots, shin guards  and stockings are compulsory','If the match ends in a draw, then direct penalty shootouts will take place.','Referee’s decision is final.','If fewer teams are participating then league and knockout format will be followed else knockout format will be followed.'],
//       show: false
//     };
//   }
//   else if (i == 1)
//   {
//     $scope.groups[i] = {
//       name: 'Basketball',
//       items: ['Number of participants-5+3.','Duration- 20 minutes consisting of two equal halves.','Jerseys should have a clear numbering on the back as well as in the front.','Separate event for boys and girls.','The kit number should be from 4 to 15. Players without the mentioned jersey.','number will not be allowed.','The same jersey number should be maintained throughout the tournament.','Roll-in substitution allowed.'],
//       show: false
//     };
//   }
//    else if (i == 2)
//   {
//     $scope.groups[i] = {
//       name: 'Cricket',
//       items: ['Number of participants-6+1 (rolling substitute) +1 (in case of injury).','Each innings will be of 4 overs.','The event will be only for boys.','The whole team must be wearing the same uniform.','Other details will be given on the spot.'],
//       show: false
//     };
//   }
//    else if (i == 3)
//   {
//     $scope.groups[i] = {
//       name: 'Tug of War',
//       items: ['Number of participants: 10+2','Participants need to wear their school sports uniforms.','Other rules to be explained on the spot.'],
//       show: false
//     };
//   }
//    else if (i == 4)
//   {
//     $scope.groups[i] = {
//       name: 'Table Tennis',
//       items: ['Number of participants – 3 (2 singles, 1 doubles pair).','No individual matches. All matches are played in ‘teams’.','Matches will be of 11 points.','All rules and regulations of TTFI to be followed.','Separate events for boys and girls.','Only the finals will be of a best-of- five match (4 singles and 1 double).'],
//       show: false
//     };
//   }
//    else if (i == 5)
//   {
//     $scope.groups[i] = {
//       name: 'Lawn Tennis',
//       items: ['Number of participants- 2 + 1(reserved)','Participants are to bring their own kit.','Matches will be of one set each.','Sets will be played on the basis of 6 all tiebreakers.','2 single matches will be played','In case of a tie, a doubles match will be played as a decider','Separate events for boys and girls.'],
//       show: false
//     };
//   }
//    else if (i == 6)
//   {
//     $scope.groups[i] = {
//       name: 'Volleyball',
//       items: ['Number of participants-6+3.','Matches will be on knock out basis.','Boys: Set length 25 points.','Girls: Set length 15 points.','Winning team must have a lead of 2 points or else the match will continue (incase of tie).',

// 'Dress code- School sports jersey.'],
//       show: false
//     };
//   }
//    else if (i == 7)
//   {
//     $scope.groups[i] = {
//       name: 'Triathlon',
//       items: ['Number of participants-1.','This event consists of the activities of cycling, swimming and running.','The event starts off with cycling, followed by running, and ends withswimming.','Cycling – 800m for boys &amp; girls','Running – 600m for boys &amp; 400m for girls','Swimming – 50m for boys &amp; 25m for girls','A total of 8 participants will qualify after the prelims are done.','The finals will be held on the third day of the fest.','Event to be held separately for boys and girls.'],
//       show: false
//     };
//   }
//    else if (i == 8)
//   {
//     $scope.groups[i] = {
//       name: 'Chess',
//       items: ['Number of participants- 1','15 minute each for a maximum of 5 rounds.','All other laws of FIDE will be applied.','There will only be one combined tournament for boys &amp; girls','Participants must be in their school uniform and must carry their school id card'],
//       show: false
//     };
//   }
//    else if (i == 9)
//   {
//     $scope.groups[i] = {
//       name: 'Archery',
//       items: ['Number of participants- 2.','Matches will be on knock out basis.','Separate event or boys and girls.','It will be a 10-meter distance competition.','It will be a 3 round competition.','In each round, everybody will shoot 3 arrows within 2 minutes.','One round will be considered for trials (boys and girls).','Referee’s decision shall be final.'],
//       show: false
//     };
//   }
//   }

    
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
  
  $scope.loadMore = function() {
	  
	  for($scope.i = $rootScope.x;($scope.i<=($rootScope.x+5)) && ($rootScope.x<$scope.len);$scope.i++)
	  
    $rootScope.show.push({ id: $scope.i,p_id:$scope.items($scope.i).id,name:$scope.items($scope.i).name,price:$scope.items($scope.i).price,image:''});
   
    if ($scope.items.length == $scope.len) {
      $scope.noMoreItemsAvailable = true;
    }
    $scope.$broadcast('scroll.infiniteScrollComplete');
	  
  };
  
  
  
  
            });