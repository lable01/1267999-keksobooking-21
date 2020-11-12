'use strict';

(() => {
  const ADS_TITLE = [
    `Первое предложение`,
    `Второе предложение`,
    `Третье предложение`
  ];
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
  const FEATURES = [
    `wifi`,
    `dishwasher`,
    `parking`,
    `washer`,
    `elevator`,
    `conditioner`
  ];
  const DESCRIPTIONS = [
    `Описание первое`,
    `Описание второе`,
    `Описание третье`
  ];
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
  const createAdverts = (count) => {
    const pins = [];
    for (let i = 0; i < count; i++) {
      pins.push({
        author: {
          avatar: `img/avatars/user0` + [i + 1] + `.png`
        },
        offer: {
          title: ADS_TITLE[window.util.getRandomNumber(0, ADS_TITLE.length - 1)],
          adress: [window.util.getRandomNumber(Coordinates.X_MIN, Coordinates.X_MAX), window.util.getRandomNumber(Coordinates.Y_MIN, Coordinates.Y_MAX)],
          price: window.util.getRandomNumber(Price.MIN, Price.MAX),
          type: ADS_TYPE[window.util.getRandomNumber(0, ADS_TYPE.length - 1)],
          rooms: window.util.getRandomNumber(Rooms.MIN, Rooms.MAX),
          guest: window.util.getRandomNumber(Guests.MIN, Guests.MAX),
          checkin: CHECKOUT[window.util.getRandomNumber(0, CHECKOUT.length - 1)],
          checkout: CHECKOUT[window.util.getRandomNumber(0, CHECKOUT.length - 1)],
          features: window.util.getRandomArray(FEATURES),
          description: DESCRIPTIONS[window.util.getRandomNumber(0, DESCRIPTIONS.length - 1)],
          photos: window.util.getRandomArray(PHOTOS),
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
    Price,
    ADS_TYPE_RUS,
    createAdverts,
    Coordinates
  };
})();
