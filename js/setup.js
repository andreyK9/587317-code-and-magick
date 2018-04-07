'use strict';

var MAGICK_LENGTH = 4;

// перемешивает массив комментариев
var compareRandom = function () {
  return Math.random() - 0.5;
};

// создание массива Имен и Фамилий волшебников
var createName = function () {
  var magick = [];
  var magickName = [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон'
  ];
  var magickLastname = [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг'
  ];

  magickName.sort(compareRandom);
  magickLastname.sort(compareRandom);

  for (var i = 0; i < MAGICK_LENGTH; i++) {
    magick[i] = magickName[i] + ' ' + magickLastname[i];
  }

  return magick;
};

// создание массива цвета мантии волшебников
var createCoatColor = function () {
  var magick = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];

  magick.sort(compareRandom);
  return magick;
};

// создание массива цвета глаз волшебников
var createEyesColor = function () {
  var magick = [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ];

  magick.sort(compareRandom);
  return magick;
};

// создание массива данных волшебников
var createMagick = function () {
  var magickArr = [];
  var name = createName();
  var coatColor = createCoatColor();
  var eyesColor = createEyesColor();

  for (var i = 0; i < MAGICK_LENGTH; i++) {
    var magickData = {
      name: name[i],
      coatColor: coatColor[i],
      eyesColor: eyesColor[i]
    };

    magickArr.push(magickData);
  }

  return magickArr;
};

// заполнение данными одного мага
var entryMagickData = function (template, magickArr) {
  var temp = template.cloneNode(true);

  temp.querySelector('.setup-similar-label').textContent = magickArr.name;
  temp.querySelector('.wizard-coat').style.fill = magickArr.coatColor;
  temp.querySelector('.wizard-eyes').style.fill = magickArr.eyesColor;

  return temp;
};

// создание блока волшебников
var createMagickBlock = function (magickArr) {
  var fragment = document.createDocumentFragment();
  var template = document.querySelector('#similar-wizard-template').content;

  for (var i = 0; i < MAGICK_LENGTH; i++) {
    var magickblock = entryMagickData(template, magickArr[i]);
    fragment.appendChild(magickblock);
  }

  return fragment;
};

// отрисовка всех магов
var renderMagickList = function (fragment) {
  var similarList = document.querySelector('.setup-similar-list');
  similarList.appendChild(fragment);
};

document.querySelector('.setup').classList.remove('hidden');
var magickArr = createMagick();
var fragment = createMagickBlock(magickArr);
renderMagickList(fragment);
document.querySelector('.setup-similar').classList.remove('hidden');
