var linkColor;
var template;
var worksJson = 'js/works.json';
var quotesJson = 'js/quotes.json';
var contrastThreshold = 2;

function convertToRGB(color) {
  return color.match(/.{1,2}/g).map(function(component) {
    return parseInt(component, 16);
  });
}

function luminance(color) {
  color = convertToRGB(color);
  return (0.2126 * color[0] + 0.7152 * color[1] + 0.0722 * color[2]);
}

function darkestBetween(color, colour) {
  if (luminance(color) > luminance(colour)) {
    return colour;
  } else {
    return color;
  }
}

function isValidColor(color) {
  var L1 = luminance('FFFFFF');
  var L2 = luminance(color);
  return (L1 + 0.05) / (L2 + 0.05) > contrastThreshold;
}

function randomDirection() {
  var index = Math.floor(Math.random() * 4);
  return ['bottom left', 'bottom right', 'top left', 'top right'][index];
}

function randomColor() {
  var color;
  do {
    color = Math.floor(Math.random() * 16777215).toString(16);
    color = ('000000' + color).slice(-6);
  } while (!isValidColor(color));
  return color;
}

function randomGradient() {
  var firstColor = randomColor();
  var secondColor = randomColor();
  linkColor = '#' + darkestBetween(firstColor, secondColor);
  return 'linear-gradient(to ' + randomDirection() + ', #' + firstColor + ', #' + secondColor + ')';
}

function convertLinks(text) {
  return text.split(' ').map(function(word, i, a) {
    var regex = /\[(.+)\]\((.+)\)(.*)/g;
    var match = regex.exec(word);
    return match !== null ? '<a class="blue-link" href="' + match[2] + '" target="_blank">' + match[1] + '</a>' + match[3] : word; 
  }).join(' ');
}

function createWork(work) {
  work.description = twemoji.parse(convertLinks(work.description));
  $('.blocks').append(template(work));
}

function getWorks() {
  $.getJSON(worksJson, function(data) {
    data.forEach(createWork);
  });
}

function setUpHandlebars() {
  var source = $("#work-template").html();
  template = Handlebars.compile(source);
}

function writeQuote(quote, author) {
  $('p.phrase').text(quote);
  $('p.author').text(author);
  $('.quote').fadeIn('slow');
}

function changeQuote(quote, author) {
  $('.quote').fadeOut('slow', function() { writeQuote(quote, author); });
}

function getQuote() {
  $.getJSON(quotesJson, function(data) {
    var random = Math.floor((Math.random() * data.length));
    writeQuote(data[random].quote, data[random].author);
  });
  
  // Someone said Konami code(?)
  new Konamiz(['4', '2']).onStart(function() {
    changeQuote(
      'The Ultimate Question of Life, the Universe and Everything.',
      'Deep Thought'
    );
  });
  new Konamiz(['c', 'h', 'u', 'c', 'k']).onStart(function() {
    var url = 'http://api.icndb.com/jokes/random';
    var opt = {
      escape: 'javascript',
      limitTo: '[nerdy]'
    };
    $.getJSON(url, opt, function(data) {
      changeQuote(
        data.value.joke,
        'Chuck\'s life'
      );
    });
  });
}

$(document).ready(function() {
  setUpHandlebars();
  getWorks();
  getQuote();
  twemoji.parse(document.body);
  $('body').css('background-image', randomGradient());
  $('.landing h1').addClass('underline');
  $('a:not(.blue-link)').css('color', linkColor);
  console.log('                 ||\n                 ||\n                 ||\n                 ||\n                 ||\n            ============                         _\n                /  \\                       /\\   | |\n               /    \\                     /  \\  | |_      ____ _ _   _ ___\n              /      \\                   / /\\ \\ | \\ \\ /\\ / / _` | | | / __|\n             /        \\                 / ____ \\| |\\ V  V / (_| | |_| \\__ \\\n            /          \\               /_/    \\_\\_| \\_/\\_/ \\__,_|\\__, |___/\n           /    ___     \\                                         __/ |\n \\|/      /   /  |  \\    \\      \\|/                              |___/\n  |      /    \\  |  /     \\      |                    _       _     _\n   \\____/       ¯¯¯        \\____/                    | |     | |   (_)\n       /                    \\          __      ____ _| |_ ___| |__  _ _ __   __ _\n      /         |\\v/|        \\         \\ \\ /\\ / / _` | __/ __| \'_ \\| | \'_ \\ / _` |\n     /          |/^\\|         \\         \\ V  V / (_| | || (__| | | | | | | | (_| |\n    /                          \\         \\_/\\_/ \\__,_|\\__\\___|_| |_|_|_| |_|\\__, |\n   /_ _ _ _ _ _ _ _ _ _ _ _ _ _ \\                                            __/ |\n           |           |                                                    |___/\n           |           |\n           |           |\n            \\__         \\__\n               |           |');
});
