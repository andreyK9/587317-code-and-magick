'use strict';
(function () {

  // возвращает волшебника
  var getWizard = function (iteration) {
    return {
      name: window.data.wizard.NAME[iteration] + window.data.wizard.LAST_NAME[iteration],
      coatColor: window.data.wizard.COAT[iteration],
      eyesColor: window.data.wizard.EYES[iteration]
    };
  };

  // создание массива данных волшебников
  window.data = {
    WIZARD_LENGTH: 4,
    fireball: {
      DEFAULT_COLOR: 'rgb(238, 72, 48)',
      Convert: {
        'rgb(238, 72, 48)': '#ee4830',
        'rgb(48, 168, 238)': '#30a8ee',
        'rgb(92, 230, 192)': '#5ce6c0',
        'rgb(232, 72, 213)': '#e848d5',
        'rgb(230, 232, 72)': '#e6e848'
      },
      COLOR: [
        'rgb(238, 72, 48)',
        'rgb(48, 168, 238)',
        'rgb(92, 230, 192)',
        'rgb(232, 72, 213)',
        'rgb(230, 232, 72)'
      ]
    },
    wizard: {
      NAME: [
        'Иван',
        'Хуан Себастьян',
        'Мария',
        'Кристоф',
        'Виктор',
        'Юлия',
        'Люпита',
        'Вашингтон'
      ],
      LAST_NAME: [
        'да Марья',
        'Верон',
        'Мирабелла',
        'Вальц',
        'Онопко',
        'Топольницкая',
        'Нионго',
        'Ирвинг'
      ],
      COAT: [
        'rgb(101, 137, 164)',
        'rgb(241, 43, 107)',
        'rgb(146, 100, 161)',
        'rgb(56, 159, 117)',
        'rgb(215, 210, 55)',
        'rgb(0, 0, 0)'
      ],
      EYES: [
        'black',
        'red',
        'blue',
        'yellow',
        'green'
      ]
    },
    createWizardData: function () {
      var wizardGroup = [];
      window.data.wizard.NAME.sort(window.data.getCompareRandom);
      window.data.wizard.LAST_NAME.sort(window.data.getCompareRandom);
      window.data.wizard.COAT.sort(window.data.getCompareRandom);
      window.data.wizard.EYES.sort(window.data.getCompareRandom);

      for (var i = 0; i < window.data.WIZARD_LENGTH; i++) {
        var wizard = getWizard(i);
        wizardGroup.push(wizard);
      }

      return wizardGroup;
    },
    getCompareRandom: function () {
      return Math.random() - 0.5;
    }
  };
})();
