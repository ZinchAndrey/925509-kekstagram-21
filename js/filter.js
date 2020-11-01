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

  // сортировку применяем также к массиву с картинками с сервера,
  // чтобы при клике мы могли соотносить номера элементов массива и коллекции,
  // и выводить соответствующую превьюху
  // при этом для дефолтного порядка у нас есть копия массива window.picturesDefaultArray, ее мы не изменяем
  function filterDiscussedPictures(evt) {
    const pictures = window.pictures;
    const discussedPictures = pictures.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    window.picture.removeAllPictures();
    window.picture.renderAllPictures(discussedPictures);
    activateButton(evt);
  }

  function filterRandomPictures(evt) {
    const pictures = window.pictures;
    const randomPictures = window.utils.shuffleArray(pictures).slice(0, RANDOM_PICTURES_QUANTITY);
    window.picture.removeAllPictures();
    window.picture.renderAllPictures(randomPictures);
    activateButton(evt);
  }

  function filterDefaultPictures(evt) {
    const pictures = window.picturesDefaultArray;
    window.picture.removeAllPictures();
    window.picture.renderAllPictures(pictures);
    activateButton(evt);
  }

  function filterDiscussed(evt) {
    window.utils.debounce(filterDiscussedPictures(evt));
  }
  function filterRandom(evt) {
    window.utils.debounce(filterRandomPictures(evt));
  }
  function filterDefault(evt) {
    window.utils.debounce(filterDefaultPictures(evt));
  }

  FilterButton.discussed.addEventListener(`click`, filterDiscussed);
  FilterButton.random.addEventListener(`click`, filterRandom);
  FilterButton.default.addEventListener(`click`, filterDefault);

})();
