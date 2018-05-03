'use strict';
(function () {
  var wizardData = window.data.createWizardData();
  var template = window.wizard.getWizardGroup(wizardData);
  window.wizard.renderWizardGroup(template);

  window.dialog.addPopupListener();
  window.dialog.addMoveListener();

})();
