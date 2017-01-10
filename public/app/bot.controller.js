(function (){
  angular.module('app')
  .controller('BotController', botController);

  function botController($scope, $filter){
    $scope.msg = "";
    $scope.sentences = [
      { word: 'a', response: '1'},
      { word: 'b', response: '2'},
      { word: 'c', response: '3'},
      { word: 'd', response: '4'},
    ];
    $scope.sentencesTable = $scope.sentences;

    $scope.sorter = "word";
    $scope.sorterType = "0";
    $scope.search = "";

    $scope.$watch('sorter', function(){
        $scope.sentencesTable = $filter('orderBy')($scope.sentences, $scope.sorter, ($scope.sorterType == 1));
    });
    $scope.$watch('sorterType', function(){
        $scope.sentencesTable = $filter('orderBy')($scope.sentences, $scope.sorter, ($scope.sorterType == 1));
    });
    $scope.$watch('search', function(){
        $scope.sentencesTable = $filter('filter')($scope.sentencesTable, $scope.search);
    });
  };

})();
