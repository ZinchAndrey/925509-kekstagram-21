'use strict';
(function () {
  const bigPictureNode = document.querySelector(`.big-picture`);

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

  renderBigPicture(window.data.pictures[0]);
  // написать функционал, при котором при клике будет открываться превьюха
})();
