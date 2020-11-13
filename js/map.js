'use strict';

(() => {
  const PINTIP_HEIGHT = 22;
  const map = document.querySelector(`.map`);
  const mapPinMain = map.querySelector(`.map__pin--main`);

  const getPinCoords = () => {
    let coordinateX;
    let coordinateY;
    if (map.classList.contains(`map--faded`)) {
      coordinateX = Math.floor(mapPinMain.offsetLeft + mapPinMain.offsetWidth / 2);
      coordinateY = Math.floor(mapPinMain.offsetTop + mapPinMain.offsetHeight / 2);
    } else {
      coordinateX = Math.floor(mapPinMain.offsetLeft + mapPinMain.offsetWidth / 2);
      coordinateY = Math.floor(mapPinMain.offsetTop + mapPinMain.offsetHeight + PINTIP_HEIGHT);
    }
    const coordinates = coordinateX + `, ` + coordinateY;
    return coordinates;
  };

  mapPinMain.addEventListener(`mousedown`, (evt) => {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    let dragged = false;

    const onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();

      dragged = true;

      const shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      const newPinCoords = {
        x: mapPinMain.offsetLeft - shift.x,
        y: mapPinMain.offsetTop - shift.y
      };

      const getNewCoords = (coords) => {
        return {
          x: coords.x + mapPinMain.offsetWidth / 2,
          y: coords.y + (mapPinMain.offsetHeight + PINTIP_HEIGHT)
        };
      };

      const newCoords = getNewCoords(newPinCoords);

      if (newCoords.x <= window.data.Coordinates.X_MAX && newCoords.x >= window.data.Coordinates.X_MIN) {
        mapPinMain.style.left = newPinCoords.x + `px`;
      }
      if (newCoords.y <= window.data.Coordinates.Y_MAX && newCoords.y >= window.data.Coordinates.Y_MIN) {
        mapPinMain.style.top = newPinCoords.y + `px`;
      }

      window.form.addAdressCoords(getPinCoords(newCoords));
    };

    const onMouseUp = (upEvt) => {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);

      if (dragged) {
        const onClickPreventDefault = (clickEvt) => {
          clickEvt.preventDefault();
          mapPinMain.removeEventListener(`click`, onClickPreventDefault);
        };
        mapPinMain.addEventListener(`click`, onClickPreventDefault);
      }
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });

  window.map = {
    map,
    mapPinMain,
    getPinCoords
  };
})();
