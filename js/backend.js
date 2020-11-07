'use strict';

(function () {
  const Url = {
    LOAD: `https://21.javascript.pages.academy/kekstagram/data`,
    UPLOAD: `https://21.javascript.pages.academy/kekstagram`,
  };

  function createXhr(onSuccess, onError) {
    const TIMEOUT = 10000;
    let xhr = new XMLHttpRequest();

    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      let error;
      switch (xhr.status) {
        case 200:
          onSuccess(xhr.response);
          break;

        case 400:
          error = `Неверный запрос`;
          break;
        case 401:
          error = `Пользователь не авторизован`;
          break;
        case 404:
          error = `Ничего не найдено`;
          break;

        default:
          error = `Cтатус ответа: : ` + xhr.status + ` ` + xhr.statusText;
      }

      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });

    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
    });

    xhr.timeout = TIMEOUT; // 10s

    return xhr;
  }

  function loadData(onSuccess, onError) {
    const loadXhr = createXhr(onSuccess, onError);

    loadXhr.open(`GET`, Url.LOAD);
    loadXhr.send();
  }

  function uploadData(data, onSuccess, onError) {
    const loadXhr = createXhr(onSuccess, onError);

    loadXhr.open(`POST`, Url.UPLOAD);
    loadXhr.send(data);
  }

  window.backend = {
    loadData,
    uploadData
  };
})();
