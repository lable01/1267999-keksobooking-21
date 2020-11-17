'use strict';

(() => {
  const adsTitle = [
    `Первое предложение`,
    `Второе предложение`,
    `Третье предложение`
  ];
  const Price = {
    MIN: 2000,
    MAX: 20000,
  };
  const adsTypeRus = {
    palace: `Дворец`,
    flat: `Квартира`,
    house: `Дом`,
    bungalow: `Бунгало`,
  };
  const adsType = Object.keys(adsTypeRus);
  const Rooms = {
    MIN: 1,
    MAX: 6,
  };
  const Guests = {
    MIN: 1,
    MAX: 6,
  };
  const Checkout = [
    `12:00`,
    `13:00`,
    `14:00`];
  const Features = [
    `wifi`,
    `dishwasher`,
    `parking`,
    `washer`,
    `elevator`,
    `conditioner`
  ];
  const Descriptions = [
    `Описание первое`,
    `Описание второе`,
    `Описание третье`
  ];
  const Photos = [
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
  const createAdverts = (count) => {
    const pins = [];
    for (let i = 0; i < count; i++) {
      pins.push({
        author: {
          avatar: `img/avatars/user0` + [i + 1] + `.png`
        },
        offer: {
          title: adsTitle[window.util.getRandomNumber(0, adsTitle.length - 1)],
          adress: [window.util.getRandomNumber(Coordinates.X_MIN, Coordinates.X_MAX), window.util.getRandomNumber(Coordinates.Y_MIN, Coordinates.Y_MAX)],
          price: window.util.getRandomNumber(price.MIN, price.MAX),
          type: adsType[window.util.getRandomNumber(0, adsType.length - 1)],
          rooms: window.util.getRandomNumber(rooms.MIN, rooms.MAX),
          guest: window.util.getRandomNumber(guests.MIN, guests.MAX),
          checkin: checkout[window.util.getRandomNumber(0, checkout.length - 1)],
          checkout: checkout[window.util.getRandomNumber(0, checkout.length - 1)],
          features: window.util.getRandomArray(features),
          description: descriptions[window.util.getRandomNumber(0, descriptions.length - 1)],
          photos: window.util.getRandomArray(photos),
        },
        location: {
          x: window.util.getRandomNumber(Coordinates.X_MIN, Coordinates.X_MAX),
          y: window.util.getRandomNumber(Coordinates.Y_MIN, Coordinates.Y_MAX)
        }
      });
    }
    return pins;
  };
  window.data = {
    Coordinates,
    adsTypeRus,
    price,
    createAdverts
  };
})();
