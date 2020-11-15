'use strict';

(() => {
  const insertBlock = document.querySelector(`.map__filters-container`);
  const map = document.querySelector(`.map`);
  const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);

  /**
   * создает карточку объявления (при этом удаляет открытую карточку в случае повторного создания)
   * @param {*} pin - данные объявления
   * вставляет созданную карточку объявления в DOM
   */
  const createCard = (pin) => {
    const mapCard = map.querySelector(`.map__card`);
    if (mapCard) {
      mapCard.remove();
    }
    const fragmentCard = document.createDocumentFragment();
    fragmentCard.appendChild(renderCard(pin));
    map.insertBefore(fragmentCard, insertBlock);
  };
  /**
   * создание фрагмента документа с удобствами из объявления
   * @param {object} features - объект удобств из объявления
   * @return {object} - фрагмент для вставки в DOM
   */
  const renderFeature = (features) => {
    const featureFragment = document.createDocumentFragment();
    features.forEach((feature) => {
      const featureElement = document.createElement(`li`);
      featureElement.className = `popup__feature popup__feature--` + feature;
      featureFragment.appendChild(featureElement);
    });
    return featureFragment;
  };
  /**
   * Создание фрагмента документа с фотографиями объявления
   * @param {object} photos - объект фотографий из объявления
   * @return {object} - фрагмент для вставки в DOM
   */
  const renderPhotos = (photos) => {
    const photosFragment = document.createDocumentFragment();
    const photoElement = document.querySelector(`#card`).content.querySelector(`.popup__photo`);
    photos.forEach((photo) => {
      const photosElement = photoElement.cloneNode(true);
      photosElement.src = photo;
      photosFragment.appendChild(photosElement);
    });
    return photosFragment;
  };

  /**
   * Создание шаблона карточки объявления для заполнения фрагмента
   * @param {object} pin - данные объявлении
   * @return {object} шаблон объявление с заполненными данными
   */
  const renderCard = (pin) => {
    const cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector(`h3`).textContent = pin.offer.title;
    cardElement.querySelector(`.popup__text--address`).textContent = pin.offer.adress;
    cardElement.querySelector(`.popup__text--price`).textContent = `${pin.offer.price} ₽/ночь`;
    cardElement.querySelector(`.popup__type`).textContent = pin.offer.adsTypeRus;
    cardElement.querySelector(`.popup__text--capacity`).textContent = `${pin.offer.rooms} комнаты для ${pin.offer.guests} гостей`;
    cardElement.querySelector(`.popup__text--time`).textContent = `Заезд после ${pin.offer.checkin}, выезд до ${pin.offer.checkout}`;
    cardElement.querySelector(`.popup__features`).innerHTML = ``;
    cardElement.querySelector(`.popup__features`).appendChild(renderFeature(pin.offer.features));
    cardElement.querySelector(`.popup__description`).textContent = pin.offer.description;
    cardElement.querySelector(`.popup__photos`).innerHTML = ``;
    cardElement.querySelector(`.popup__photos`).appendChild(renderPhotos(pin.offer.photos));
    cardElement.querySelector(`.popup__avatar`).src = pin.author.avatar;

    const cardClose = cardElement.querySelector(`.popup__close`);
    const cardElementClose = () => {
      cardElement.remove();
    };
    cardClose.addEventListener(`click`, () => {
      cardElementClose();
    });
    cardClose.addEventListener(`keydown`, (evt) => {
      if (evt.key === `Escape`) {
        evt.preventDefault();
        cardElementClose();
      }
    });
    return cardElement;
  };
  window.card = {
    createCard
  };
})();
