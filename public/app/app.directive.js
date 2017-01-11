(function(){
  angular.module('app')
    .directive('helloWorld', function() {
      return {
        restrict: 'E',
        templateUrl: "/public/app/hello.template.html",
        replace: true,
        transclude: true,
        scope: {
          hello: '=message'
        },
        link: function(scope, elem, attrs){
          elem.on('click','p', function(){
            elem.children('p').each(function(){
              this.removeClass('active');
            });
            elem.addClass('active');
          });
        }
      };
    });
})();
