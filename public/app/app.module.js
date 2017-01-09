(function (){
  angular.module('app', [])
  .controller('HelloController', HelloController)
  .controller('ByController', ByController);

  function HelloController($scope){
    $scope.hello = 'Hello World!';

    $scope.say = function(msg){
        return "Hello " + (msg || "No one ;)");
    };

    $scope.names = [{ fname: 'Bob'}, {fname: 'Stuart'}, {fname: 'Kevin'}];
  };

  function ByController($scope){
    $scope.bye = "Au revoir";
  };
})();
