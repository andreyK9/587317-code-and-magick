'use strict';
(function () {
  var similar = document.querySelector('.setup-similar');
  var similarList = document.querySelector('.setup-similar-list');

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
  var getWizardTemplate = function (wizard) {
    var template = document.querySelector('#similar-wizard-template').content.cloneNode(true);

    setWizardName(template, wizard.name);
    setWizardCoatColor(template, wizard.colorCoat);
    setWizardEyesColor(template, wizard.colorEyes);

    return template;
  };

  var successResponse = function (wizardList) {
    var fragment = document.createDocumentFragment();
    wizardList.sort(window.data.getCompareRandom);

    for (var i = 0; i < window.data.WIZARD_LENGTH; i++) {
      var template = getWizardTemplate(wizardList[i]);
      fragment.appendChild(template);
    }
    similarList.appendChild(fragment);
    similar.classList.remove('hidden');
  };

  window.wizard = {
    renderWizarGroup: function () {
      window.backend.load(successResponse, window.backend.errorMessage);
    }
  };
})();
