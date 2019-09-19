'use strict';

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var wizards = [];

var generateWizard = function () {
  var generateWizardName = function () {
    return (Math.random() >= 0.5) ? WIZARD_NAMES[Math.floor(Math.random() * WIZARD_NAMES.length)].concat(' ' + WIZARD_SURNAMES[Math.floor(Math.random() * WIZARD_SURNAMES.length)]) : WIZARD_SURNAMES[Math.floor(Math.random() * WIZARD_SURNAMES.length)].concat(' ' + WIZARD_NAMES[Math.floor(Math.random() * WIZARD_NAMES.length)]);
  };

  var generateWizardCoat = function () {
    return WIZARD_COAT_COLORS[Math.floor((Math.random() * WIZARD_COAT_COLORS.length))];
  };

  var generateWizardEyes = function () {
    return WIZARD_EYES_COLORS[Math.floor((Math.random() * WIZARD_EYES_COLORS.length))];
  };

  var wizard = {};
  wizard.name = generateWizardName();
  wizard.coatColor = generateWizardCoat();
  wizard.eyesColor = generateWizardEyes();
  return wizard;
};


var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < 4; i++) {
  wizards[i] = generateWizard();
  fragment.appendChild(renderWizard(wizards[i]));
}

similarListElement.appendChild(fragment);
userDialog.querySelector('.setup-similar').classList.remove('hidden');
