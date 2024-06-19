
var headerHeight = $('header').outerHeight();
function topMargin() { 
    $('.topSection').css("margin-top", headerHeight);
}

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})

$(document).ready(function () {
    $('#example_filter input').addClass('form-control');

    $('#example').DataTable( {
        "scrollX": true
    });
});










  

