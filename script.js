console.log("Script is running");

var app = document.querySelector('#app');
app.page = 'home';
/*
$('a').on('click', function(e) {

    e.preventDefault();
    var url = this.href;
    console.log(url);
    //$('nav a.current').removeClass('current');
    //$(this).addClass('current');
    $('#content').remove();
    $('#content_header').load(url + "#content_header").hide().fadeIn(1333); 
});

$("#flashBack").on('click' ,function(){
  console.log("running this");
  $.getScript("js/flashBack.js");
});

*/


/*

$('paper-menu paper-item div a').on('click', function(e) {                 // User clicks nav link

  e.preventDefault();                                // Stop loading new link
  var url = this.href;
  console.log(url);                               // Get value of href

  //$('nav a.current').removeClass('current');         // Clear current indicator
  //$(this).addClass('current');                       // New current indicator

  $('#content').remove();                          // Remove old content
  //$('#content').load(url + '#content').hide().fadeIn(1333);
  $('#content_header').load(url + "#content_header").hide().fadeIn(1333); // New content
});

/*
$('a').on('click', function(e) {                 // User clicks nav link
  e.preventDefault();                                // Stop loading new link
  var url = this.href;
  console.log(url);                               // Get value of href

  //$('nav a.current').removeClass('current');         // Clear current indicator
  //$(this).addClass('current');                       // New current indicator

  $("#content").remove();                         // Remove old content
  //$('#content').load(url + '#content').hide().fadeIn(1333);
  $("#content_header").load(url + "#content_header"); // New content
});
var a = 10;
var b = 20;
var c = 5;
console.log(a*b/b*a/c*a);
*/
