$(document).ready(function () {
  //$('#sidebarCollapse').on('click', function () {
  //    $('#sidebar').toggleClass();
  //});
  //$("#sidebar").mCustomScrollbar({
  //    theme: "minimal"
  //});

  $('#sidebarCollapse').on('click', function () {
    $('#sidebar').toggleClass('active');
    $('#content').toggleClass('active');
    $('.collapse.in').toggleClass('in');
    $('a[aria-expanded=true]').attr('aria-expanded', 'false');
  });

  $('#mentee-multi-options').multiselect();
});
