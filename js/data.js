'use strict';
(function () {
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

  function renderPicturesData(quantity) {
    for (let i = 0; i < quantity; i++) {
      pictures[i] = {
        url: `photos/${(i + 1)}.jpg`,
        description: window.utils.getRandomArrayItem(DESCRIPTIONS),
        likes: window.utils.getRandom(Likes.min, Likes.max),
        comments: [
          {
            avatar: `img/avatar-` + window.utils.getRandom(AvatarsNumber.min, AvatarsNumber.max) + `.svg`,
            message: window.utils.getRandomArrayItem(MESSAGES),
            name: window.utils.getRandomArrayItem(NAMES)
          }
        ]
      };
    }
  }

  renderPicturesData(PICTURES_QUANTITY);

  window.data = {
    pictures,
  };
})();
