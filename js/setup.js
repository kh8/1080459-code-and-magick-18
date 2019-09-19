'use strict';

var WIZARDS_COUNT = 4;
var wizardData = {
  NAMES: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  SURNAMES: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  COAT_COLORS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  EYES_COLORS: ['black', 'red', 'blue', 'yellow', 'green']
};

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

var generateWizard = function () {
  return {name: (Math.random() >= 0.5) ? wizardData.NAMES[Math.floor(Math.random() * wizardData.NAMES.length)].concat(' ' + wizardData.SURNAMES[Math.floor(Math.random() * wizardData.SURNAMES.length)]) : wizardData.SURNAMES[Math.floor(Math.random() * wizardData.SURNAMES.length)].concat(' ' + wizardData.NAMES[Math.floor(Math.random() * wizardData.NAMES.length)]), coatColor: wizardData.COAT_COLORS[Math.floor((Math.random() * wizardData.COAT_COLORS.length))], eyesColor: wizardData.EYES_COLORS[Math.floor((Math.random() * wizardData.EYES_COLORS.length))]};
};


var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  return wizardElement;
};

var renderFragment = function (fragment) {
  var wizards = [];
  for (var i = 0; i < WIZARDS_COUNT; i++) {
    wizards[i] = generateWizard();
    fragment.appendChild(renderWizard(wizards[i]));
  }
};

var fragment = document.createDocumentFragment();
renderFragment(fragment);
similarListElement.appendChild(fragment);
userDialog.querySelector('.setup-similar').classList.remove('hidden');
