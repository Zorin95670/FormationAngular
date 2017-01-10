(function (){
  angular.module('app')
  .controller('BotController', botController);

  function botController($scope){
    $scope.msg = "";
    $scope.sentences = [
      { word: 'a', response: '1'},
      { word: 'b', response: '2'},
      { word: 'c', response: '3'},
      { word: 'd', response: '4'},
    ];
    $scope.sorter = "word";
    $scope.sorterType = '0';
  };

})();
