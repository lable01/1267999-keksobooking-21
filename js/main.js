'use strict';

const ADS_NUMBER = 8;

const map = document.querySelector(`.map`);
const mapPinMain = document.querySelector(`.map__pin--main`);
const adForm = document.querySelector(`.ad-form`);
const adFormHeader = adForm.querySelector(`.ad-form-header`);
const adFormElements = adForm.querySelectorAll(`.ad-form__element`);
const mapFilters = document.querySelectorAll(`.map__filter`);
const mapPins = document.querySelector(`.map__pins`);
const addressCoordinates = document.querySelector(`#address`);
const coordinateButton = {
  X: 600,
  Y: 250,
};
const createPins = window.data.createAdverts(ADS_NUMBER);
const renderPins = () => {
  const fragmentPin = document.createDocumentFragment();
  createPins.forEach((pin) => {
    fragmentPin.appendChild(window.pin.renderPin(pin));
  });
  mapPins.appendChild(fragmentPin);
};

const deactivatePage = () => {
  adFormHeader.setAttribute(`disabled`, `disabled`);
  window.form.allElementsDisabled(adFormElements);
  window.form.allElementsDisabled(mapFilters);
};
deactivatePage();
const activatePage = () => {
  map.classList.remove(`map--faded`);
  adForm.classList.remove(`ad-form--disabled`);
  adFormHeader.removeAttribute(`disabled`);
  window.form.allElementsActivate(mapFilters);
  window.form.allElementsActivate(adFormElements);
  renderPins();
};
mapPinMain.addEventListener(`click`, () => {
  activatePage();
  addressCoordinates.value = `${coordinateButton.X}, ${coordinateButton.Y}`;
});
