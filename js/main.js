$(document).ready(function() {
  $.getJSON('./js/quotes.json', function(data) {
    var random = Math.floor((Math.random() * data.length));
    $('p').text(data[random].quote);
    $('blockquote > footer').text(data[random].author);
    $('img').fadeIn('slow');
    $('.wrapper').fadeIn('slow');
  });
});
