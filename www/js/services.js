angular.module('contactListApp.services', [])

.factory('DashService', function($cordovaDevice) {
  // Might use a resource here that returns a JSON array

  var batteryPercent=3;

  return {
    battery: batteryPercent   
  };
})

.factory('settings',function($cordovaSQLite)
{
  var save=function(name,value,callback){
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
      callback();
    }, function (err) {
      console.error(err);
      callback();
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
        callback(undefined);
      }
    });
  }
  
  var colorList=[
    {value:"#7FA2E2", name:"Blue"},
    {value:"#AF848B", name:"Purple"},
    {value:"#CCC086", name:"Yellow"},
    {value:"#849D64", name:"Green"},
    {value:"#8C8374", name:"Brown"},
  ]
  return {
    saveSetting:save,
    readSetting:read,
    colorList:colorList
  };
  
})

.factory('localstorage', ['$window', function($window) {
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
}])
.factory('ContactService', function($q,$cordovaContacts) {
	var mockContactsMode=true;
	
	var get=mockContactsMode?
			mockContacts($q):
			cordovaContacts($cordovaContacts);	
	return {
	get:get
	};
});

function mockContacts($q){
	function make() {
      var defer = $q.defer();
      var contacts = [];
	
      for (var i = 0; i < 1000; i++) {
        contacts.push({
          displayName : "Contact " + i,
          phoneNumbers : [i],
          emails : ["contact" + i + "@contactlist.com"]
          });
          
       if (i===999) {
         defer.resolve(contacts);
       }
          
      };
      return defer.promise;
  };
  
  return make();

}

function cordovaContacts($cordovaContacts)
{
	 var opts = {                                           
        filter : '' ,
        //hasPhoneNumber:true             
	};
	  
	// $cordovaContacts.find(opts).then(function(result) {
    //     return result;
    //   }, function(error) {
    //     return null;
    // });
	return $cordovaContacts.find(opts);
}