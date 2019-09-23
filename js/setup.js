'use strict';

var WIZARDS_COUNT = 4;
var wizardData = {
  NAMES: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  SURNAMES: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  COAT_COLORS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  EYES_COLORS: ['black', 'red', 'blue', 'yellow', 'green']
};

var getRandomBool = function () {
  return Math.random() >= 0.5;
};

var getRandomArrayElement = function (arrayLength) {
  return Math.floor(Math.random() * arrayLength);
};

var generateWizard = function () {
  var wizardName = wizardData.NAMES[getRandomArrayElement(wizardData.NAMES.length)];
  var wizardSurname = wizardData.SURNAMES[getRandomArrayElement(wizardData.SURNAMES.length)];
  return {
    name: getRandomBool() ? wizardName + ' ' + wizardSurname : wizardSurname + ' ' + wizardName,
    coatColor: wizardData.COAT_COLORS[getRandomArrayElement(wizardData.COAT_COLORS.length)],
    eyesColor: wizardData.EYES_COLORS[getRandomArrayElement(wizardData.EYES_COLORS.length)]};
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  return wizardElement;
};

var getWizards = function (wizardsCount) {
  var wizards = [];
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizardsCount; i++) {
    wizards[i] = generateWizard();
    fragment.appendChild(renderWizard(wizards[i]));
  }
  return fragment;
};

var initSetup = function () {
  var userDialog = document.querySelector('.setup');
  var similarListElement = document.querySelector('.setup-similar-list');
  similarListElement.appendChild(getWizards(WIZARDS_COUNT));
  userDialog.classList.remove('hidden');
  userDialog.querySelector('.setup-similar').classList.remove('hidden');
};

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
initSetup();
