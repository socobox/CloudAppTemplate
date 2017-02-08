(function(angular){
  angular
    .module('sbx')
    .directive('showErrors', function() {
      return {
        restrict: 'A',
        require:  '^form',
        link: function (scope, el, attrs, formCtrl) {
          var inputEl   = el[0].querySelector('[name]'); // find the text box element, which has the 'name' attribute
          
          var inputNgEl = angular.element(inputEl); // convert the native text box element to an angular element
          
          var inputName = inputNgEl.attr('name'); // get the name on the text box so we know the property to check on the controller
          
          //get the general event broadcasted from the save action
          scope.$on('show-errors-check-validity', function() {
            
              el.toggleClass('has-error', formCtrl[inputName].$invalid);  
              // console.log('input', inputName)
            

          });
          // only apply the has-error class after the user leaves the text box
          inputNgEl.bind('blur', function() {
            el.toggleClass('has-error', formCtrl[inputName].$invalid);
          })
        }
      }
    });
})(angular);

(function (angular) {
  angular
    .module('sbx')
    .directive('onFinishRender', ['$timeout', onFinishRender]);

    function onFinishRender($timeout) {
      return {
        restrict: 'A',
        link: function (scope, element, attr) {
          if (scope.$last === true) {
            $timeout(function () {
                scope.$emit('ngRepeatFinished');
            });
          }
        }
      }
    }
}(angular));

(function(angular){
  angular
    .module('sbx')
    .filter('truncate', truncate);

    function truncate(){
      return function (text, length, end) {
        try{
          if (isNaN(length))
            length = 10;

          if (end === undefined)
              end = '...';

          if (text.length <= length || text.length - end.length <= length) {
              return text;
          }
          else {
              return String(text).substring(0, length-end.length) + end;
          }
        }catch(err){

        }

      };
    }
})(angular);

(function (angular) {
  angular
    .module('sbx')
    .directive('ngEnter', ngEnter);

  function ngEnter() {
    return function (scope, element, attrs) {

      element.bind('keydown keypress', function (event) {

        if (event.which === 13) {
          if (!event.altKey) {
            scope.$apply(function () {
              scope.$eval(attrs.ngEnter);
              event.preventDefault();
            });
          }
        }
      });
    };
  }
})(angular);