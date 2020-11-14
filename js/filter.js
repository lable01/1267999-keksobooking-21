'use strict';

(() => {
  const DEFAULT_HOUSING_TYPE = `any`;
  const filterForm = document.querySelector(`.map__filters`);
  const filterHousingTypeSelect = filterForm.querySelector(`#housing-type`);

  const makeFilter = (item) => {
    return (
      item.offer.type === filterHousingTypeSelect.value ||
      filterHousingTypeSelect.value === DEFAULT_HOUSING_TYPE
    );
  };

  const showFiltredData = () => {
    const filtredData = window.dataMain.filter(makeFilter);
    window.pin.removePins();
    window.main.renderPins(filtredData.slice(0, window.main.PINS_COUNT));
  };

  filterHousingTypeSelect.addEventListener(`change`, () => {
    showFiltredData();
  });
})();
