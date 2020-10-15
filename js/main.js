'use strict';

var ADS_NUMBER = 8;

var AVATAR_IMG = [`img/avatars/user01.png`, `img/avatars/user02.png`, `img/avatars/user03.png`, `img/avatars/user04.png`, `img/avatars/user05.png`, `img/avatars/user06.png`, `img/avatars/user07.png`, `img/avatars/user08.png`];

var ADS_TITLE = [`Первое предложение`, `Второе предложение`, `Третье предложение`];

var PRICE_MIN = 2000;

var PRICE_MAX = 20000;

var ADS_TYPE = [`palace`, `flat`, `house`, `bungalo`];

var ROOMS = [1, 2, 3, 4];

var GUESTS = [1, 2, 3, 4];

var CHECKIN = [`12:00`, `13:00`, `14:00`];

var CHECKOUT = [`12:00`, `13:00`, `14:00`];

var FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];

var DESCRIPTIONS = [`Описание первое`, `Описание второе`, `Описание третье`];

var PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];

var X_MIN = 0;

var X_MAX = 1200;

var Y_MIN = 130;

var Y_MAX = 630;

var PIN_X = 40;

var PIN_Y = 40;

/**
 * Ищет случайное число
 * @param {Number} min - минимальное значение
 * @param {Number} max - максимальное значения
 * @return {Number} - случайное значение
 */
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
/**
 * Формирует случайный массив
 * @param {object} array - массив
 * @return {object} - случайный массив
 */
var getRandomArray = function (array) {
  return array.filter(function () {
    return getRandomNumber(0, array.length - 1);
  });
};

var pins = [];
for (var i = 0; i < ADS_NUMBER; i++) {
  pins.push({
    author: {
      avatar: AVATAR_IMG[i]
    },
    offer: {
      title: ADS_TITLE[getRandomNumber(0, ADS_TITLE.length - 1)],
      adress: `getRandomNumber(X_MIN, X_MAX), getRandomNumber(Y_MIN, Y_MAX)`,
      price: getRandomNumber(PRICE_MIN, PRICE_MAX),
      type: ADS_TYPE[getRandomNumber(0, ADS_TYPE.length - 1)],
      rooms: ROOMS[getRandomNumber(0, ROOMS.length - 1)],
      guest: GUESTS[getRandomNumber(0, GUESTS.length - 1)],
      checkin: CHECKIN[getRandomNumber(0, CHECKIN.length - 1)],
      checkout: CHECKOUT[getRandomNumber(0, CHECKOUT.length - 1)],
      features: getRandomArray(FEATURES),
      description: DESCRIPTIONS[getRandomNumber(0, DESCRIPTIONS.length - 1)],
      photos: getRandomArray(PHOTOS),
    },
    location: {
      x: getRandomNumber(X_MIN, X_MAX),
      y: getRandomNumber(Y_MIN, Y_MAX)
    }
  });
}

var map = document.querySelector(`.map`);
map.classList.remove(`map--faded`);

var mapPins = document.querySelector(`.map__pins`);

var pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
/**
 * Создание элемента объявления для заполнения фрагмента
 * @param {object} pin - информация об объявлении
 * @return {object} объект объявление с заполненными данными
 */
var renderPin = function (pin) {
  var adElement = pinTemplate.cloneNode(true);

  adElement.style.left = pin.location.x - PIN_X / 2 + `px`;
  adElement.style.top = pin.location.y - PIN_Y + `px`;
  adElement.querySelector(`img`).src = pin.author.avatar;
  adElement.alt = pin.offer.title;

  return adElement;
};

var fragment = document.createDocumentFragment();
for (i = 0; i < pins.length; i++) {
  fragment.appendChild(renderPin(pins[i]));
}

mapPins.appendChild(fragment);
