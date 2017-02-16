var linkColor;

function randomColor() {
  var color = Math.floor(Math.random() * 16777215).toString(16);
  return ('000000' + color).slice(-6);
}

function darkestBetween(color, colour) {
  return color < colour ? color : colour;
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
  $('a').css('color', linkColor);
});