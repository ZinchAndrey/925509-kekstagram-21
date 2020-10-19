'use strict';

(function () {
  const URL = `https://21.javascript.pages.academy/kekstagram/data`;
  function onError(message) {
    throw new Error(message);
  }

  function onSuccess(data) {
    let pictures = data;
    window.main = {
      pictures: data
    } // тест
    console.log(window.main.pictures);
    window.picture.renderAllPictures(pictures);
    // console.log(pictures);

    const filterNode = document.querySelector(`.img-filters`);

    filterNode.classList.remove(`img-filters--inactive`);
  }
  window.load(URL, onSuccess, onError);
})();
