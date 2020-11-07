'use strict';

(function () {
  const ERROR_SHOW_TIMEOUT = 10000;
  const mainNode = document.querySelector(`main`);
  const filtersNode = document.querySelector(`.img-filters`);
  const successUploadTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
  const errorUploadTemplate = document.querySelector(`#error`).content.querySelector(`.error`);
  const errorLoadTemplate = document.querySelector(`#error-previews-load`).content.querySelector(`.error-previews-load`);

  function createMessage(node, type) {
    const elemNode = node.cloneNode(true);
    const messageAlert = mainNode.appendChild(elemNode);
    const buttonNode = messageAlert.querySelector(`.${type}__button`);

    function onMessageEscPress(evt) {
      if (evt.key === `Escape`) {
        closeAlert();
      }
    }

    function closeAlert() {
      buttonNode.removeEventListener(`click`, closeAlert);
      document.removeEventListener(`keydown`, onMessageEscPress);
      mainNode.removeChild(messageAlert);
    }

    window.form.closeUpload();
    buttonNode.addEventListener(`click`, closeAlert);
    document.addEventListener(`keydown`, onMessageEscPress);
  }

  function successUpload() {
    createMessage(successUploadTemplate, `success`);
  }

  function errorUpload() {
    createMessage(errorUploadTemplate, `error`);
  }

  function errorLoad(errorText) {
    const elemNode = errorLoadTemplate.cloneNode(true);
    elemNode.querySelector(`.error-previews-load__message`).textContent = errorText;
    const messageAlert = mainNode.insertBefore(elemNode, filtersNode);

    setTimeout(function () {
      mainNode.removeChild(messageAlert);
    }, ERROR_SHOW_TIMEOUT);
  }

  window.messages = {
    successUpload,
    errorUpload,
    errorLoad,
  };
})();
