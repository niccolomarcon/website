var linkColor;

function randomColor() {
  var color = Math.floor(Math.random() * 16777215).toString(16);
  return ('000000' + color).slice(-6);
}

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

function randomDirection() {
  var index = Math.floor(Math.random() * 4);
  return ['bottom left', 'bottom right', 'top left', 'top right'][index];
}

function randomGradient() {
  var firstColor = randomColor();
  var secondColor = randomColor();
  linkColor = '#' + darkestBetween(firstColor, secondColor);
  return 'linear-gradient(to ' + randomDirection() + ', #' + firstColor + ', #' + secondColor + ')';
}

$(document).ready(function() {
  $('body').css('background-image', randomGradient());
  $('.landing h1').addClass('underline');
  $('a:not(.blue-link)').css('color', linkColor);
  console.log('                 ||\n                 ||\n                 ||\n                 ||\n                 ||\n            ============                         _\n                /  \\                       /\\   | |\n               /    \\                     /  \\  | |_      ____ _ _   _ ___\n              /      \\                   / /\\ \\ | \\ \\ /\\ / / _` | | | / __|\n             /        \\                 / ____ \\| |\\ V  V / (_| | |_| \\__ \\\n            /          \\               /_/    \\_\\_| \\_/\\_/ \\__,_|\\__, |___/\n           /    ___     \\                                         __/ |\n \\|/      /   /  |  \\    \\      \\|/                              |___/\n  |      /    \\  |  /     \\      |                    _       _     _\n   \\____/       ¯¯¯        \\____/                    | |     | |   (_)\n       /                    \\          __      ____ _| |_ ___| |__  _ _ __   __ _\n      /         |\\v/|        \\         \\ \\ /\\ / / _` | __/ __| \'_ \\| | \'_ \\ / _` |\n     /          |/^\\|         \\         \\ V  V / (_| | || (__| | | | | | | | (_| |\n    /                          \\         \\_/\\_/ \\__,_|\\__\\___|_| |_|_|_| |_|\\__, |\n   /_ _ _ _ _ _ _ _ _ _ _ _ _ _ \\                                            __/ |\n           |           |                                                    |___/\n           |           |\n           |           |\n            \\__         \\__\n               |           |');
});
