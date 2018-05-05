'use strict';
(function () {
  var setup = document.querySelector('.setup');
  var player = setup.querySelector('.setup-player');
  var wizardEyes = setup.querySelector('.wizard-eyes');
  var wizardCoat = setup.querySelector('.wizard-coat');
  var wizard = {
    onEyesChange: function () {},
    onCoatChange: function () {}
  };
  // выбирает новый цвет
  var getNextElement = function (current, arr) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] === current) {
        if (i === arr.length - 1) {
          return arr[0];
        }
        return arr[++i];
      }
    }
    return arr[0];
  };

  // установка цвета мантии персонажа
  var setCoatColor = function (value) {
    var result = getNextElement(value, window.data.wizard.COAT);
    wizardCoat.style.fill = result;
    player.querySelector('input[name=coat-color]').value = result;
    wizard.onCoatChange(result);
  };

  // установка цвета глаз персонажа
  var setEyesColor = function (value) {
    var result = getNextElement(value, window.data.wizard.EYES);
    wizardEyes.style.fill = result;
    player.querySelector('input[name=eyes-color]').value = result;
    wizard.onEyesChange(result);
  };

  // смена цвета глаз персонажа
  var onUserEyesClick = function () {
    var color = wizardEyes.style.fill;
    if (!color) {
      color = 'black';
    }
    setEyesColor(color);
  };

  // смена цвета мантии персонажа
  var onUserCoatClick = function () {
    var color = wizardCoat.style.fill;
    setCoatColor(color);
  };

  wizardEyes.addEventListener('click', onUserEyesClick);
  wizardCoat.addEventListener('click', onUserCoatClick);

  window.wizard = {
    setup: setup,
    player: player,
    getNextElement: getNextElement,
    user: wizard
  };
})();
