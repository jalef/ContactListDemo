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
    
      $scope.model = $cordovaDevice.getModel();  
      $scope.platform = $cordovaDevice.getPlatform();  
      
      var opts = {                                           
        filter : ''              
      };
  
      //if ($ionicPlatform.isAndroid()) {
        opts.hasPhoneNumber = true;         //hasPhoneNumber only works for android.
      //};
      $cordovaContacts.find(opts).then(function(result) {
          $scope.contactsCount = result.length;     
      }, function(error) {
        debugger
          console.log("ERROR: " + error);
      });        
    }); 
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

.controller('SettingsCtrl', function($scope,
  $localstorage,
  $settings,
  $ionicLoading) {
    
  $scope.firstName=$localstorage.get('firstName');

  $ionicLoading.show({
      template: '<p>Loading...</p><ion-spinner></ion-spinner>'
  });
    
  $settings.readSetting('bgColor', function(value) {
    $scope.bgColor=value;  
    $ionicLoading.hide();
  });
 
  $scope.saveSettings=function(){
    var newName=this.firstName;
    var newBgColor=this.bgColor;
    $ionicLoading.show({
        template: '<p>Saving...</p><ion-spinner></ion-spinner>'
    });
    $localstorage.set('firstName', newName); 
    $settings.saveSetting('bgColor',newBgColor,function()
    {
      $ionicLoading.hide();
    });
    
  }

});
