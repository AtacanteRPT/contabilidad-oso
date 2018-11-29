$(document).ready(function () {
  $(".dropdown-trigger").dropdown();
  $('.collapsible').collapsible();
  $('.sidenav').sidenav();
  $('.modal').modal();
  $('select').formSelect();
  // $('ul.tabs').tabs({
  //   swipeable : true,
  //   responsiveThreshold : Infinity
  // });
  // $(".carousel").css({ "height": "100%"});
  $('.datepicker').datepicker({ 
    firstDay: true, 
    format: 'yyyy-mm-dd',
    i18n: {
        months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
        monthsShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Dic"],
        weekdays: ["Domingo","Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
        weekdaysShort: ["Dom","Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
        weekdaysAbbrev: ["D","L", "M", "M", "J", "V", "S"]
    }
});



});
var elem = document.querySelector('.collapsible.expandable');
var instance = M.Collapsible.init(elem, {
  accordion: false
});


document.addEventListener('DOMContentLoaded', function () {
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


