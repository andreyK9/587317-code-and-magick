'use strict';
(function () {
  var setup = document.querySelector('.setup');
  var dialogHandle = setup.querySelector('.setup-user-pic + input');
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

    var onMouseUp = function (upEvt) {

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('click', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('click', onMouseUp);
  });
})();
