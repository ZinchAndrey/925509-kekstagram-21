'use strict';

(function () {
  const URL = `https://21.javascript.pages.academy/kekstagram/data`;
  function onError(message) {
    throw new Error(message);
  }

  function onSuccess(data) {
    let pictures = data;
    window.pictures = data;
    window.picturesDefaultArray = data.slice(); // копируем полученный с сервера массив с исходным порядком, его мы видоизменять не будем
    window.picture.renderAllPictures(pictures);

    const filterNode = document.querySelector(`.img-filters`);

    filterNode.classList.remove(`img-filters--inactive`);
  }
  window.load(URL, onSuccess, onError);
})();
