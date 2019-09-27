'use strict';

var keycodes = {
  ENTER_KEYCODE: 13,
  ESC_KEYCODE: 27
};
var WIZARDS_COUNT = 4;
var wizardData = {
  NAMES: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  SURNAMES: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  COAT_COLORS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  EYES_COLORS: ['black', 'red', 'blue', 'yellow', 'green'],
  FIREBALL_COLORS: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']
};

var similarListElement = document.querySelector('.setup-similar-list');
var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var setupNameInput = setup.querySelector('.setup-user-name');
var setupWizardCoat = setup.querySelector('.setup-wizard .wizard-coat');
var setupWizardCoatInput = document.querySelector('input[name="coat-color"]');
var setupWizardEyes = setup.querySelector('.setup-wizard .wizard-eyes');
var setupWizardEyesInput = document.querySelector('input[name="eyes-color"]');
var setupFireball = setup.querySelector('.setup-fireball-wrap');
var setupFireballInput = setupFireball.querySelector('input');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === keycodes.ESC_KEYCODE) {
    closePopup();
  }
};

var wizardCoatClickHandler = function () {
  setupWizardCoatInput.value = getRandomArrayElement(wizardData.COAT_COLORS);
  setupWizardCoat.style.fill = setupWizardCoatInput.value;
};

var wizardEyesClickHandler = function () {
  setupWizardEyesInput.value = getRandomArrayElement(wizardData.EYES_COLORS);
  setupWizardEyes.style.fill = setupWizardEyesInput.value;
};

var fireballClickHandler = function () {
  setupFireballInput.value = getRandomArrayElement(wizardData.FIREBALL_COLORS);
  setupFireball.style.backgroundColor = setupFireballInput.value;
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
  setupWizardCoat.addEventListener('click', wizardCoatClickHandler);
  setupWizardEyes.addEventListener('click', wizardEyesClickHandler);
  setupFireball.addEventListener('click', fireballClickHandler);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
  setupWizardCoat.removeEventListener('click', wizardCoatClickHandler);
  setupWizardEyes.removeEventListener('click', wizardEyesClickHandler);
  setupFireball.removeEventListener('click', fireballClickHandler);
};

var getRandomBool = function () {
  return Math.random() >= 0.5;
};

var getRandomArrayElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
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

var renderWizards = function (wizardsCount) {
  var wizards = [];
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizardsCount; i++) {
    wizards[i] = generateWizard();
    fragment.appendChild(renderWizard(wizards[i]));
  }
  return fragment;
};

var initSetup = function () {
  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    if (evt.keyCode === keycodes.ENTER_KEYCODE) {
      openPopup();
    }
  });

  setupNameInput.addEventListener('keydown', function (evt) {
    if (evt.keyCode === keycodes.ESC_KEYCODE) {
      evt.stopPropagation();
    }
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === keycodes.ENTER_KEYCODE) {
      closePopup();
    }
  });
  similarListElement.appendChild(renderWizards(WIZARDS_COUNT));
};

initSetup();
