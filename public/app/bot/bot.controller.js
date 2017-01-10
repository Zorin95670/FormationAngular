(function (){
  angular.module('botApp')
  .controller('BotController', botController);

  function botController($scope, $filter, SentencesFactory){
    $scope.msg = "";
    $scope.sentences = SentencesFactory.allSentences;
    $scope.sentencesTable = $scope.sentences;

    $scope.sorter = "word";
    $scope.sorterType = "0";
    $scope.search = "";

    $scope.pagination = "5";
    $scope.currentPagination = 5;

    $scope.maxPagination = Math.ceil($scope.sentences.length / $scope.pagination);

    $scope.$watch('sorter', function(){
      $scope.setPagination();
    });
    $scope.$watch('sorterType', function(){
      $scope.setPagination();
    });
    $scope.$watch('search', function(){
        $scope.setPagination();
    });

    $scope.add = function(){
      console.log($scope.sentence);
      if(!$scope.sentence.word || !$scope.sentence.response) return;

      $scope.sentences.push($scope.sentence);

      $scope.maxPagination = Math.ceil($scope.sentences.length / $scope.pagination);

      $scope.setPagination();

      $scope.sentence = {};
  };

    $scope.deleteSentence = function(index){
      $scope.sentences.splice($scope.sentences.indexOf( $scope.sentencesTable[index]), 1);
      $scope.sentencesTable.splice(index, 1);
      $scope.maxPagination = Math.ceil($scope.sentences.length / $scope.pagination);
      $scope.setPagination();
    };

    $scope.setMaxPagination = function(){
      $scope.maxPagination = Math.ceil($scope.sentences.length / $scope.pagination);
      if($scope.currentPagination > $scope.maxPagination) $scope.currentPagination = $scope.maxPagination;
      $scope.setPagination();
    };

    $scope.setPagination = function(){
      $scope.currentPagination = $scope.currentPagination | 1;
      if($scope.currentPagination > $scope.maxPagination) $scope.currentPagination = $scope.maxPagination;
      var value = $scope.currentPagination;

      var index = $scope.pagination * (value-1);

      $scope.sentencesTable = $filter('orderBy')($scope.sentences, $scope.sorter, ($scope.sorterType == 1))
        .slice(index, index+$scope.pagination);

      $scope.sentencesTable = $filter('filter')($scope.sentencesTable, $scope.search);

    };
  };

})();
