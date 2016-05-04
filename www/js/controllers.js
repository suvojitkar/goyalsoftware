angular.module('starter.controllers', ['starter.services','ngStorage'])

.controller('Ctrl',function($scope,$rootScope,$http,$state,$location,$ionicLoading,$timeout,$ionicHistory,$ionicSideMenuDelegate,ApiEndpoint,$ionicPopup,LoginService){
            
            $scope.len=0;
      $rootScope.myData = [{"eventname":"Cricket","venue":"ROLLER SKATING COURT","domain":"sports","date":"2016-05-07","time":"09:30:00","image":"http://rajkar.esy.es/yuthopia/images/cric.jpg","id":"1"},{"eventname":"Foootball","venue":"FIELD","domain":"sports","date":"2016-05-06","time":"10:30:00","image":"http://rajkar.esy.es/yuthopia/images/foot.jpg","id":"2"},{"eventname":"Basketball","venue":"BASKETBALL COURT","domain":"Sports","date":"2016-05-07","time":"11:00:00","image":"http://www.atownrebels.com/wp-content/uploads/2015/06/photo_basketball.jpg","id":"3"},{"eventname":"Tug of War","venue":"FIELD","domain":"Sports","date":"2016-05-06","time":"10:30:00","image":"http://tse4.mm.bing.net/th?id=OIP.M3d57b089e2dca2146d37284750b1c4dao0&w=223&h=148&c=7&rs=1&qlt=90&o=4&pid=1.1","id":"4"},{"eventname":"Table Tennis","venue":"TABLE TENNIS/GYM ROOM","domain":"Sports","date":"2016-05-06","time":"11:00:00","image":"http://tse3.mm.bing.net/th?id=OIP.M34dfac489ae670869f85c998d77f58acH0&w=201&h=135&c=7&rs=1&qlt=90&o=4&pid=1.1","id":"5"},{"eventname":"Lawn Tennis","venue":"LAWN TENNIS COURT","domain":"Sports","date":"2016-05-06","time":"11:00:00","image":"http://tse4.mm.bing.net/th?id=OIP.M7a09c8d4bdf08d05101969b140976a85H0&w=203&h=152&c=7&rs=1&qlt=90&o=4&pid=1.1","id":"6"},{"eventname":"Volleyball","venue":"COLLEGE FIELD","domain":"Sports","date":"2016-06-07","time":"09:30:00","image":"http://tse1.mm.bing.net/th?&id=OIP.M944193bc991222a565f5f3cdbaebec31H0&w=299&h=199&c=0&pid=1.9&rs=0&p=0&r=0","id":"7"},{"eventname":"Triathlon","venue":"GATE NO. 3","domain":"Sports","date":"2016-05-08","time":"09:30:00","image":"http://tse1.mm.bing.net/th?id=OIP.M0ac03117b9303270a403b2bd1fefdf1eH0&w=114&h=100&c=7&rs=1&qlt=90&pid=3.1&rm=2","id":"8"},{"eventname":"Chess","venue":"GYM ROOM","domain":"Sports","date":"2016-05-07","time":"09:30:00","image":"http://tse1.mm.bing.net/th?id=A4a0b7763b7b7c493c74caae809fe3a9f&w=182&h=183&c=7&rs=1&qlt=90&pid=3.1&rm=2","id":"9"},{"eventname":"Archery","venue":"FIELD","domain":"Sports","date":"2016-04-13","time":"11:00:00","image":"http://tse1.mm.bing.net/th?id=OIP.M67d885233519148cafe34cdda90f2eb6H0&w=128&h=96&c=7&rs=1&qlt=90&pid=3.1&rm=2","id":"10"},{"eventname":"Hammered","venue":"AUDITORIUM","domain":"On stage","date":"2016-05-08","time":"09:30:00","image":"http://rajkar.esy.es/yuthopia/images/Hammered.jpg","id":"11"},{"eventname":"Just a Minute","venue":"AUDITORIUM","domain":"On stage","date":"2016-05-06","time":"10:30:00","image":"http://rajkar.esy.es/yuthopia/images/just-a-minute.jpg","id":"12"},{"eventname":"Ad Spoof","venue":"AUDITORIUM","domain":"On stage","date":"2016-05-06","time":"11:30:00","image":"http://rajkar.esy.es/yuthopia/images/AdSpoof.jpg","id":"13"},{"eventname":"Quiz","venue":"AV ROOM","domain":"On stage","date":"2016-05-06","time":"12:30:00","image":"http://rajkar.esy.es/yuthopia/images/Quiz.jpg","id":"14"},{"eventname":"Dance","venue":"AUDITORIUM","domain":"On stage","date":"2016-05-07","time":"15:00:00","image":"http://rajkar.esy.es/yuthopia/images/Dance.jpg","id":"15"},{"eventname":"Fashion Show","venue":"AUDITORIUM","domain":"On stage","date":"2016-05-08","time":"11:00:00","image":"http://rajkar.esy.es/yuthopia/images/fashionshow.jpg","id":"16"},{"eventname":"Western Band","venue":"AUDITORIUM","domain":"On stage","date":"2016-05-07","time":"11:00:00","image":"http://rajkar.esy.es/yuthopia/images/Western-Band.jpg","id":"17"},{"eventname":"War of the DJs","venue":"AUDITORIUM","domain":"On stage","date":"2016-05-08","time":"14:00:00","image":"http://rajkar.esy.es/yuthopia/images/War-of-the-djs.jpg","id":"18"},{"eventname":"Stand Up Comedy","venue":"AV ROOM","domain":"On stage","date":"2016-05-07","time":"12:00:00","image":"http://rajkar.esy.es/yuthopia/images/stand-up-comedy.jpg","id":"19"},{"eventname":"NGO Event","venue":"AUDITORIUM","domain":"On stage","date":"2016-05-07","time":"09:15:00","image":"http://rajkar.esy.es/yuthopia/images/ngo.jpg","id":"20"},{"eventname":"Slam Poetry","venue":"PHYSICS LAB","domain":"On stage","date":"2016-05-06","time":"10:30:00","image":"http://rajkar.esy.es/yuthopia/images/Slam Poetry.jpg","id":"21"},{"eventname":"Debate","venue":"HIT-A SEMINAR HALL","domain":"On stage","date":"2016-05-07","time":"12:00:00","image":"http://rajkar.esy.es/yuthopia/images/Debate.jpg","id":"22"},{"eventname":"Pretentious Movie Reviews","venue":"AUDITORIUM","domain":"On stage","date":"2016-05-06","time":"14:15:00","image":"http://rajkar.esy.es/yuthopia/images/Pretentious-movie-reviews.jpg\t","id":"23"},{"eventname":"Comic Strip Designing","venue":"BIOLOGY LAB","domain":"Off stage","date":"2016-05-07","time":"11:00:00","image":"http://rajkar.esy.es/yuthopia/images/Comicstripdesigning.jpg","id":"24"},{"eventname":"Creative Writing","venue":"COMPUTER LAB","domain":"Off stage","date":"2016-05-06","time":"10:30:00","image":"http://tse2.mm.bing.net/th?id=OIP.M6af296c74057ff822379b7e4ea42be06H0&w=152&h=149&c=7&rs=1&qlt=90&o=4&pid=1.1","id":"25"},{"eventname":"Counter Strike Global Offensive and FIFA","venue":"COMPUTER LAB","domain":"Off stage","date":"2016-04-01","time":"11:00:00","image":"http://rajkar.esy.es/yuthopia/images/Counterstrikeandfifa.jpg","id":"26"},{"eventname":"Video Making","venue":"ACTIVITY BRIDGE","domain":"Off stage","date":"2016-05-06","time":"10:30:00","image":"http://rajkar.esy.es/yuthopia/images/videography.jpg","id":"27"},{"eventname":"Graffiti","venue":"ACTIVITY FOYER","domain":"Off stage","date":"2016-04-08","time":"10:30:00","image":"http://rajkar.esy.es/yuthopia/images/graffiti.jpg","id":"28"},{"eventname":"Fireless Cooking","venue":"HOME SCIENCE LAB","domain":"Off stage","date":"2016-05-07","time":"10:00:00","image":"http://rajkar.esy.es/yuthopia/images/Fireless-cooking.jpg","id":"29"},{"eventname":"Photography","venue":"ACTIVITY BRIDGE","domain":"Off stage","date":"2016-05-06","time":"10:30:00","image":"http://rajkar.esy.es/yuthopia/images/Photography.jpg","id":"30"},{"eventname":"Treasure Hunt","venue":"SENIOR SCHOOL LIBRARY","domain":"Off stage","date":"2016-04-07","time":"12:30:00","image":"http://rajkar.esy.es/yuthopia/images/Treasure-Hunt.jpg","id":"31"},{"eventname":"Rubik's Mania","venue":"COMPUTER LAB","domain":"Offstage","date":"2016-05-06","time":"11:30:00","image":"http://rajkar.esy.es/yuthopia/images/rubiks-cube.jpeg","id":"32"},{"eventname":"Water Polo","venue":"ANKUR SWIMMING POOL","domain":"Off stage","date":"2016-05-06","time":"11:00:00","image":"http://rajkar.esy.es/yuthopia/images/Water-polo.jpg","id":"33"},{"eventname":"Laser Tag","venue":"IB BUILDING","domain":"Off stage","date":"2016-04-01","time":"12:00:00","image":"http://rajkar.esy.es/yuthopia/images/Laser-tAG.jpg","id":"34"},{"eventname":"9-ball Pool","venue":"QUADRANGLE","domain":"Off stage","date":"2016-05-06","time":"11:00:00","image":"http://rajkar.esy.es/yuthopia/images/Pool.jpg","id":"35"},{"eventname":"Taekwondo","venue":"MARTIAL ARTS ROOM","domain":"Off stage","date":"2016-05-07","time":"09:30:00","image":"http://rajkar.esy.es/yuthopia/images/TAEKWONDO.jpg","id":"36"},{"eventname":"Archery","venue":"FIELD","domain":"Off stage","date":"2016-05-06","time":"11:00:00","image":"http://tse1.mm.bing.net/th?id=OIP.M67d885233519148cafe34cdda90f2eb6H0&w=128&h=96&c=7&rs=1&qlt=90&pid=3.1&rm=2","id":"37"},{"eventname":"Chess","venue":"GYM ROOM","domain":"Off stage","date":"2016-05-06","time":"09:30:00","image":"http://tse1.mm.bing.net/th?id=A4a0b7763b7b7c493c74caae809fe3a9f&w=182&h=183&c=7&rs=1&qlt=90&pid=3.1&rm=2","id":"38"}];
        
        $rootScope.shows =[];
			$scope.items = [];
			$scope.noMoreItemsAvailable = false;
			$scope.len=0, $rootScope.x=0;
      $rootScope.phonenumber = window.localStorage.getItem("phonenumber");
      $rootScope.username = window.localStorage.getItem("username");
      $rootScope.verified = window.localStorage.getItem("verified");
     
            $scope.submit=function(user){


                 if(user.phonenumber=='')
              				 {
              					$scope.showAlert("Please Enter a Valid Number","Authentication Failed");
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
                                         $scope.showAlert("Your Phone Number Is Not Registered","Authentication Failed");
                                        }
                                        else 
                                        {

                                       
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
                        url: ApiEndpoint.url+ 'eventname.php',
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
       

        $scope.eventdesc=function(id)
        {
          $ionicLoading.show();
          $location.url('/Side/eventdesc');
   


                        $http({
                        method: 'POST',
                        url: ApiEndpoint.url+ 'eventdesc.php',
                        data:{"eventid":id},
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                      }).then(function successCallback(response){
                       $rootScope.Data = response.data.events;
                       $rootScope.eventdetails = response.data.details;

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

          if(user.phone == '' || user.phone== null)
          {
                $scope.showAlert("<center>Enter your mobile number","Info");
          }
          else
          {
          $http({
                        method: 'POST',
                        url: ApiEndpoint.url+ 'email.php',
                        data:{name:$rootScope.username, phonenumber:user.phone, query:user.query},
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                      }).then(function successCallback(response){
                      
                       $scope.showAlert("<center>Your query is submitted successfully","Thank You");
                      },function errorCallback(response) {
                          console.log("ERROR");
              $scope.showAlert("<center>No Internet Connection</center>","ERROR");
              
                      });
        }
      }



         $scope.guest=function()
        {
          $ionicLoading.show();
             $http({
                        method: 'POST',
                        url: ApiEndpoint.url+ 'guest.php',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                      }).then(function successCallback(response){
                       $scope.guestData = response.data.res;
                        $state.go('Side.guest');
                       $ionicLoading.hide();
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
                            $scope.myyoureventData = response.data.yevents;
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
              $state.go('Side.yuthopia', {}, {reload: true}); 
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
          if ($rootScope.verified == 0 || $rootScope.verified == null)
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

  
  
  
  
            });