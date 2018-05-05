'use strict';
(function () {
  var code = {ESC: 27, ENTER: 13};
  var setupOpen = document.querySelector('.setup-open img');
  var form = window.wizard.setup.querySelector('.setup-wizard-form');
  var setupClose = window.wizard.setup.querySelector('.setup-close');
  var userName = window.wizard.setup.querySelector('.setup-user-name');
  var fireball = window.wizard.setup.querySelector('.setup-fireball');
  var dialogHandle = window.wizard.setup.querySelector('.setup-user-pic + input');

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
      window.wizard.setup.classList.add('hidden');
    }, window.backend.errorMessage);
    evt.preventDefault();
  };

  // установка цвета фаерболла
  var setFireballColor = function (target, value) {
    var result = window.data.fireball.Convert[window.wizard.getNextElement(value, window.data.fireball.COLOR)];
    target.style.background = result;
    window.wizard.player.querySelector('input[name=fireball-color]').value = result;
  };

  // закрывает окно настройки персонажа
  var closePopup = function () {
    window.wizard.setup.classList.add('hidden');
  };

  // открывает окно настройки персонажа
  var openPopup = function (evt) {
    switch (evt.target) {
      case setupOpen:
        window.wizard.setup.classList.remove('hidden');
        break;
      case setupClose:
        if (evt.type === 'click') {
          closePopup();
        } else {
          onPopupEnterPress(evt);
        }
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

          window.wizard.setup.style.top = (window.wizard.setup.offsetTop - shift.y) + 'px';
          window.wizard.setup.style.left = (window.wizard.setup.offsetLeft - shift.x) + 'px';
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
