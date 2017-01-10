(function(){
  angular.module('app')
    .config(function($routeProvider) {
      $routeProvider
        .when('/bot', {
          controller: "BotController",
          templateUrl: "public/app/bot/bot.template.html"
        })
        .otherwise('/bot');
    });
})();
