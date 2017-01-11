(function (){
  angular.module('tchatApp')
  .controller('TchatController', tchatController);

  function tchatController($scope, SentencesFactory, $http, TchatService){
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

      $scope.txt = $scope.txt.trim();

      if(message.pseudo == $scope.pseudo && compareDate(message.date, date)){

        TchatService.update(message).then(function(res){
          $scope.$apply(function(){
            message.txt.push($scope.txt);
          });
        }, function(res){
          console.log('TODO - Error update message')
          console.log(res);
        });

        botMessage(SentencesFactory.allSentences, $scope.txt, $scope.messages);
        return;
      }

      message = {
        date: date,
        pseudo: $scope.pseudo,
        txt: [$scope.txt]
      };

      TchatService.save(message).then(function(res){
        $scope.$apply(function(){
          $scope.messages.push(res.data);
        });
      }, function(res){
        console.log('TODO - Error save message')
        console.log(res);
      });

      botMessage(SentencesFactory.allSentences, $scope.txt, $scope.messages);

      $scope.txt = '';
    }
    // $http({
    //   method: 'GET',
    //   url: '/api/tchat/find',
    //   params: { max : 5}
    // }).then(function(data){
    //   console.log(data);
    // }, function(data){
    //   console.log(data);
    // });
  };

  function compareDate(d1, d2){
    if(formatDate(d1) == formatDate(d2)) return true;
    if(parseInt(formatDate(d1)))
    return false;
  };

  function formatDate(date){
    return date.getFullYear() + '' + date.getMonth() + '' + date.getHours() + '' + date.getMinutes();
  };

  function botMessage(allSentences, txt, messages){
    for(var i = 0 ; i < allSentences.length ; i++){
      if(txt.toUpperCase() == allSentences[i].word.toUpperCase()){
        messages.push({
          date: new Date(),
          pseudo: 'system',
          txt: [allSentences[i].response]
        });
        break;
      }
    }
  };
})();
