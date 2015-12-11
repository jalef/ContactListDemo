angular.module('contactListApp.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})//singleton
.factory('DashService', function($cordovaDevice) {
  // Might use a resource here that returns a JSON array

  var batteryPercent=3;

  return {
    battery: batteryPercent   
  };
})


.factory('$settings',function($cordovaSQLite)
{
  var save=function(name,value){
    var query = "SELECT * FROM settings WHERE name = ?";
    
    $cordovaSQLite.execute(db, query, [name]).then(function(res) {
        if(res.rows.length > 0) {
          console.log("SELECTED -> " + res.rows.item(0).name + " " 
                      + res.rows.item(0).value);
          var update="UPDATE settings SET value=? WHERE name=?";
          $cordovaSQLite.execute(db, update,[ value,name]);
        } else {
          var insert = "INSERT INTO settings (name, value) VALUES (?,?)";
          $cordovaSQLite.execute(db, insert, [name, value]).then(function(res) {
              console.log("INSERT ID -> " + res.insertId);
          }, function (err) {
              console.error(err);
          });
        }
    }, function (err) {
        console.error(err);
    });
  };
  
  var read=function(name, callback){
    var query="SELECT value FROM settings WHERE name=?";  
    
    $cordovaSQLite.execute(db, query, [name]).then(function(res) {
      if(res.rows.length > 0) {
        console.log("read : SELECTED -> " + res.rows.item(0).name + " " 
                      + res.rows.item(0).value);

        callback(res.rows.item(0).value);
      } else {
        callback("setting " + name + " is empty");
      }
    });
  }
  
  return {
    saveSetting:save,
    readSetting:read
  };
})


.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}]);