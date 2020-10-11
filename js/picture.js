'use strict';
(function () {
  // рендер маленьких изображений
  const picturesNode = document.querySelector(`.pictures`);
  const pictureTemplate = document.querySelector(`#picture`)
  .content
  .querySelector(`.picture`);

  const fragment = document.createDocumentFragment();

  function renderPictures(picture) {
    const pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector(`.picture__img`).setAttribute(`src`, picture.url);
    pictureElement.querySelector(`.picture__likes`).textContent = picture.likes;
    pictureElement.querySelector(`.picture__comments`).textContent = picture.comments.length;

    return pictureElement;
  }

  window.data.pictures.forEach((item) => {
    fragment.appendChild(renderPictures(item));
  });
  picturesNode.appendChild(fragment);

  window.utils.hideNode(document.querySelector(`.social__comment-count`));
  window.utils.hideNode(document.querySelector(`.comments-loader`));

  window.picture = {
    picturesNode: picturesNode,
  };
})();
