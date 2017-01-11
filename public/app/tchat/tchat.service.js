(function (){
  angular.module('tchatApp')
  .service('TchatService', tchatService);

  function tchatService($http){
    this.saveActive = false;
    this.updateActive = false;

    this.save = function(message){
      var me = this;
      return new Promise(function(resolve, reject){
        if(this.saveActive){
          return reject({
            error: true,
            message: 'request already launch'
          });
        }

        me.saveActive = true;

        $http({
          method: 'POST',
          url: '/api/tchat/add',
          data: message
        }).then(function(res){
          resolve(res);
          me.saveActive = false;
        }, function(res){
          reject(res);
          me.saveActive = false;
        });
      });
    };

    this.update = function(message){
      var me = this;
      return new Promise(function(resolve, reject){
        if(this.updateActive){
          return reject({
            error: true,
            message: 'request already launch'
          });
        }

        me.updateActive = true;

        $http({
          method: 'POST',
          url: '/api/tchat/update',
          data: message
        }).then(function(res){
          resolve(res);
          me.updateActive = false;
        }, function(res){
          reject(res);
          me.updateActive = false;
        });
      });
    };
  };
})();
