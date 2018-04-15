'use strict';

var WIZARD_LENGTH = 4;
var ESC_CODE = 27;
var ENTER_CODE = 13;
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
var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var setupUserName = setup.querySelector('.setup-user-name');
var setupSubmit = setup.querySelector('.setup-submit');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_CODE) {
    closePopup();
  }
};

var onPopupClickPress =  function () {
    closePopup();
};

var onPopupEnterPress = function (evt) {
  if (evt.keyCode === ENTER_CODE) {
    closePopup();
  }
};

var onUserNameEscPress = function (evt) {
    if(evt.keyCode === ESC_CODE) {
      evt.stopPropagation();
    }
  }

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
  setupClose.removeEventListener('click', onPopupClickPress);
  setupClose.removeEventListener('keydown', onPopupEnterPress);
  setupUserName.removeEventListener('keydown', onUserNameEscPress);
};

var openPopup = function () {
  setup.classList.remove('hidden');
  setupClose.addEventListener('click', onPopupClickPress);
  setupClose.addEventListener('keydown', onPopupEnterPress);
  setupUserName.addEventListener('keydown', onUserNameEscPress);
  document.addEventListener('keydown', onPopupEscPress);
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
