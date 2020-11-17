'use strict';

const PINS_COUNT = 5;
const adFormHeader = window.form.ad.querySelector(`.ad-form-header`);
const adFormElements = window.form.ad.querySelectorAll(`.ad-form__element`);
const mapFilters = document.querySelectorAll(`.map__filter`);
const mapPins = document.querySelector(`.map__pins`);
const renderPins = (data) => {
  const fragmentPin = document.createDocumentFragment();
  data.forEach((pin) => {
    fragmentPin.appendChild(window.pin.render(pin));
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
  window.map.main.classList.remove(`map--faded`);
  window.form.ad.classList.remove(`ad-form--disabled`);
  adFormHeader.removeAttribute(`disabled`);
  window.form.allElementsActivate(mapFilters);
  window.form.allElementsActivate(adFormElements);
  window.form.addAddressCoords(window.map.getPinCoords());
};

const loadMap = () => {
  window.server.loadData((data) => {
    activatePage();
    renderPins(data.slice(0, PINS_COUNT));
    window.dataMain = data;
  },
  (errorMessage) => {
    const errorElement = document.createElement(`div`);
    errorElement.style = `z-index: 3; margin: 0 auto; text-align: center; background-color: green;`;
    errorElement.style.position = `absolute`;
    errorElement.style.fontSize = `18px`;
    errorElement.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, errorElement);
  });
};

const onLoadMap = () => {
  loadMap();
  window.map.pinMain.removeEventListener(`click`, onLoadMap);
};

window.map.pinMain.addEventListener(`click`, onLoadMap);

window.main = {
  PINS_COUNT,
  deactivatePage,
  renderPins
};
