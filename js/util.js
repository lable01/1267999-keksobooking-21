'use strict';

(() => {
  const COORDINAT_COEFFICIENT = 2;
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
  window.util = {
    getRandomNumber,
    getRandomArray,
    COORDINAT_COEFFICIENT
  };
})();
