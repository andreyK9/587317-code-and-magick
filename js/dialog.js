'use strict';
(function () {
  var code = {ESC: 27, ENTER: 13};
  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open img');
  var form = setup.querySelector('.setup-wizard-form');
  var setupClose = setup.querySelector('.setup-close');
  var userName = setup.querySelector('.setup-user-name');
  var wizardEyes = setup.querySelector('.wizard-eyes');
  var wizardCoat = setup.querySelector('.wizard-coat');
  var fireball = setup.querySelector('.setup-fireball');
  var player = setup.querySelector('.setup-player');
  var dialogHandle = setup.querySelector('.setup-user-pic + input');

  // закрытие окна по клавише Enter при наведенном фокусе
  var onPopupEnterPress = function (evt) {
    if (evt.keyCode === code.ENTER) {
      closePopup();
    }
  };

  // отмена закрытия окна при выбранном поле "имя персонажа"
  var onUserNameEscPress = function (evt) {
    if (evt.keyCode === code.ESC) {
      evt.stopPropagation();
    }
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

  // смена цвета фаерболла
  var onFireballClick = function (evt) {
    var color = evt.target.parentElement.style.backgroundColor;
    if (!color) {
      color = window.data.fireball.DEFAULT_COLOR;
    }
    setFireballColor(evt.target.parentElement, color);
  };

  var onFormSubmitTouch = function (evt) {
    window.backend.save(new FormData(form), function () {
      setup.classList.add('hidden');
    }, window.wizard.errorMessage);
    evt.preventDefault();
  };

  // установка цвета фаерболла
  var setFireballColor = function (target, value) {
    var result = window.data.fireball.Convert[getNextElement(value, window.data.fireball.COLOR)];
    target.style.background = result;
    player.querySelector('input[name=fireball-color]').value = result;
  };

  // установка цвета мантии персонажа
  var setCoatColor = function (value) {
    var result = getNextElement(value, window.data.wizard.COAT);
    wizardCoat.style.fill = result;
    player.querySelector('input[name=coat-color]').value = result;
  };

  // установка цвета глаз персонажа
  var setEyesColor = function (value) {
    var result = getNextElement(value, window.data.wizard.EYES);
    wizardEyes.style.fill = result;
    player.querySelector('input[name=eyes-color]').value = result;
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

  // закрывает окно настройки персонажа
  var closePopup = function () {
    setup.classList.add('hidden');
  };

  // открывает окно настройки персонажа
  var openPopup = function (evt) {
    switch (evt.target) {
      case setupOpen:
        setup.classList.remove('hidden');
        break;
      case setupClose:
        if (evt.type === 'click') {
          closePopup();
        } else {
          onPopupEnterPress(evt);
        }
        break;
      case wizardEyes:
        onUserEyesClick(evt);
        break;
      case wizardCoat:
        onUserCoatClick(evt);
        break;
      case fireball:
        onFireballClick(evt);
        break;
    }

    if (evt.keyCode === code.ESC) {
      if (evt.target === userName) {
        onUserNameEscPress(evt);
      } else {
        closePopup();
      }
    }
  };

  window.dialog = {
    addMoveListener: function () {
      dialogHandle.addEventListener('mousedown', function (evt) {
        var startCoords = {
          x: evt.clientX,
          y: evt.clientY
        };
        var islistenerInclude = false;
        var changeCoord = startCoords.x + startCoords.y;

        var onInputPreventDefault = function (upEvt) {
          upEvt.preventDefault();
          dialogHandle.removeEventListener('click', onInputPreventDefault);
        };

        var onMouseMove = function (moveEvt) {
          var currentCoord = startCoords.x + startCoords.y;
          if (!islistenerInclude && changeCoord !== currentCoord) {
            islistenerInclude = true;
            dialogHandle.addEventListener('click', onInputPreventDefault);
          }

          var shift = {
            x: startCoords.x - moveEvt.clientX,
            y: startCoords.y - moveEvt.clientY
          };

          startCoords = {
            x: moveEvt.clientX,
            y: moveEvt.clientY
          };

          setup.style.top = (setup.offsetTop - shift.y) + 'px';
          setup.style.left = (setup.offsetLeft - shift.x) + 'px';
        };

        var onMouseUp = function () {
          document.removeEventListener('mousemove', onMouseMove);
          document.removeEventListener('click', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('click', onMouseUp);
      });
    },
    addPopupListener: function () {
      document.addEventListener('click', function (evt) {
        openPopup(evt);
      });
      document.addEventListener('keydown', function (evt) {
        openPopup(evt);
      });
      form.addEventListener('submit', onFormSubmitTouch);
    }
  };

})();
