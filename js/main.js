$.getJSON('./js/quotes.json', function(data) {
  var random = Math.floor((Math.random() * data.length));
  $('p').text(data[random].quote);
  $('footer').text(data[random].author);
});
