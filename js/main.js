'use strict';

const ADS_NUMBER = 8;
const AVATAR_IMG = [
  `img/avatars/user01.png`,
  `img/avatars/user02.png`,
  `img/avatars/user03.png`,
  `img/avatars/user04.png`,
  `img/avatars/user05.png`,
  `img/avatars/user06.png`,
  `img/avatars/user07.png`,
  `img/avatars/user08.png`
];
const ADS_TITLE = [`Первое предложение`, `Второе предложение`, `Третье предложение`];
const Price = {
  MIN: 2000,
  MAX: 20000,
};
const ADS_TYPE_RUS = {
  palace: `Дворец`,
  flat: `Квартира`,
  house: `Дом`,
  bungalow: `Бунгало`,
};
const ADS_TYPE = Object.keys(ADS_TYPE_RUS);

const Rooms = {
  MIN: 1,
  MAX: 6,
};
const Guests = {
  MIN: 1,
  MAX: 6,
};
const CHECKOUT = [`12:00`, `13:00`, `14:00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const DESCRIPTIONS = [`Описание первое`, `Описание второе`, `Описание третье`];
const PHOTOS = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
];
const Coordinates = {
  X_MIN: 0,
  X_MAX: 1200,
  Y_MIN: 130,
  Y_MAX: 630,
};
const PIN = 40;

/**
 * Ищет случайное число
 * @param {Number} min - минимальное значение
 * @param {Number} max - максимальное значения
 * @return {Number} - случайное значение
 */
const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Формирует случайный массив
 * @param {object} array - массив
 * @return {object} - случайный массив
 */
const getRandomArray = (array) => {
  return array.filter(function () {
    return getRandomNumber(0, array.length - 1);
  });
};

const pins = [];
for (let i = 0; i < ADS_NUMBER; i++) {
  pins.push({
    author: {
      avatar: AVATAR_IMG[i]
    },
    offer: {
      title: ADS_TITLE[getRandomNumber(0, ADS_TITLE.length - 1)],
      adress: [getRandomNumber(Coordinates.X_MIN, Coordinates.X_MAX), getRandomNumber(Coordinates.Y_MIN, Coordinates.Y_MAX)],
      price: getRandomNumber(Price.MIN, Price.MAX),
      type: ADS_TYPE[getRandomNumber(0, ADS_TYPE.length - 1)],
      rooms: getRandomNumber(Rooms.MIN, Rooms.MAX),
      guest: getRandomNumber(Guests.MIN, Guests.MAX),
      checkin: CHECKOUT[getRandomNumber(0, CHECKOUT.length - 1)],
      checkout: CHECKOUT[getRandomNumber(0, CHECKOUT.length - 1)],
      features: getRandomArray(FEATURES),
      description: DESCRIPTIONS[getRandomNumber(0, DESCRIPTIONS.length - 1)],
      photos: getRandomArray(PHOTOS),
    },
    location: {
      x: getRandomNumber(Coordinates.X_MIN, Coordinates.X_MAX),
      y: getRandomNumber(Coordinates.Y_MIN, Coordinates.Y_MAX)
    }
  });
}

const map = document.querySelector(`.map`);
const mapPins = document.querySelector(`.map__pins`);
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
/**
 * открывает карточку объявления (при этом удаляет открытую карточку в случае повторного открытия)
 * @param {*} pin - данные объявления
 * вставляет карточку объявления в DOM
 */
const mapCardOpen = (pin) => {
  const mapCard = map.querySelector(`.map__card`);
  if (mapCard) {
    mapCard.remove();
  }
  const fragmentCard = document.createDocumentFragment();
  fragmentCard.appendChild(renderCard(pin));
  map.insertBefore(fragmentCard, insertBlock);
};
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
    mapCardOpen(pin);
  });

  pinElement.addEventListener(`keydown`, (evt) => {
    if (evt.key === `Enter`) {
      evt.preventDefault();
      mapCardOpen(pin);
    }
  });
  return pinElement;
};

const renderPins = () => {
  const fragmentPin = document.createDocumentFragment();
  pins.forEach((pin) => {
    fragmentPin.appendChild(renderPin(pin));
  });
  mapPins.appendChild(fragmentPin);
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
  cardElement.querySelector(`.popup__type`).textContent = ADS_TYPE_RUS[pin.offer.type];
  cardElement.querySelector(`.popup__text--capacity`).textContent = `${pin.offer.rooms} комнаты для ${pin.offer.guest} гостей`;
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

const insertBlock = document.querySelector(`.map__filters-container`);
const adForm = document.querySelector(`.ad-form`);
const adFormHeader = document.querySelector(`.ad-form-header`);
const mapPinMain = document.querySelector(`.map__pin--main`);
const adFormElements = document.querySelectorAll(`.ad-form__element`);
const mapFilters = document.querySelectorAll(`.map__filter`);
const adFormSubmit = document.querySelector(`.ad-form__submit`);
const roomNumber = adForm.querySelector(`#room_number`);
const capacityNumber = adForm.querySelector(`#capacity`);
const priceRoom = adForm.querySelector(`#price`);
const addressCoordinates = document.querySelector(`#address`);
const coordinateButton = {
  X: 600,
  Y: 250,
};
const adFormTimeInInput = adForm.querySelector(`#timein`);
const adFormTimeOutInput = adForm.querySelector(`#timeout`);
const adFormHousingTypeSelect = adForm.querySelector(`#type`);
const housingMinPrice = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000
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
  } else if ((priceQuantity < Price.MIN) || (priceQuantity > Price.MAX)) {
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

adFormHeader.setAttribute(`disabled`, `disabled`);
allElementsDisabled(adFormElements);
allElementsDisabled(mapFilters);
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

const activationPage = () => {
  map.classList.remove(`map--faded`);
  adForm.classList.remove(`ad-form--disabled`);
  adFormHeader.removeAttribute(`disabled`);
  allElementsActivate(mapFilters);
  allElementsActivate(adFormElements);
  renderPins();
};

mapPinMain.addEventListener(`click`, () => {
  activationPage();
  addressCoordinates.value = `${coordinateButton.X}, ${coordinateButton.Y}`;
});
