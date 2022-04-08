'use strict';

const mainMessage = $('#mainMessage');
const userLanguage = navigator.language || navigator.userLanguage;
const paletteBar = $('.palette')[0];
const cookieColor = $.cookie('color');
const cookieText = $.cookie('text');

function main () {
  if (!cookieColor) { 
    $.cookie('color', '#ff7a00', { expires: 365 * 10 });
  } else {
    document.documentElement.style.setProperty('--user-color', decodeURIComponent(cookieColor));
  }

  if (!cookieText) { 
    $.cookie('text', 'Double Click', { expires: 365 * 10 });
  } else {
    mainMessage.text(decodeURIComponent(cookieText));
  }

  if (userLanguage.match(/pt/i) && mainMessage.text() == 'Double Click') mainMessage.text('Dois Cliques');
  updateFontSize();
  for (let e of $('.color')) {
    const elementID = '#' + e.id;
    $(elementID).css('background-color', elementID);
  }
}

function updateFontSize() {
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;
  let fontSize;

  mainMessage.css('fontSize', windowHeight / 2.7 + 'px');

  while (mainMessage.height() > windowHeight || mainMessage.width() > windowWidth - 10) {
    if (mainMessage.height() > windowHeight) fontSize = parseInt(mainMessage.css('fontSize')) - 1;
    if (mainMessage.width() > windowWidth - 10) fontSize = parseInt(mainMessage.css('fontSize')) - 1;
    mainMessage.css('fontSize', fontSize + 'px');
  }
}

function changeMessage() {
  let dialogText = 'What are you going to say?';
  if (userLanguage.match(/pt/i)) dialogText = 'O que você vai dizer?';
  
  let newMessage = prompt(dialogText, mainMessage.text());
  if (!newMessage && ['Dois Cliques', 'Double Click'].includes(mainMessage.text())) { 
    newMessage = 'LookHere!'; 
  } else if (!newMessage) {
    newMessage = mainMessage.text();
  } 

  mainMessage.text(newMessage);
  $.cookie('text', newMessage);
  paletteBar.style.opacity = '1';
  resetAnimationPalette('palette');
  updateFontSize();
}

function changeColor(colorButton) {
  document.documentElement.style.setProperty('--user-color', colorButton.style.backgroundColor);
  $.cookie('color', colorButton.style.backgroundColor);
  closePalette(colorButton.parentNode);
}

function closePalette() {
  resetAnimationPalette('closePalette');
  setTimeout(() => {
    paletteBar.style.opacity = '0';
    paletteBar.classList.remove('closePalette');
  }, 800);
}

function resetAnimationPalette (elementName) {
  paletteBar.classList.add(elementName);
  paletteBar.style.animation = 'none';
  paletteBar.offsetHeight;
  paletteBar.style.animation = null;
}