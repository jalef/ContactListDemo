angular.module('contactListApp.controllers', [])

.controller("DashCtrl", function($scope, 
      $rootScope, 
      $ionicPlatform, 
      $cordovaBatteryStatus,
      $cordovaDevice,
      $cordovaContacts,
      $localstorage,
      $settings,
      $ionicLoading) {
    
    $ionicLoading.show({
      template: '<p>Loading...</p><ion-spinner></ion-spinner>'
    }); 
      
    var waitingOnCallbackItems=0;
    
    function hideSpinner(){
       waitingOnCallbackItems--;
      if (waitingOnCallbackItems===0) {
        $ionicLoading.hide();
      }
    }

    $scope.refreshSettings=function() {
      $scope.firstName= $localstorage.get('firstName');
    }
    
    $scope.contactsCount=0;
    
    $ionicPlatform.ready(function() {  
      var tempLocalstorage=$localstorage.get('firstName');
      
      $scope.firstName=(tempLocalstorage?
        tempLocalstorage:
        "Guest");
        
      $rootScope.$on("$cordovaBatteryStatus:status",
        function(event, args){
          $scope.batteryLevel = args.level;
          $scope.isPluggedIn = args.isPlugged;
      }); 
    
      $scope.model = $cordovaDevice.getModel();  
      $scope.platform = $cordovaDevice.getPlatform();  
      
      var opts = {                                           
        filter : '' , 
        hasPhoneNumber:true            
      };
      waitingOnCallbackItems++;
      $cordovaContacts.find(opts).then(function(result) {
        $scope.contactsCount = result.length;   
        hideSpinner();  
      }, function(error) {
        console.log("ERROR: " + error);
        hideSpinner();
      }); 
      
      waitingOnCallbackItems++;
      $settings.readSetting('bgColor', function(value) {
        $scope.bgColor=(value? value:"white" ); 
        hideSpinner();    
      });       
    }); 
})


.controller('ContactsCtrl',function($scope, 
    $cordovaContacts,
    $ionicPlatform,
    $ionicLoading) {
      
       $ionicLoading.show({
          template: '<p>Loading...</p><ion-spinner></ion-spinner>'
      });
      var opts = {                                           
        filter : '' ,
        hasPhoneNumber:true             
      };

      $cordovaContacts.find(opts).then(function(result) {
        $scope.contacts = result;
        $ionicLoading.hide();
      }, function(error) {
          
        console.log("ERROR: " + error);
        $ionicLoading.hide();
      });
})


.controller('SettingsCtrl', function($scope,
    $localstorage,
    $settings,
    $ionicLoading) {

  $ionicLoading.show({
      template: '<p>Loading...</p><ion-spinner></ion-spinner>'
  });
  
  $scope.firstName=$localstorage.get('firstName');
  
  $scope.colors=$settings.colorList;
  
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
