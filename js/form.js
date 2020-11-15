'use strict';

(() => {
  const adForm = document.querySelector(`.ad-form`);
  const mainPage = document.querySelector(`main`);
  const adFormSubmit = document.querySelector(`.ad-form__submit`);
  const roomNumber = document.querySelector(`#room_number`);
  const capacityNumber = document.querySelector(`#capacity`);
  const priceRoom = document.querySelector(`#price`);
  const adFormTimeInInput = document.querySelector(`#timein`);
  const adFormTimeOutInput = document.querySelector(`#timeout`);
  const adFormHousingTypeSelect = document.querySelector(`#type`);
  const addressCoordinates = document.querySelector(`#address`);
  const formSucces = document.querySelector(`#success`);
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
    } else if ((priceQuantity < window.data.price.MIN) || (priceQuantity > window.data.price.MAX)) {
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

  const showSuccessMessage = () => {
    const successTemplate = formSucces.content.querySelector(`.success`);
    const successMessage = successTemplate.cloneNode(true);
    mainPage.appendChild(successMessage);
    document.addEventListener(`click`, () => {
      successMessage.remove();
    });
    document.addEventListener(`keydown`, (evt) => {
      if (evt.key === `Escape`) {
        successMessage.remove();
      }
    });
  };

  const showErrorMessage = () => {
    const errorTemplate = document.querySelector(`#error`).content.querySelector(`.error`);
    const errorMessage = errorTemplate.cloneNode(true);
    mainPage.appendChild(errorMessage);
    errorMessage.querySelector(`.error__button`).addEventListener(`click`, () =>{
      errorMessage.remove();
    });
    errorMessage.addEventListener(`click`, () => {
      errorMessage.remove();
    });
    document.addEventListener(`keydown`, (evt) => {
      if (evt.key === `Escape`) {
        errorMessage.remove();
      }
    });
  };

  adForm.addEventListener(`submit`, (evt) => {
    window.server.uploadData(new FormData(adForm), showSuccessMessage, showErrorMessage);
    evt.preventDefault();
    window.main.deactivatePage();
    window.pin.removePins();
    window.map.setMainPinCenter();
    adForm.reset();
  });

  adForm.addEventListener(`reset`, () => {
    adForm.reset();
  });

  window.form = {
    adForm,
    allElementsDisabled,
    allElementsActivate,
    addAdressCoords
  };
})();
