'use strict';

// const ADS_NUMBER = 8;
const adForm = document.querySelector(`.ad-form`);
const adFormHeader = adForm.querySelector(`.ad-form-header`);
const adFormElements = adForm.querySelectorAll(`.ad-form__element`);
const mapFilters = document.querySelectorAll(`.map__filter`);
const mapPins = document.querySelector(`.map__pins`);
// const createPins = window.data.createAdverts(ADS_NUMBER);
const renderPins = (data) => {
  const fragmentPin = document.createDocumentFragment();
  data.forEach((pin) => {
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
  window.map.map.classList.remove(`map--faded`);
  adForm.classList.remove(`ad-form--disabled`);
  adFormHeader.removeAttribute(`disabled`);
  window.form.allElementsActivate(mapFilters);
  window.form.allElementsActivate(adFormElements);
  window.form.addAdressCoords(window.map.getPinCoords());
  window.map.getPinCoords();
};
window.map.mapPinMain.addEventListener(`click`, () => {
  window.load.loadData((data) => {
    activatePage();
    renderPins(data);
  },
  (errorMessage) => {
    const errorElement = document.createElement(`div`);
    errorElement.style = `z-index: 3; margin: 0 auto; text-align: center; background-color: green;`;
    errorElement.style.position = `absolute`;
    errorElement.style.fontSize = `18px`;
    errorElement.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, errorElement);
  }
  );
});
