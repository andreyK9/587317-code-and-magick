'use strict';

var WIZARD_LENGTH = 4;
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
var setNameWizard = function (template, value) {
  template.querySelector('.setup-similar-label').textContent = value;
};

// задает цвет мантии волшебника
var setCoatWizard = function (template, value) {
  template.querySelector('.wizard-coat').style.fill = value;
};

// задает цвет мантии волшебника
var setEyesWizard = function (template, value) {
  template.querySelector('.wizard-eyes').style.fill = value;
};

// заполнение данными одного мага
var getWizardTemplate = function (object) {
  var template = document.querySelector('#similar-wizard-template').content.cloneNode(true);

  setNameWizard(template, object.name);
  setCoatWizard(template, object.coatColor);
  setEyesWizard(template, object.eyesColor);

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
var renderWizartGroup = function (fragment) {
  var similarList = document.querySelector('.setup-similar-list');
  similarList.appendChild(fragment);
};

var wizardData = createWizardData();
var template = getWizardGroup(wizardData);
renderWizartGroup(template);

document.querySelector('.setup').classList.remove('hidden');
document.querySelector('.setup-similar').classList.remove('hidden');
