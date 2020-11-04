'use strict';
// !!! обернуть в IIFE

const effectLevelPin = document.querySelector(`.effect-level__pin`);
const effectLevelLine = document.querySelector(`.effect-level__depth`);
const maxEffectLevel = document.querySelector(`.effect-level__line`).offsetWidth;

function movePin(evt) {
  let startX = evt.clientX;

  function onMouseMove(moveEvt) {
    let deltaX = moveEvt.clientX - startX;
    let pinLeftCoord = parseInt(getComputedStyle(effectLevelPin).left, 10);
    let pinRelativeCoord = (pinLeftCoord + deltaX) / maxEffectLevel * 100;

    if (pinRelativeCoord > 100) {
      pinRelativeCoord = 100;
    } else if (pinRelativeCoord < 0) {
      pinRelativeCoord = 0;
    }

    effectLevelPin.style.left = `${pinRelativeCoord}%`;
    effectLevelLine.style.width = `${pinRelativeCoord}%`;
    startX = moveEvt.clientX;
  }

  function onMouseUp() {
    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);
  }

  document.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseup`, onMouseUp);

}

effectLevelPin.addEventListener(`mousedown`, movePin);
