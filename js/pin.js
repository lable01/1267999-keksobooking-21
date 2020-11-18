'use strict';

(() => {
  const PIN = 40;
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  /**
   * Создание шаблона объявления для заполнения фрагмента
   * @param {object} pin - данные объявлении
   * @return {object} шаблон объявление с заполненными данными
   */
  const renderPin = (pin) => {
    const pinElement = pinTemplate.cloneNode(true);
    pinElement.style.left = pin.location.x - PIN / window.util.COORDINAT_COEFFICIENT + `px`;
    pinElement.style.top = pin.location.y - PIN + `px`;
    pinElement.querySelector(`img`).src = pin.author.avatar;
    pinElement.alt = pin.offer.title;

    const onPinOpen = () => {
      window.card.create(pin);
      const mapPinsActive = document.querySelectorAll(`.map__pin--active`);
      if (mapPinsActive) {
        mapPinsActive.forEach((element) => {
          element.classList.remove(`map__pin--active`);
        });
        pinElement.classList.add(`map__pin--active`);
      } else {
        pinElement.classList.add(`map__pin--active`);
      }
    };

    pinElement.addEventListener(`click`, onPinOpen);

    pinElement.addEventListener(`keydown`, (evt) => {
      if (evt.key === `Enter`) {
        evt.preventDefault();
        onPinOpen();
      }
      if (evt.key === `Escape`) {
        evt.preventDefault();
        onPinOpen();
      }
    });
    return pinElement;
  };
  /**
   * Удаляет все показанные пины, кроме главной метки
   */
  const removePins = () => {
    const pins = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    pins.forEach((element) => {
      element.remove();
    });
  };

  window.pin = {
    render: renderPin,
    remove: removePins
  };
})();
