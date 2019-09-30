const BREAKPOINT = 850;
const prism = document.querySelector('.prism');
const links = document.querySelector('.links');
const toggle = document.querySelector('.toggle');
let dropdown;
let currentFace = 'front';
// let currentClass;

window.addEventListener('resize', setLinks);
links.addEventListener('change', changeSide);
toggle.addEventListener('click', toggleDropdown);

// set initial links
setLinks();

// set initial side
changeSide();

function setLinks() {
  const w = window.innerWidth;
  if (w > BREAKPOINT) {
    links.classList.remove('small-screen', 'dropdown');
    links.classList.add('big-screen');
    toggle.style.display = 'none';
  }
  else {
    links.classList.remove('big-screen');
    links.classList.add('small-screen', 'dropdown');
    dropdown = document.querySelector('.dropdown');
    toggle.style.display = 'block';
  }
}

function changeSide() {
  const activeLink = links.querySelector(':checked');
  const nextFace = activeLink.value;

  prism.classList.remove(`show-${currentFace}`);
  prism.classList.add(`show-${nextFace}`);

  prism.querySelector(`.prism__face--${currentFace}`).classList.remove('active');
  prism.querySelector(`.prism__face--${nextFace}`).classList.add('active');

  links.querySelector('.active').classList.remove('active');
  activeLink.parentElement.classList.add('active');

  currentFace = nextFace;
}

function toggleDropdown() {
  dropdownVisible = dropdown.classList.contains('active');

  if (!dropdownVisible) {
    toggle.classList.add('active');
    dropdown.classList.add('active');
    setTimeout(() => window.addEventListener('click', collapseDropdown), 0);
  }
  else {
    collapseDropdown();
  }
}

function collapseDropdown() {
  toggle.classList.remove('active');
  dropdown.classList.remove('active');
  window.removeEventListener('click', collapseDropdown);
}

function swipedetect(element, callback) {
  const
    threshold =   150, // required min distance
    restraint =   100, // maximum perpendicular distance allowed
    allowedTime = 300; // maximum time allowed to travel that distance

  let
    startX,
    startY,
    startTime;

  element.addEventListener('touchstart', event => {
    // event.preventDefault();
    const touch = event.changedTouches[0];
    startX = touch.pageX;
    startY = touch.pageY;
    startTime = new Date().getTime();
  }, false);

  element.addEventListener('touchend', event => {
    const touch = event.changedTouches[0]
    const dt = new Date().getTime() - startTime;
    const dx = touch.pageX - startX;
    const dy = touch.pageY - startY;

    let direction;

    if (dt <= allowedTime) {
      if (Math.abs(dx) >= threshold && Math.abs(dy) <= restraint) {
        direction = (dx < 0) ? 'left' : 'right';
      }
      else if (Math.abs(dy) >= threshold && Math.abs(dx) <= restraint) {
        direction = (dy < 0) ? 'up' : 'down';
      }
    }

    if (direction) {
      event.preventDefault();
      callback(direction);
    }
  }, false)
}

swipedetect(prism, handleSwipe);

function handleSwipe(direction) {
  const buttons = [...links.children];
  const activeIdx = buttons.findIndex(button => button.classList.contains('active'));

  if (direction === 'right') {
    const clickIdx = activeIdx === 0 ? buttons.length - 1 : activeIdx - 1;
    buttons[clickIdx].click();
  }

  if (direction === 'left') {
    const clickIdx = activeIdx === buttons.length - 1 ? 0 : activeIdx + 1;
    buttons[clickIdx].click();
  }
}
