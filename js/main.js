'use strict';

const PICTURES_QUANTITY = 25;
const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;

const MAX_HASHTAGS = 5;
const MAX_HASHTAG_LENGTH = 20;
const REG = /#[a-zA-Zа-яА-ЯёЁ0-9]{1,19}/i;
// pattern="/(^|\B)#(?![0-9_]+\b)([a-zA-Z0-9_]{1,20})(\b|\r)/g"
// хэштеги тут еще можно посмотреть https://issue.life/questions/42065872

const MESSAGES = [
  `Всё отлично!`,
  `В целом всё неплохо. Но не всё.`,
  `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
  `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
  `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
  `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`,
];

const NAMES = [
  `Федот`,
  `Евгений Понасенков`,
  `Анзорик`,
  `Микки`,
  `Курт`,
  `Феликс`,
  `Анатолий`,
  `Елена Михайловна`,
  `Юрий Дудь`,
];

// в задании не даны описания, поэтому написал самостоятельно
const DESCRIPTIONS = [
  `Чилим с пацанами`,
  `Почти как в Париже`,
  `Я на горе`,
  `Фото сделано на iPhone`,
];

const Likes = {
  min: 15,
  max: 200
};

const AvatarsNumber = {
  min: 1,
  max: 6
};

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

const pictures = [];
const bodyNode = document.querySelector(`body`);
const picturesNode = document.querySelector(`.pictures`);
const pictureTemplate = document.querySelector(`#picture`)
  .content
  .querySelector(`.picture`);
const bigPictureNode = document.querySelector(`.big-picture`);

const uploadInput = picturesNode.querySelector(`#upload-file`);
const uploadNode = picturesNode.querySelector(`.img-upload`);
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
// const uploadFormNode = uploadNode.querySelector(`.upload-select-image`);

const fragment = document.createDocumentFragment();

// случайное число в пределах (min; max)
function getRandom(min, max) {
  return Math.floor(min + Math.random() * (max - min));
}

function getRandomArrayItem(array) {
  return array[getRandom(0, array.length)];
}

function hideNode(node) {
  node.classList.add(`hidden`);
}

function showNode(node) {
  node.classList.remove(`hidden`);
}

function modalOpen() {
  bodyNode.classList.add(`modal-open`);
}

function modalClose() {
  bodyNode.classList.remove(`modal-open`);
}

function renderPicturesData(quantity) {
  for (let i = 0; i < quantity; i++) {
    pictures[i] = {
      url: `photos/` + (i + 1) + `.jpg`,
      description: getRandomArrayItem(DESCRIPTIONS),
      likes: getRandom(Likes.min, Likes.max),
      comments: [
        {
          avatar: `img/avatar-` + getRandom(AvatarsNumber.min, AvatarsNumber.max) + `.svg`,
          message: getRandomArrayItem(MESSAGES),
          name: getRandomArrayItem(NAMES)
        }
      ]
    };
  }
}

function renderPictures(picture) {
  const pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector(`.picture__img`).setAttribute(`src`, picture.url);
  pictureElement.querySelector(`.picture__likes`).textContent = picture.likes;
  pictureElement.querySelector(`.picture__comments`).textContent = picture.comments.length;

  return pictureElement;
}

// доработать фугкцию с помощью fragmentElement
function renderBigPicture(picture) {
  const commentsListNode = bigPictureNode.querySelector(`.social__comments`);

  bigPictureNode.querySelector(`.big-picture__img img`).setAttribute(`src`, picture.url);
  bigPictureNode.querySelector(`.likes-count`).textContent = picture.likes;
  bigPictureNode.querySelector(`.comments-count`).textContent = picture.comments.length;
  bigPictureNode.querySelector(`.social__caption`).textContent = picture.description;

  // удаляем комментарии, которые изначально есть в разметке
  commentsListNode.querySelectorAll(`.social__comment`).forEach((item) => {
    item.remove();
  });

  const comment = document.createElement(`li`);
  comment.innerHTML = `
    <img
      class="social__picture"
      src="{{аватар}}"
      alt="{{имя комментатора}}"
      width="35" height="35">
    <p class="social__text">{{текст комментария}}</p>`;

  comment.classList.add(`social__comment`);
  comment.querySelector(`img`).setAttribute(`src`, picture.comments[0].avatar);
  comment.querySelector(`img`).setAttribute(`alt`, picture.comments[0].name);
  comment.querySelector(`.social__text`).textContent = picture.comments[0].message;

  commentsListNode.appendChild(comment);
}

renderPicturesData(PICTURES_QUANTITY);

pictures.forEach((item) => {
  fragment.appendChild(renderPictures(item));
});

picturesNode.appendChild(fragment);

// блок кода, касающийся рендеринга big picture, пока закомментировал, чтобы не мешал
// bigPictureNode.classList.remove(`hidden`);
renderBigPicture(pictures[0]);
// modalOpen();

hideNode(document.querySelector(`.social__comment-count`));
hideNode(document.querySelector(`.comments-loader`));

// редактирование изображения при загрузке
function openUpload() {
  showNode(uploadOverlayNode);
  modalOpen();
  uploadCloseButton.addEventListener(`click`, closeUpload);
  document.addEventListener(`keydown`, onUploadEscPress);

  effectsListNode.addEventListener(`click`, setEffect);
  effectLevelPin.addEventListener(`mouseup`, setEffectValue);
}

function closeUpload() {
  hideNode(uploadOverlayNode);
  modalClose();
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
// openUpload();

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
      hideNode(effectLevelNode);
      imgUploadPreviewNode.style.filter = `none`;
      return;
    }
    imgUploadPreviewNode.classList.add(`effects__preview--` + evt.target.value);
    imgUploadPreviewNode.style.filter =
      Effect[evt.target.value].STYLE_NAME + `(` + Effect[evt.target.value].MAX + Effect[evt.target.value].UNIT + `)`;

    showNode(effectLevelNode);
  }
}

function setEffectValue() {
  imgUploadPreviewNode.style.filter =
    activeEffect.STYLE_NAME + `(` + activeEffect.MAX * effectLevelValue.value / 100 + activeEffect.UNIT + `)`;
}

// проверка формы на валидность (хэштеги)

function itemsRepeat(item, array) {
  return array.some(() => {
    return array.indexOf(item) !== -1;
  });
}

function hashtagValidity() {
  const hashtags = hashtagInput.value.toLowerCase().trim().split(` `);
  if (hashtags.length > MAX_HASHTAGS) {
    return hashtagInput.setCustomValidity(ValidationMessage.maxItems);
  }
  for (let i = 0; i < hashtags.length; i++) {
    const hashtag = hashtags[i];
    if (itemsRepeat(hashtag, hashtags.slice(i + 1))) {
      return hashtagInput.setCustomValidity(ValidationMessage.repeatItems);
    } else if (!REG.test(hashtag)) {
      return hashtagInput.setCustomValidity(ValidationMessage.forbiddeSymbols);
    } else if (hashtag.length > MAX_HASHTAG_LENGTH) {
      return hashtagInput.setCustomValidity(ValidationMessage.maxLength);
    }
  }
  return hashtagInput.setCustomValidity(``);
}

hashtagInput.addEventListener(`input`, hashtagValidity);

