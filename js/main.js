$(document).ready(function() {
  
  $.getJSON('js/quotes.json', function(data) {
    var random = Math.floor((Math.random() * data.length));
    $('blockquote > p').text(data[random].quote);
    $('blockquote > footer').text(data[random].author);
    $('.wrapper').fadeIn('slow');
  });
  
  var img = new Image();
  
  img.onload = function() {
    $('.bg')
      .css('background-image', 'url(media/bg.jpg)')
      .css('animation-play-state', 'running')
      .css('-webkit-animation-play-state', 'running');
  };
  
  img.src = 'media/bg.jpg';
});