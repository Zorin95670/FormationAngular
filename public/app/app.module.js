(function (){
  angular.module('app', [])
  .controller('HelloController', HelloController)
  .controller('ByController', ByController);

  function HelloController($scope){
    $scope.hello = 'Hello World!';

    $scope.say = function(msg){
        return "Hello " + (msg || "No one ;)");
    };

    $scope.toChildren = function(){
      $scope.$broadcast('msg', { message: "HelloController"});
    };

    $scope.$on('msg', function (event, args){
      $scope.message = args.message;
    });

  };

  function ByController($scope){
    $scope.bye = "Au revoir";

    $scope.toParent = function(){
      $scope.$emit('msg', { message: 'ByController'});
    };

    $scope.$on('msg', function (event, args){
      $scope.message = args.message;
    });

  };
})();
