'use strict';

(() => {
  const adForm = document.querySelector(`.ad-form`);
  const mainPage = document.querySelector(`main`);
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
  const housingMaxPrice = {
    bungalow: 999,
    flat: 4999,
    house: 9999,
    palace: Infinity
  };
  const roomValues = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
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

  const addAddressCoords = (coords) => {
    addressCoordinates.value = coords;
  };

  const checkRooms = (quantity) => {
    const capacityOptions = capacityNumber.querySelectorAll(`option`);
    capacityOptions.forEach((option) => {
      option.disabled = true;
    });
    roomValues[quantity].forEach((setAmount) => {
      capacityOptions.forEach((option) => {
        if (Number(option.value) === setAmount) {
          option.disabled = false;
          option.selected = true;
        }
      });
    });
  };

  const onOptionChange = (evt) => {
    adFormTimeInInput.value = evt.target.value;
    adFormTimeOutInput.value = evt.target.value;
  };

  adFormTimeInInput.addEventListener(`change`, onOptionChange);
  adFormTimeOutInput.addEventListener(`change`, onOptionChange);


  adFormHousingTypeSelect.addEventListener(`change`, () => {
    priceRoom.placeholder = housingMinPrice[adFormHousingTypeSelect.value];
    priceRoom.setAttribute(`min`, housingMinPrice[adFormHousingTypeSelect.value]);
    priceRoom.setAttribute(`max`, housingMaxPrice[adFormHousingTypeSelect.value]);
  });

  roomNumber.addEventListener(`change`, () => {
    checkRooms(roomNumber.value);
  });

  const showSuccessMessage = () => {
    const successTemplate = formSucces.content.querySelector(`.success`);
    const successMessage = successTemplate.cloneNode(true);
    mainPage.appendChild(successMessage);
    const onCloseSucess = () => {
      successMessage.remove();
      document.addEventListener(`click`, onCloseSucess);
    };
    document.addEventListener(`click`, onCloseSucess);
    const onCloseSuccesEscape = (evt) => {
      if (evt.key === `Escape`) {
        successMessage.remove();
      }
      document.removeEventListener(`keydown`, onCloseSuccesEscape);
    };
    document.addEventListener(`keydown`, onCloseSuccesEscape);
  };

  const showErrorMessage = () => {
    const errorTemplate = document.querySelector(`#error`).content.querySelector(`.error`);
    const errorMessage = errorTemplate.cloneNode(true);
    mainPage.appendChild(errorMessage);
    errorMessage.querySelector(`.error__button`).addEventListener(`click`, () => {
      errorMessage.remove();
    });
    errorMessage.addEventListener(`click`, () => {
      errorMessage.remove();
    });
    const onCloseError = (evt) => {
      if (evt.key === `Escape`) {
        errorMessage.remove();
      }
      document.removeEventListener(`keydown`, onCloseError);
    };
    document.addEventListener(`keydown`, onCloseError);
  };
  const deactivatePage = () => {
    window.main.deactivateForm();
    window.map.main.classList.add(`map--faded`);
    adForm.classList.add(`ad-form--disabled`);
    window.card.remove();
    window.pin.remove();
    adForm.reset();
    window.filter.reset();
    window.map.pinMain.addEventListener(`click`, window.main.onLoadMap);
  };

  adForm.addEventListener(`submit`, (evt) => {
    window.server.uploadData(new FormData(adForm), showSuccessMessage, showErrorMessage);
    evt.preventDefault();
    deactivatePage();
    window.map.setMainPinCenter();
  });

  adForm.addEventListener(`reset`, () => {
    deactivatePage();
  });


  window.form = {
    ad: adForm,
    roomNumber,
    allElementsDisabled,
    allElementsActivate,
    addAddressCoords,
    checkRooms
  };
})();
