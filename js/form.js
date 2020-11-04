'use strict';
(function () {
  // !!! разделить на модули с правкой изображений и валидацией полей
  const SCALE_STEP = 25;
  const SCALE_MIN = 25;
  const SCALE_MAX = 100;

  const MAX_HASHTAGS = 5;
  const MAX_HASHTAG_LENGTH = 20;
  const REG = /#[a-zA-Zа-яА-ЯёЁ0-9]{1,19}/i;

  const Effect = {
    none: {
      STYLE_NAME: `none`,
      MIN: ``,
      MAX: ``,
      UNIT: ``
    },
    chrome: {
      STYLE_NAME: `grayscale`,
      MIN: 0,
      MAX: 1,
      UNIT: ``
    },
    sepia: {
      STYLE_NAME: `sepia`,
      MIN: 0,
      MAX: 1,
      UNIT: ``
    },
    marvin: {
      STYLE_NAME: `invert`,
      MIN: 0,
      MAX: 100,
      UNIT: `%`
    },
    phobos: {
      STYLE_NAME: `blur`,
      MIN: 0,
      MAX: 3,
      UNIT: `px`
    },
    heat: {
      STYLE_NAME: `brightness`,
      MIN: 1,
      MAX: 3,
      UNIT: ``
    },
  };

  const ValidationMessage = {
    maxItems: `не более 5 хэштегов`,
    repeatItems: `хэштеги не должны повторяться`,
    forbiddeSymbols: `введены недопустимые символы`,
    maxLength: `длина хэштега должна быть не более 20 символов`,
  };

  const uploadInput = window.picture.picturesNode.querySelector(`#upload-file`);
  const uploadNode = window.picture.picturesNode.querySelector(`.img-upload`);
  const uploadOverlayNode = uploadNode.querySelector(`.img-upload__overlay`);
  const uploadCloseButton = uploadOverlayNode.querySelector(`#upload-cancel`);

  const scaleNode = uploadOverlayNode.querySelector(`.scale`);
  const scaleInput = scaleNode.querySelector(`.scale__control--value`);
  const scalePlusButton = scaleNode.querySelector(`.scale__control--bigger`);
  const scaleMinusButton = scaleNode.querySelector(`.scale__control--smaller`);
  const imgUploadPreviewNode = uploadOverlayNode.querySelector(`.img-upload__preview img`);

  const effectsListNode = uploadOverlayNode.querySelector(`.effects__list`);
  const effectLevelNode = uploadOverlayNode.querySelector(`.effect-level`);
  const effectLevelValue = effectLevelNode.querySelector(`.effect-level__value`);
  const effectLevelPin = effectLevelNode.querySelector(`.effect-level__pin`);
  let activeEffect;

  const hashtagInput = uploadOverlayNode.querySelector(`.text__hashtags`);
  const commentInput = uploadOverlayNode.querySelector(`.text__description`);
  const uploadFormNode = uploadNode.querySelector(`.upload-select-image`);

  // редактирование изображения при загрузке
  function openUpload() {
    window.utils.showNode(uploadOverlayNode);
    window.utils.openModal();
    uploadCloseButton.addEventListener(`click`, closeUpload);
    document.addEventListener(`keydown`, onUploadEscPress);

    effectsListNode.addEventListener(`click`, setEffect);
    effectLevelPin.addEventListener(`mouseup`, setEffectValue);
  }

  function closeUpload() {
    window.utils.hideNode(uploadOverlayNode);
    window.utils.closeModal();
    uploadInput.value = ``;
    uploadCloseButton.removeEventListener(`click`, closeUpload);
    document.removeEventListener(`keydown`, onUploadEscPress);

    effectsListNode.removeEventListener(`click`, setEffect);
    effectLevelPin.removeEventListener(`mouseup`, setEffectValue);
  }

  function onUploadEscPress(evt) {
    if (evt.key === `Escape` && evt.target !== commentInput) {
      closeUpload();
    }
  }

  uploadInput.addEventListener(`change`, openUpload);
  // временно для удобства
  openUpload();

  function biggerScale() {
    let scaleValue = parseInt(scaleInput.value, 10);
    if (scaleValue < SCALE_MAX) {
      scaleValue = scaleValue + SCALE_STEP;
      scaleInput.value = scaleValue + `%`;
      imgUploadPreviewNode.style.transform = `scale(` + scaleValue / 100 + `)`;
    }
  }

  function lessScale() {
    let scaleValue = parseInt(scaleInput.value, 10);
    if (scaleValue > SCALE_MIN) {
      scaleValue = scaleValue - SCALE_STEP;
      scaleInput.value = scaleValue + `%`;
      imgUploadPreviewNode.style.transform = `scale(` + scaleValue / 100 + `)`;
    }
  }

  scaleMinusButton.addEventListener(`click`, lessScale);
  scalePlusButton.addEventListener(`click`, biggerScale);

  // наложение эффектов
  function setEffect(evt) {
    if (evt.target && evt.target.matches(`input[type="radio"]`)) {
      imgUploadPreviewNode.setAttribute(`class`, ``);
      activeEffect = Effect[evt.target.value];

      if (evt.target.value === `none`) {
        window.utils.hideNode(effectLevelNode);
        imgUploadPreviewNode.style.filter = `none`;
        return;
      }
      imgUploadPreviewNode.classList.add(`effects__preview--` + evt.target.value);
      imgUploadPreviewNode.style.filter =
        Effect[evt.target.value].STYLE_NAME + `(` + Effect[evt.target.value].MAX + Effect[evt.target.value].UNIT + `)`;

      window.utils.showNode(effectLevelNode);
    }
  }

  function setEffectValue() {
    // !!!при открытии окна скрыть шкалу эффекта, тогда if заодно можно убрать
    // if нужен, чтобы не было ошибки в дефолтном состоянии (эффект оригинал)
    if (activeEffect) {
      imgUploadPreviewNode.style.filter =
        activeEffect.STYLE_NAME + `(` + activeEffect.MAX * effectLevelValue.value / 100 + activeEffect.UNIT + `)`;
    }

  }

  // проверка формы на валидность (хэштеги)

  function isRepeat(item, index, array) {
    return array.indexOf(item, index + 1) >= 0;
  }

  function hashtagValidity() {
    const hashtags = hashtagInput.value.toLowerCase().trim().split(` `);

    for (let i = 0; i < hashtags.length; i++) {
      const hashtag = hashtags[i];
      if (hashtags.some(isRepeat)) {
        hashtagInput.setCustomValidity(ValidationMessage.repeatItems);
      } else if (!REG.test(hashtag)) {
        hashtagInput.setCustomValidity(ValidationMessage.forbiddeSymbols);
      } else if (hashtag.length > MAX_HASHTAG_LENGTH) {
        hashtagInput.setCustomValidity(ValidationMessage.maxLength);
      } else if (hashtags.length > MAX_HASHTAGS) {
        hashtagInput.setCustomValidity(ValidationMessage.maxItems);
      } else {
        hashtagInput.setCustomValidity(``);
      }
    }
    uploadFormNode.reportValidity();
  }

  hashtagInput.addEventListener(`input`, hashtagValidity);
  // в дальнейшем надо добавить обработчик submit и возвращать все поля в начальное положение

})();
