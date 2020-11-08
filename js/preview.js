'use strict';
(function () {
  const bigPictureNode = document.querySelector(`.big-picture`);
  const commentInput = bigPictureNode.querySelector(`.social__footer-text`);
  const previewCloseButton = bigPictureNode.querySelector(`.big-picture__cancel`);

  function renderBigPicture(picture) {
    const commentsListNode = bigPictureNode.querySelector(`.social__comments`);
    // const commentsCountNode = commentsListNode.querySelector(`.social__comment-count`);
    const loadButton = bigPictureNode.querySelector(`.social__comments-loader`);

    const COMMENTS_MAX_COUNT = picture.comments.length;
    const COMMENTS_COUNT_STEP = 5;

    // ткущее количество комментариев
    let commentsCount;
    let iterationNumber = 1;

    bigPictureNode.querySelector(`.big-picture__img img`).setAttribute(`src`, picture.url);
    bigPictureNode.querySelector(`.likes-count`).textContent = picture.likes;
    // bigPictureNode.querySelector(`.comments-count`).textContent = picture.comments.length;
    bigPictureNode.querySelector(`.social__caption`).textContent = picture.description;

    // удаляем комментарии, которые изначально есть в разметке
    commentsListNode.querySelectorAll(`.social__comment`).forEach((item) => {
      item.remove();
    });

    function renderComments() {
      // const commentsCountNode = commentsListNode.querySelector(`.social__comment-count`);

      if (COMMENTS_MAX_COUNT > COMMENTS_COUNT_STEP * iterationNumber) {
        commentsCount = COMMENTS_COUNT_STEP * iterationNumber;
        window.utils.showNode(loadButton);
      } else {
        commentsCount = COMMENTS_MAX_COUNT;
        window.utils.hideNode(loadButton);
      }

      bigPictureNode.querySelector(`.social__comment-count`).textContent = `${commentsCount} из ${COMMENTS_MAX_COUNT} комментариев`;

      for (let i = COMMENTS_COUNT_STEP * (iterationNumber - 1); i < commentsCount; i++) {
        const comment = document.createElement(`li`);
        comment.innerHTML = `
          <img
            class="social__picture"
            src="{{аватар}}"
            alt="{{имя комментатора}}"
            width="35" height="35">
          <p class="social__text">{{текст комментария}}</p>`;

        comment.classList.add(`social__comment`);
        comment.querySelector(`img`).setAttribute(`src`, picture.comments[i].avatar);
        comment.querySelector(`img`).setAttribute(`alt`, picture.comments[i].name);
        comment.querySelector(`.social__text`).textContent = picture.comments[i].message;

        commentsListNode.appendChild(comment);
      }
    }

    function loadMoreComments() {
      // debugger;
      iterationNumber += 1;
      renderComments();
    }

    renderComments();

    loadButton.addEventListener(`click`, loadMoreComments);
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
