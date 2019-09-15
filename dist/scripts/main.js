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

