$(document).ready(function(){
  $(".dropdown-trigger").dropdown();
  $('.collapsible').collapsible();
  $('.sidenav').sidenav();
  $('.modal').modal();
    $('select').formSelect();

        
});
var elem = document.querySelector('.collapsible.expandable');
var instance = M.Collapsible.init(elem, {
  accordion: false
});


document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems, options);

});


// Initialize collapsible (uncomment the lines below if you use the dropdown variation)
// var collapsibleElem = document.querySelector('.collapsible');
// var collapsibleInstance = M.Collapsible.init(collapsibleElem, options);

// Or with jQuery


var instance = M.Sidenav.getInstance(elem);
instance.open();

  /* jQuery Method Calls
    You can still use the old jQuery plugin method calls.
    But you won't be able to access instance properties.

    $('.sidenav').sidenav('methodName');
    $('.sidenav').sidenav('methodName', paramName);
  */


        