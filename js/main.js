'use strict';

(function () {
  const URL = `https://21.javascript.pages.academy/kekstagram/data`;
  function onError(message) {
    throw new Error(message);
  }

  function onSuccess(data) {
    // console.log(data);
    window.picture.renderAllPictures(data);
  }
  window.load(URL, onSuccess, onError);
})();
