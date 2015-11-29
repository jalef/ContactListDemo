angular.module('contactListApp.controllers', [])

.controller("DashCtrl", function($scope, 
      $rootScope, 
      $ionicPlatform, 
      $cordovaBatteryStatus,
      $cordovaDevice,
      $cordovaContacts) {
    $scope.message="Wellcome";
    $scope.contactsCount=0;
    $ionicPlatform.ready(function() {
      $rootScope.$on("$cordovaBatteryStatus:status",
        function(event, args){
          $scope.batteryLevel = args.level;
          $scope.isPluggedIn = args.isPlugged;
      }); 
        //document.addEventListener("deviceready", function () {
    
      $scope.model = $cordovaDevice.getModel();  
      $scope.platform = $cordovaDevice.getPlatform();  
     
      $cordovaContacts.find({filter: ''}).then(function(result) {
          $scope.contactsCount = result.length;
      }, function(error) {
          console.log("ERROR: " + error);
      });
     


      //}, false);         
    });
    
    // $scope.getAllContacts = function() {
    //   $cordovaContacts.find().then(function(allContacts) { 
    //     $scope.contacts = allContacts;
    //   });
    // };
    
    //$cordovaContacts.find().then(function(allContacts) { 
        //$scope.contactsCount=allContacts.length;
        //$scope.contacts = allContacts;
    //});
    
    
})
.controller('ContactsCtrl', 
function($scope, $cordovaContacts) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // $scope.chats = Chats.all();
  // $scope.remove = function(chat) {
  //   Chats.remove(chat);
  // };
 
    $scope.message="Contacts";
    // $scope.contactsCount=0;
     
    // $scope.getContactList = function() {
        $cordovaContacts.find({filter: ''}).then(function(result) {
            $scope.contacts = result;
            $scope.count=result.length;
        }, function(error) {
            console.log("ERROR: " + error);
        }
        )
    // };
})

// .controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
//   $scope.chat = Chats.get($stateParams.chatId);
// })
.controller('SettingsCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
