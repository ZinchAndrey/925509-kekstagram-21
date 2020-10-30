'use strict';

(function () {
  const URL = `https://21.javascript.pages.academy/kekstagram/data`;
  function onError(message) {
    throw new Error(message);
  }

  function onSuccess(data) {
    let pictures = data;
    // записываем массив с картинками в глобальный объект (можно просто в window.pictures)
    window.pictures = data;
    window.picture.renderAllPictures(pictures);

    const filterNode = document.querySelector(`.img-filters`);

    filterNode.classList.remove(`img-filters--inactive`);
  }
  window.load(URL, onSuccess, onError);
})();
