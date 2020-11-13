'use strict';

(() => {
  const adFormSubmit = document.querySelector(`.ad-form__submit`);
  const roomNumber = document.querySelector(`#room_number`);
  const capacityNumber = document.querySelector(`#capacity`);
  const priceRoom = document.querySelector(`#price`);
  const adFormTimeInInput = document.querySelector(`#timein`);
  const adFormTimeOutInput = document.querySelector(`#timeout`);
  const adFormHousingTypeSelect = document.querySelector(`#type`);
  const addressCoordinates = document.querySelector(`#address`);
  const housingMinPrice = {
    bungalow: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };
  /**
   * Присвоение атрибута disabled DOM элементам
   * @param {object} elements - элементы из DOM
   * @param {object} element - элемент из DOM
   * элементам в DOM присваевается атрибут disabled
   */
  const allElementsDisabled = (elements) => {
    elements.forEach((element) => {
      element.setAttribute(`disabled`, `disabled`);
    });
  };
  /**
   * Удаление атрибута disabled DOM элементу
   * @param {object} elements - элементы из DOM
   * @param {object} element - элемент из DOM
   */
  const allElementsActivate = (elements) => {
    elements.forEach(function (element) {
      element.removeAttribute(`disabled`);
    });
  };

  const addAdressCoords = (coords) => {
    addressCoordinates.value = coords;
  };

  adFormSubmit.addEventListener(`click`, () => {
    const questQuantity = parseInt(capacityNumber.value, 10);
    const roomQuantity = parseInt(roomNumber.value, 10);
    const priceQuantity = parseInt(priceRoom.value, 10);

    if ((questQuantity === 1) && (roomQuantity === 1)) {
      roomNumber.setCustomValidity(``);
    } else if ((roomQuantity === 2) && ((questQuantity === 1) || (questQuantity === 2))) {
      roomNumber.setCustomValidity(``);
    } else if ((roomQuantity === 3) && ((questQuantity === 1) || (questQuantity === 2) || (questQuantity === 3))) {
      roomNumber.setCustomValidity(``);
    } else if ((roomQuantity === 100) && (questQuantity === 0)) {
      roomNumber.setCustomValidity(``);
    } else if ((priceQuantity < window.data.Price.MIN) || (priceQuantity > window.data.Price.MAX)) {
      priceRoom.setCustomValidity(`Пожалуйста измените значение от 2000 до 20000`);
    } else {
      roomNumber.setCustomValidity(`Введено некорректное значение`);
      priceRoom.setCustomValidity(``);
    }
  });

  const inAndOutInputChange = (evt) => {
    adFormTimeInInput.value = evt.target.value;
    adFormTimeOutInput.value = evt.target.value;
  };

  adFormTimeInInput.addEventListener(`change`, inAndOutInputChange);

  adFormTimeOutInput.addEventListener(`change`, inAndOutInputChange);

  adFormHousingTypeSelect.addEventListener(`change`, () => {
    priceRoom.placeholder = housingMinPrice[adFormHousingTypeSelect.value];
    priceRoom.setAttribute(`min`, housingMinPrice[adFormHousingTypeSelect.value]);
  });
  window.form = {
    allElementsDisabled,
    allElementsActivate,
    addAdressCoords
  };
})();
