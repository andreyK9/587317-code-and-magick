'use strict';

var WIZARD_LENGTH = 4;
var ESC_CODE = 27;
var ENTER_CODE = 13;
var FIREBALL_DEFAULT_COLOR = 'rgb(238, 72, 48)';
var WIZARD_NAME = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];
var WIZARD_LAST_NAME = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];
var WIZARD_COAT = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
var WIZARD_EYES = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];
var fireballConvert = {
  'rgb(238, 72, 48)' : '#ee4830',
  'rgb(48, 168, 238)': '#30a8ee',
  'rgb(92, 230, 192)': '#5ce6c0',
  'rgb(232, 72, 213)': '#e848d5',
  'rgb(230, 232, 72)': '#e6e848'
};
var FIREBALL_COLOR = [
  'rgb(238, 72, 48)',
  'rgb(48, 168, 238)',
  'rgb(92, 230, 192)',
  'rgb(232, 72, 213)',
  'rgb(230, 232, 72)'
];
var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var setupSubmit = setup.querySelector('.setup-submit');
var userName = setup.querySelector('.setup-user-name');
var wizardEyes = setup.querySelector('.wizard-eyes');
var wizardCoat = setup.querySelector('.wizard-coat');
var fireball = setup.querySelector('.setup-fireball-wrap');
var player = setup.querySelector('.setup-player');

// закрытие окна по клавише Esc
var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_CODE) {
    closePopup();
  }
};

// закрытие окна при клике мышм
var onPopupClickPress =  function () {
    closePopup();
};

// закрытие окна по клавише Enter при наведенном фокусе
var onPopupEnterPress = function (evt) {
  if (evt.keyCode === ENTER_CODE) {
    closePopup();
  }
};

// отмена закрытия окна при выбранном поле "имя персонажа"
var onUserNameEscPress = function (evt) {
  if(evt.keyCode === ESC_CODE) {
    evt.stopPropagation();
  }
};

// смена цвета глаз персонажа
var onUserEyesColorChange = function () {
  var color = wizardEyes.style.fill;
  if(!color) {
    color = 'black';
  }
  setEyesColor(color);
};

// смена цвета мантии персонажа
var onUserCoatColorChange = function () {
  var color = wizardCoat.style.fill;
  setCoatColor(color);
};

// смена цвета фаерболла
var onFireballColorChange = function () {
  var color = fireball.style.backgroundColor;
  if(!color) {
    color = FIREBALL_DEFAULT_COLOR;
  }
  setFireballColor(color);
};

// установка цвета фаерболла
var setFireballColor = function (value) {
  var result = fireballConvert[stepUp(value, FIREBALL_COLOR)];
  fireball.style.background = result;
  player.querySelector('input[name=fireball-color]').value = result;
};

// установка цвета мантии персонажа
var setCoatColor = function (value) {
  var result = stepUp(value, WIZARD_COAT);
  wizardCoat.style.fill = result;
  player.querySelector('input[name=coat-color]').value = result;
}

// установка цвета глаз персонажа
var setEyesColor = function (value) {
  var result = stepUp(value, WIZARD_EYES);
  wizardEyes.style.fill = result;
  player.querySelector('input[name=eyes-color]').value = result;
}

// выбирает новый цвет
var stepUp = function (currentColor, arrColor) {
  for (var i = 0; i < arrColor.length; i++) {
    if(arrColor[i] === currentColor) {
      if(i === arrColor.length - 1) {
        return arrColor[0];
      }
      return arrColor[++i];
    }
  }
  return;
};

// закрывает окно настройки персонажа
var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
  setupClose.removeEventListener('click', onPopupClickPress);
  setupClose.removeEventListener('keydown', onPopupEnterPress);
  userName.removeEventListener('keydown', onUserNameEscPress);
  wizardEyes.removeEventListener('click', onUserEyesColorChange);
  wizardCoat.removeEventListener('click', onUserCoatColorChange);
  fireball.removeEventListener('click', onFireballColorChange);
};

// открывает окно настройки персонажа
var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
  setupClose.addEventListener('click', onPopupClickPress);
  setupClose.addEventListener('keydown', onPopupEnterPress);
  userName.addEventListener('keydown', onUserNameEscPress);
  wizardEyes.addEventListener('click', onUserEyesColorChange);
  wizardCoat.addEventListener('click', onUserCoatColorChange);
  fireball.addEventListener('click', onFireballColorChange);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if(evt.keyCode === ENTER_CODE) {
    openPopup();
  }
});

// генерирует случайное число от -0.5 до 0.5
var getCompareRandom = function () {
  return Math.random() - 0.5;
};

// возвращает волшебника
var getWizard = function (iteration) {
  return {
    name: WIZARD_NAME[iteration] + WIZARD_LAST_NAME[iteration],
    coatColor: WIZARD_COAT[iteration],
    eyesColor: WIZARD_EYES[iteration]
  };
};

// создание массива данных волшебников
var createWizardData = function () {
  var wizardGroup = [];
  WIZARD_NAME.sort(getCompareRandom);
  WIZARD_LAST_NAME.sort(getCompareRandom);
  WIZARD_COAT.sort(getCompareRandom);
  WIZARD_EYES.sort(getCompareRandom);

  for (var i = 0; i < WIZARD_LENGTH; i++) {
    var wizard = getWizard(i);
    wizardGroup.push(wizard);
  }

  return wizardGroup;
};

// задает имя волшебника
var setWizardName = function (template, value) {
  template.querySelector('.setup-similar-label').textContent = value;
};

// задает цвет мантии волшебника
var setWizardCoatColor = function (template, value) {
  template.querySelector('.wizard-coat').style.fill = value;
};

// задает цвет глаз волшебника
var setWizardEyesColor = function (template, value) {
  template.querySelector('.wizard-eyes').style.fill = value;
};

// заполнение данными одного мага
var getWizardTemplate = function (object) {
  var template = document.querySelector('#similar-wizard-template').content.cloneNode(true);

  setWizardName(template, object.name);
  setWizardCoatColor(template, object.coatColor);
  setWizardEyesColor(template, object.eyesColor);

  return template;
};

// создание блока волшебников
var getWizardGroup = function (wizardList) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < WIZARD_LENGTH; i++) {
    var template = getWizardTemplate(wizardList[i]);
    fragment.appendChild(template);
  }

  return fragment;
};

// отрисовка всех магов
var renderWizardGroup = function (fragment) {
  var similar = document.querySelector('.setup-similar-list');
  similar.appendChild(fragment);
};

var wizardData = createWizardData();
var template = getWizardGroup(wizardData);
renderWizardGroup(template);
