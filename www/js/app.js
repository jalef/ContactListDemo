// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('contactListApp', 
      ['ionic', 
      'ngCordova' ,
      'contactListApp.controllers', 
       'contactListApp.services'
      ])

.run(function($ionicPlatform,$cordovaSQLite) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    
    db = $cordovaSQLite.openDB("contactList.db");
    $cordovaSQLite.execute(db, 
    "CREATE TABLE IF NOT EXISTS settings (id integer primary key,name text,value text)");  
  });
})
.config(function($stateProvider, $urlRouterProvider) {
// 
//   // Ionic uses AngularUI Router which uses the concept of states
//   // Learn more here: https://github.com/angular-ui/ui-router
//   // Set up the various states which the app can be in.
//   // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })
// 
//   // Each tab has its own nav history stack:
// 
  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.contacts', {
      url: '/contacts',
      views: {
        'tab-contacts': {
          templateUrl: 'templates/tab-contacts.html',
          controller: 'ContactsCtrl'
        }
      }
    })

  .state('tab.settings', {
    url: '/settings',//qq:why we give /settings and not tab/settings
    views: {
      'tab-settings': {//jalef:we must provide the same file or a script with the same id
                       // and at the tab setting, the name of the view must be, also, the same
        templateUrl: 'templates/tab-settings.html',
        controller: 'SettingsCtrl'
      }
    }
  });
// 
//   // if none of the above states are matched, use this as the fallback
   $urlRouterProvider.otherwise('/tab/dash');
//   
//  
 });
