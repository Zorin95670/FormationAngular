(function(){
  angular.module('app')
    .controller('AppController', AppController);

    function AppController($scope){
      $scope.hello = 'bonjour';
    };
})();
