'use strict';

var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;
var WIZARDS_COUNT = 4;
var wizardData = {
  NAMES: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  SURNAMES: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  COAT_COLORS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  EYES_COLORS: ['black', 'red', 'blue', 'yellow', 'green'],
  FIREBALL_COLORS: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']
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
  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  };
  var openPopup = function () {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
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
  similarListElement.appendChild(getWizards(WIZARDS_COUNT));

  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openPopup();
    }
  });

  setupNameInput.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      evt.stopPropagation();
    }
  });

  setupWizardCoat.addEventListener('click', function () {
    setupWizardCoatInput.value = getRandomArrayElement(wizardData.COAT_COLORS);
    setupWizardCoat.style.fill = setupWizardCoatInput.value;
  });

  setupWizardEyes.addEventListener('click', function () {
    setupWizardEyesInput.value = getRandomArrayElement(wizardData.EYES_COLORS);
    setupWizardEyes.style.fill = setupWizardEyesInput.value;
  });

  setupFireball.addEventListener('click', function () {
    setupFireballInput.value = getRandomArrayElement(wizardData.FIREBALL_COLORS);
    setupFireball.style.backgroundColor = setupFireballInput.value;
  });


  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closePopup();
    }
  });


  // setup.querySelector('.setup-similar').classList.remove('hidden');
};

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
initSetup();
