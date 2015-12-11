angular.module('contactListApp.controllers', [])

.controller("DashCtrl", function($scope, 
      $rootScope, 
      $ionicPlatform, 
      $cordovaBatteryStatus,
      $cordovaDevice,
      $cordovaContacts,
      $localstorage) {
     
    var tempLocalstorage=$localstorage.get('firstName');
    console.log("logged");
    $scope.firstName=(tempLocalstorage?
        tempLocalstorage:
        "Guest");
        
    tempLocalstorage=$localstorage.get('bgColor');
    $scope.bgColor=(tempLocalstorage?    
       tempLocalstorage:
       "white" );
    
    $scope.refreshSettings=function() {
      $scope.firstName= $localstorage.get('firstName');
    }
    
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
      
      $cordovaContacts.contacts.find({hasPhoneNumber:true}).then(function(result) {
          $scope.contactsCount = result.length;     
      }, function(error) {
        debugger
          console.log("ERROR: " + error);
      });        
    }); 
    
    // $scope.doRefresh = function() {
    //   $scope.message="Wellcome " + 
    //     ($localstorage.get('firstName')?
    //     $localstorage.get('firstName'):
    //     "Guest");
    //   $scope.$broadcast('scroll.refreshComplete');
    //   $scope.$apply()
    // }; 
})


.controller('ContactsCtrl',function($scope, 
    $cordovaContacts,
    $ionicPlatform) {
      var opts = {                                           
        filter : ''              
      };
  
      //if ($ionicPlatform.isAndroid()) {
        opts.hasPhoneNumber = true;         //hasPhoneNumber only works for android.
      //};
      $cordovaContacts.find(opts).then(function(result) {
          $scope.contacts = result;
      }, function(error) {
          debugger
          console.log("ERROR: " + error);
      });
})

.controller('SettingsCtrl', function($scope,$localstorage,$cordovaSQLite) {
  $scope.firstName=$localstorage.get('firstName');
  //$scope.bgColor=$localstorage.get('bgColor');

  $scope.saveSettings=function(){
    // $localstorage.set('firstName', $scope.firstName); 
    $localstorage.set('firstName', this.firstName); 
     //$localstorage.set('bgColor', this.bgColor);
  }

});
