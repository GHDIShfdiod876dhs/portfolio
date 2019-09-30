const navToggle = document.querySelector('.small-screen.toggle');

const buttons = [navToggle, backButton];

const handleMouseenter = generateHandler(
  { duration: 0.2, opacity: 0.85, dy: 60, stdDeviation: 45 }
);

const handleMouseleave = generateHandler(
  { duration: 0.2, opacity: 0.7, dy: 40, stdDeviation: 30 }
);

const handleMousedown = generateHandler(
  { duration: 0.1, opacity: 1, dy: 0, stdDeviation: 0 }
);

const handleMouseup = generateHandler(
  { duration: 0.1, opacity: 0.85, dy: 60, stdDeviation: 45 }
);

const path = event => event.currentTarget.querySelector('path')
const offset = event => event.currentTarget.querySelector('feOffset');
const blur = event => event.currentTarget.querySelector('feGaussianBlur');

buttons.forEach(button => {
  button.addEventListener('mouseenter', handleMouseenter);
  button.addEventListener('mouseleave', handleMouseleave);
  button.addEventListener('mousedown', handleMousedown);
  button.addEventListener('mouseup', handleMouseup);
})

function generateHandler({ duration, opacity, dy, stdDeviation}) {
  return function(event) {
    TweenMax.to(path(event), duration, { 'fill-opacity': opacity });
    TweenMax.to(offset(event), duration, { attr: { dy } });
    TweenMax.to(blur(event), duration, { attr: { stdDeviation } });
  }
}
