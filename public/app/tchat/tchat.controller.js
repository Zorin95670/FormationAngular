(function (){
  angular.module('tchatApp')
  .controller('TchatController', tchatController);

  function tchatController($scope){
    $scope.generatePseudo = function(){
      $scope.pseudo = 'guest'+Math.floor((Math.random() * 9999) + 1);
    };

    $scope.generatePseudo();
    $scope.txt = "";
    $scope.messages = [{
      date: new Date(),
      pseudo: 'system',
      txt: ['Welcome bro !']
    }];
    $scope.add = function(){
      if(!$scope.txt) return;

      var message = $scope.messages [$scope.messages.length-1];
      var date = new Date();

      if(message.pseudo == $scope.pseudo && compareDate(message.date, date)){
        message.txt.push($scope.txt);

        return;
      }

      $scope.messages.push({
        date: date,
        pseudo: $scope.pseudo,
        txt: [$scope.txt]
      });
      
      $scope.txt = '';
    }
  };

  function compareDate(d1, d2){
    return formatDate(d1) == formatDate(d2);
  };

  function formatDate(date){
    return date.getFullYear() + ' ' + date.getMonth() + ' ' + date.getHours() + ' ' + date.getMinutes();
  };
})();
