'use strict';
(function () {
  const bigPictureNode = document.querySelector(`.big-picture`);
  const commentInput = bigPictureNode.querySelector(`.social__footer-text`);
  const previewCloseButton = bigPictureNode.querySelector(`.big-picture__cancel`);

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


  function onPreviewEscPress(evt) {
    if (evt.key === `Escape` && evt.target !== commentInput) {
      closePreview();
    }
  }

  function searchPictureIndex(evt) {
    const picturesNodeList = document.querySelectorAll(`.picture`);
    const picturesNodeArr = Array.from(picturesNodeList);
    return picturesNodeArr.indexOf(evt.target.closest(`.picture`));
  }

  function openPreview(evt) {
    if (evt.target.closest(`.picture`)) {
      const isDefaultOrder = document.querySelector(`#filter-default`).classList.contains(`img-filters__button--active`);

      if (isDefaultOrder) {
        renderBigPicture(window.picturesDefaultArray[searchPictureIndex(evt)]);
      } else {
        renderBigPicture(window.pictures[searchPictureIndex(evt)]);
      }

      bigPictureNode.classList.remove(`hidden`);
      window.utils.openModal();
      bigPictureNode.focus();

      bigPictureNode.addEventListener(`keydown`, onPreviewEscPress);
      previewCloseButton.addEventListener(`click`, closePreview);
    }
  }

  function closePreview() {
    bigPictureNode.classList.add(`hidden`);
    window.utils.closeModal();

    bigPictureNode.removeEventListener(`keydown`, onPreviewEscPress);
    previewCloseButton.removeEventListener(`click`, closePreview);
  }

  window.picture.picturesNode.addEventListener(`click`, openPreview);

  window.preview = {
    renderBigPicture,
  };
})();
