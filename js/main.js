'use strict';

const PICTURES_QUANTITY = 25;

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

const pictures = [];
const bodyNode = document.querySelector(`body`);
const picturesNode = document.querySelector(`.pictures`);
const pictureTemplate = document.querySelector(`#picture`)
  .content
  .querySelector(`.picture`);
const bigPictureNode = document.querySelector(`.big-picture`);

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

// module4-task1 - редактирование изображения при загрузке
const uploadInput = picturesNode.querySelector(`#upload-file`);
const uploadOverlayNode = picturesNode.querySelector(`.img-upload__overlay`);
const uploadCloseButton = uploadOverlayNode.querySelector(`#upload-cancel`);

function openUpload() {
  showNode(uploadOverlayNode);
  modalOpen();
  uploadCloseButton.addEventListener(`click`, closeUpload);
  document.addEventListener(`keydown`, onUploadEscPress);

}

function closeUpload() {
  hideNode(uploadOverlayNode);
  modalClose();
  uploadCloseButton.removeEventListener(`click`, closeUpload);
  document.removeEventListener(`keydown`, onUploadEscPress);
}

function onUploadEscPress(evt) {
  // в if добавить проверку, что мы не в полях input находимся
  if (evt.key === `Escape`) {
    closeUpload();
  }
}

uploadInput.addEventListener(`change`, openUpload);
// временно для удобства
openUpload();


