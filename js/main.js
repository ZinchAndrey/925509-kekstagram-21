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
const picturesNode = document.querySelector(`.pictures`);
const pictureTemplate = document.querySelector(`#picture`)
  .content
  .querySelector(`.picture`);

const fragment = document.createDocumentFragment();


// случайное число в пределах (min; max)
function getRandom(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

function getRandomArrayItem(array) {
  return array[getRandom(0, array.length)];
}

function renderPicturesData(quantity) {
  for (let i = 0; i < quantity; i++) {
    pictures[i] = {
      url: `photos/` + (i + 1) + `.jpg`,
      description: getRandomArrayItem(DESCRIPTIONS),
      likes: getRandom(Likes.min, Likes.max),
      comments: [
        {
          avatar: `img/avatar` + getRandom(AvatarsNumber.min, AvatarsNumber.max) + `.svg`,
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

renderPicturesData(PICTURES_QUANTITY);

pictures.forEach((item) => {
  fragment.appendChild(renderPictures(item));
});

picturesNode.appendChild(fragment);

