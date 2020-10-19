'use strict';
(function () {
  const filterNode = document.querySelector(`.img-filters`);
  const FilterButton = {
    default: filterNode.querySelector(`#filter-default`),
    random: filterNode.querySelector(`#filter-random`),
    discussed: filterNode.querySelector(`#filter-discussed`),
  };
  let pictures = window.main.pictures;

  FilterButton.discussed.addEventListener(`click`, filterDiscussedPictures);

  function filterDiscussedPictures() {
    const discussedPictures = pictures.sort(function (a, b) {
      return a.comments.length - b.comments.length;
    });
    window.picture.renderAllPictures(discussedPictures);
  }

})();
