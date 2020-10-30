'use strict';
(function () {
  // рендер маленьких изображений
  const picturesNode = document.querySelector(`.pictures`);
  const pictureTemplate = document.querySelector(`#picture`)
  .content
  .querySelector(`.picture`);

  const fragment = document.createDocumentFragment();

  function renderPicture(picture) {
    const pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector(`.picture__img`).setAttribute(`src`, picture.url);
    pictureElement.querySelector(`.picture__likes`).textContent = picture.likes;
    pictureElement.querySelector(`.picture__comments`).textContent = picture.comments.length;

    return pictureElement;
  }

  function renderAllPictures(pictures) {
    pictures.forEach((item) => {
      fragment.appendChild(renderPicture(item));
    });

    picturesNode.appendChild(fragment);

    // подумать - это после загрузки данных производить?
    window.utils.hideNode(document.querySelector(`.social__comment-count`));
    window.utils.hideNode(document.querySelector(`.comments-loader`));
  }

  function removeAllPictures() {
    document.querySelectorAll(`.picture`).forEach((picture) => {
      picturesNode.removeChild(picture);
    });
  }

  // window.data.pictures.forEach((item) => {
  //   fragment.appendChild(renderPicture(item));
  // });
  // picturesNode.appendChild(fragment);

  // window.utils.hideNode(document.querySelector(`.social__comment-count`));
  // window.utils.hideNode(document.querySelector(`.comments-loader`));

  window.picture = {
    picturesNode: picturesNode,
    renderAllPictures: renderAllPictures,
    removeAllPictures: removeAllPictures,
  };
})();
