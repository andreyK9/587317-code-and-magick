'use strict';
(function () {
  var similar = document.querySelector('.setup-similar');

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

  window.wizard = {
    getWizardGroup: function (wizardList) {
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < window.data.WIZARD_LENGTH; i++) {
        var template = getWizardTemplate(wizardList[i]);
        fragment.appendChild(template);
      }

      return fragment;
    },
    renderWizardGroup: function (fragment) {
      var similarList = document.querySelector('.setup-similar-list');
      similarList.appendChild(fragment);
      similar.classList.remove('hidden');
    }
  };
})();
