'use strict';

(function () {
  const DEBOUNCE_INTERVAL = 500; // ms
  const bodyNode = document.querySelector(`body`);

  function getRandom(min, max) {
    return Math.floor(min + Math.random() * (max - min));
  }

  function getRandomArrayItem(array) {
    return array[getRandom(0, array.length)];
  }

  function hideNode(node) {
    node.classList.add(`hidden`);
  }

  function showNode(node) {
    node.classList.remove(`hidden`);
  }

  function openModal() {
    bodyNode.classList.add(`modal-open`);
  }

  function closeModal() {
    bodyNode.classList.remove(`modal-open`);
  }

  // в стрелочную функцию переделать
  function shuffleArray(array) {
    return array.sort(function () {
      return Math.random() - 0.5;
    });
  }

  // в стрелочную функцию переделать
  function debounce(cb, interval = DEBOUNCE_INTERVAL) {
    let lastTimeout = null;

    return function (...parameters) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb(...parameters);
      }, interval);
    };
  }

  window.utils = {
    getRandom,
    getRandomArrayItem,
    hideNode,
    showNode,
    openModal,
    closeModal,
    shuffleArray,
    debounce,
  };
})();
