'use strict';

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
const avatarChoser = document.querySelector(`.ad-form__field input[type=file]`);
const avatarPreview = document.querySelector(`.ad-form-header__preview`);
const adPhotoChoser = document.querySelector(`#images`);
const adPhotoPreview = document.querySelector(`.ad-form__photo`);
const loadImage = (from, to) => {
  const file = from.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some(function (it) {
    return fileName.endsWith(it);
  });
  if (matches) {
    const reader = new FileReader();
    reader.addEventListener(`load`, function () {
      if (to.querySelector(`img`) === null) {
        const photo = document.createElement(`img`);
        photo.src = reader.result;
        photo.alt = `Фото объявления`;
        photo.style = `width: 65px; height: 65px; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)`;
        to.style.position = `relative`;
        to.appendChild(photo);
      } else {
        const photo = to.querySelector(`img`);
        photo.src = reader.result;
      }
    });
    reader.readAsDataURL(file);
  }
};

const onAvatarChose = () => {
  loadImage(avatarChoser, avatarPreview);
};

const onPhotoChose = () => {
  loadImage(adPhotoChoser, adPhotoPreview);
};
avatarChoser.addEventListener(`change`, onAvatarChose);
adPhotoChoser.addEventListener(`change`, onPhotoChose);
