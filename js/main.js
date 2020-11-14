'use strict';

const PINS_COUNT = 5;
const adFormHeader = window.form.adForm.querySelector(`.ad-form-header`);
const adFormElements = window.form.adForm.querySelectorAll(`.ad-form__element`);
const mapFilters = document.querySelectorAll(`.map__filter`);
const mapPins = document.querySelector(`.map__pins`);
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
  window.form.adForm.classList.remove(`ad-form--disabled`);
  adFormHeader.removeAttribute(`disabled`);
  window.form.allElementsActivate(mapFilters);
  window.form.allElementsActivate(adFormElements);
  window.form.addAdressCoords(window.map.getPinCoords());
  window.map.getPinCoords();
};
window.map.mapPinMain.addEventListener(`click`, () => {
  window.server.loadData((data) => {
    window.data = data;
    activatePage();
    renderPins(data.slice(0, PINS_COUNT));
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
  window.main = {
    deactivatePage,
    renderPins
  };
});
