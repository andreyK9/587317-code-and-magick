'use strict';
(function () {
  var setup = document.querySelector('.setup');
  var dialogHandle = setup.querySelector('.setup-user-pic + input');
  dialogHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onInputPreventDefault = function (upEvt) {
      upEvt.preventDefault();
      dialogHandle.removeEventListener('click', onInputPreventDefault);
    };

    var onMouseMove = function (moveEvt) {
      if (!moveEvt.defaultPrevented) {
        dialogHandle.addEventListener('click', onInputPreventDefault);
      }

      moveEvt.preventDefault();

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

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
