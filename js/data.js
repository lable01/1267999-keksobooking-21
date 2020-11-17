'use strict';

(() => {
  const adsTypeRus = {
    palace: `Дворец`,
    flat: `Квартира`,
    house: `Дом`,
    bungalow: `Бунгало`,
  };
  const Coordinates = {
    X_MIN: 0,
    X_MAX: 1200,
    Y_MIN: 130,
    Y_MAX: 630,
  };
  window.data = {
    Coordinates,
    adsTypeRus,
  };
})();
