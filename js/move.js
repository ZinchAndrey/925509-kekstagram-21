'use strict';

(function () {
  // const DEBOUNCE_INTERVAL_SET_EFFECT = 100; // ms
  // эти ноды есть в form.js , теоретически их можно вывести в глобальный объект и тут использовать
  const effectLevelNode = document.querySelector(`.effect-level`);
  const effectLevelPin = effectLevelNode.querySelector(`.effect-level__pin`);
  const effectLevelLine = effectLevelNode.querySelector(`.effect-level__depth`);
  const effectLevelValue = effectLevelNode.querySelector(`.effect-level__value`);
  const maxEffectLevel = effectLevelNode.querySelector(`.effect-level__line`);

  function movePin(evt) {
    let startX = evt.clientX;

    function onMouseMove(moveEvt) {
      let deltaX = moveEvt.clientX - startX;
      let pinLeftCoord = parseInt(getComputedStyle(effectLevelPin).left, 10);
      let pinRelativeCoord = (pinLeftCoord + deltaX) / maxEffectLevel.offsetWidth * 100;

      if (pinRelativeCoord > 100) {
        pinRelativeCoord = 100;
      } else if (pinRelativeCoord < 0) {
        pinRelativeCoord = 0;
      }

      effectLevelPin.style.left = `${pinRelativeCoord}%`;
      effectLevelLine.style.width = `${pinRelativeCoord}%`;
      effectLevelValue.value = pinRelativeCoord;
      // через eventListener 'change' не работает почему-то, поэтому тут непосредственно вызываем функцию по пересчету
      window.form.setEffectValue();
      startX = moveEvt.clientX;
    }

    function onMouseUp() {
      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    }

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);

  }

  // function movePinDb() {
  //   window.utils.debounce(movePin, DEBOUNCE_INTERVAL_SET_EFFECT);
  // }

  effectLevelPin.addEventListener(`mousedown`, movePin);
})();

