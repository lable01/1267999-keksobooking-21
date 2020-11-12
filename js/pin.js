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
    pinElement.style.left = pin.location.x - PIN / 2 + `px`;
    pinElement.style.top = pin.location.y - PIN + `px`;
    pinElement.querySelector(`img`).src = pin.author.avatar;
    pinElement.alt = pin.offer.title;
    /**
     * Обработчик события клика на pin объявления
     * @return открывает карточку объявления при клике
     */
    pinElement.addEventListener(`click`, () => {
      window.card.createCard(pin);
    });
    pinElement.addEventListener(`keydown`, (evt) => {
      if (evt.key === `Enter`) {
        evt.preventDefault();
        window.card.createCard(pin);
      }
    });
    return pinElement;
  };

  window.pin = {
    renderPin
  };
})();
