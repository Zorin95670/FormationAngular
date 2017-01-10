(function(){
  angular.module('app')
    .config(function($routeProvider) {
      $routeProvider
        .when('/bot', {
          controller: "BotController",
          templateUrl: "public/app/bot/bot.template.html"
        })
          .when('/tchat', {
            controller: "TchatController",
            templateUrl: "public/app/tchat/tchat.template.html"
          })
        .otherwise('/bot');
    });
})();
