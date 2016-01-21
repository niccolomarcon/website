$(document).ready(function() {

  function writeQuote(quote, author) {
    $('blockquote > p').text(quote);
    $('blockquote > footer').text(author);
    $('.wrapper').fadeIn('slow');
  }

  function changeQuote(quote, author) {
    $('.wrapper').fadeOut('slow', function() { writeQuote(quote, author); });
  }

  // Dummy image used to "prefetch" the really big background image
  var img = new Image();
  img.onload = function() {
    $('.bg')
      .css('background-image', 'url(media/bg.jpg)')
      .css('animation-play-state', 'running')
      .css('-webkit-animation-play-state', 'running')
      .css('-moz-animation-play-state', 'running')
      .css('-o-animation-play-state', 'running');
  };

  // Someone said Konami code(?)
  new Konamiz().onStart(function() {
    changeQuote(
      'Gimme moar lifez!',
      'Bill Rizer'
    );
  });
  new Konamiz(['4', '2']).onStart(function() {
    changeQuote(
      'The Ultimate Question of Life, the Universe and Everything.',
      'Deep Thought'
    );
  });

  // Used to avoid the annoying display problem on chrome for android
  $(window).resize('resizeBackground');
  function resizeBackground() {
    $('.bg').height($(window).height() + 60);
  }

  // Start loading the background
  img.src = 'media/bg.jpg';

  // Loading the quote
  $.getJSON('js/quotes.json', function(data) {
    var random = Math.floor((Math.random() * data.length));
    writeQuote(data[random].quote, data[random].author);
  });

  resizeBackground();

});
