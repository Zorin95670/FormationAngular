(function (){
  angular.module('app')
  .factory('SentencesFactory', function (){
    return {
      allSentences: [{
        word: "Bonjour",
        response: "Yo bro"
      },{
        word: "Hey",
        response: "Oh"
      },{
        word: "Toto ?",
        response: "tata"
      },{
        word: "Bad ?",
        response: "Mother****** !"
      }]
    };
  });
})();
