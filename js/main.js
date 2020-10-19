'use strict';

const ADS_NUMBER = 8;

const AVATAR_IMG = [`img/avatars/user01.png`, `img/avatars/user02.png`, `img/avatars/user03.png`, `img/avatars/user04.png`, `img/avatars/user05.png`, `img/avatars/user06.png`, `img/avatars/user07.png`, `img/avatars/user08.png`];

const ADS_TITLE = [`Первое предложение`, `Второе предложение`, `Третье предложение`];

const price = {
  MIN: 2000,
  MAX: 20000
}

const ADS_TYPE = [`palace`, `flat`, `house`, `bungalo`];

const ROOMS = [1, 2, 3, 4];

const GUESTS = [1, 2, 3, 4];

const CHECKIN = [`12:00`, `13:00`, `14:00`];

const CHECKOUT = [`12:00`, `13:00`, `14:00`];

const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];

const DESCRIPTIONS = [`Описание первое`, `Описание второе`, `Описание третье`];

const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];

const X_MIN = 0;

const X_MAX = 1200;

const Y_MIN = 130;

const Y_MAX = 630;

const PIN_X = 40;

const PIN_Y = 40;

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
      adress: `getRandomNumber(X_MIN, X_MAX), getRandomNumber(Y_MIN, Y_MAX)`,
      price: getRandomNumber(price.MIN, price.MAX),
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

const map = document.querySelector(`.map`);
map.classList.remove(`map--faded`);

const mapPins = document.querySelector(`.map__pins`);
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

/**
 * Создание элемента объявления для заполнения фрагмента
 * @param {object} pin - информация об объявлении
 * @return {object} объект объявление с заполненными данными
 */
const renderPin = (pin) => {
  const adElement = pinTemplate.cloneNode(true);

  adElement.style.left = pin.location.x - PIN_X / 2 + `px`;
  adElement.style.top = pin.location.y - PIN_Y + `px`;
  adElement.querySelector(`img`).src = pin.author.avatar;
  adElement.alt = pin.offer.title;

  return adElement;
};

const fragment = document.createDocumentFragment();
for (let i = 0; i < pins.length; i++) {
  fragment.appendChild(renderPin(pins[i]));
}

mapPins.appendChild(fragment);
//module3-2
//шаблон карточки-объявления
var mapCard = document.querySelector('.map-card');

// перед этим элементом вставлю элемент по шаблону card 
var insertBlock = document.querySelector('.map__filters-container');
var mapCardCopy = map.appendChild(mapCard.cloneNode(true));
map.insertBefore(mapCardCopy, insertBlock);


// var cardTemplateAddsTitle = document.querySelector(`#card`).content.querySelector('.popup-title');

// var renderCard = function () {
//   const adElement = cardTemplateAddsTitle.cloneNode(true);
//   return adElement;
// }
// const fragmentCard = document.createDocumentFragment();
// var oneElement = fragmentCard.appendChild(renderCard(pins[0]));

// document.querySelector('.map').insertBefore(oneElement, insertBlock);


