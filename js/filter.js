'use strict';
(function () {
  const RANDOM_PICTURES_QUANTITY = 10;

  const filterNode = document.querySelector(`.img-filters`);
  const FilterButton = {
    default: filterNode.querySelector(`#filter-default`),
    random: filterNode.querySelector(`#filter-random`),
    discussed: filterNode.querySelector(`#filter-discussed`),
  };

  function activateButton(evt) {
    const activeButtonNode = filterNode.querySelector(`.img-filters__button--active`);
    activeButtonNode.classList.remove(`img-filters__button--active`);
    evt.target.classList.add(`img-filters__button--active`);
  }

  function filterDiscussedPictures(evt) {
    // копируем исходный массив
    const pictures = window.pictures.slice();
    const discussedPictures = pictures.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    window.picture.removeAllPictures();
    window.picture.renderAllPictures(discussedPictures);
    activateButton(evt);
  }

  function filterRandomPictures(evt) {
    const pictures = window.pictures.slice();
    const randomPictures = window.utils.shuffleArray(pictures).slice(0, RANDOM_PICTURES_QUANTITY);
    window.picture.removeAllPictures();
    window.picture.renderAllPictures(randomPictures);
    activateButton(evt);
  }

  function filterDefaultPictures(evt) {
    const pictures = window.pictures.slice();
    window.picture.removeAllPictures();
    window.picture.renderAllPictures(pictures);
    activateButton(evt);
  }

  FilterButton.discussed.addEventListener(`click`, filterDiscussedPictures);
  FilterButton.random.addEventListener(`click`, filterRandomPictures);
  FilterButton.default.addEventListener(`click`, filterDefaultPictures);

})();
