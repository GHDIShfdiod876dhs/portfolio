const recentWork = document.querySelector('#recent-work');
const backButton = document.querySelector('.back-button');
const mealPlan = document.querySelector('.project__meal-plan');
const trainingLog = document.querySelector('.project__training-log');

const projects = [mealPlan, trainingLog];
const listeners = {};

const REM = () =>
  parseFloat(getComputedStyle(document.documentElement).fontSize);

window.addEventListener('resize', () => {
  projects.forEach(project => {
    listeners[`collapse_${project.id}`]();
  })
})

projects.forEach(project => {
  listeners[`expand_${project.id}`] = expand(project);
  listeners[`collapse_${project.id}`] = collapse(project);
  project.addEventListener('click', listeners[`expand_${project.id}`]);
});

function expand(project) {
  return function expand() {
    project.removeEventListener('click', expand);
    backButton.addEventListener('click', listeners[`collapse_${project.id}`]);
    project.style.cursor = 'default';

    const { width, height } = getComputedStyle(recentWork);
    const MAX_WIDTH = parseFloat(width) - 4 * REM();
    const MAX_HEIGHT = parseFloat(height) - 7 * REM();

    const backButtonTop = window.innerWidth > 380 ? '1rem' : '0.5rem';
    const backButtonRight = window.innerWidth > 380 ? '2rem' : '0.5rem';

    const other = project === mealPlan ? trainingLog : mealPlan;
    const t = new TimelineMax();

    // other project vanishes
    t.to(other, 0.5, { opacity: 0, width: 0 });

    // project moves into upper left
    t.to(
      project,
      0.5,
      { top: 0, left: 0, onComplete() { project.style.overflow = 'auto' }, }, '-=0.5'
    );

    // project expands
    t.to(project, 0.5, { width: MAX_WIDTH, height: MAX_HEIGHT });

    // back button appears
    t.to(
      backButton,
      0.5,
      { opacity: 0.9, top: backButtonTop, right: backButtonRight },
      '-=0.5'
    );
  }
}

function collapse(project) {
  return function collapse() {
    backButton.removeEventListener('click', collapse);
    project.addEventListener('click', listeners[`expand_${project.id}`]);
    project.style.cursor = 'zoom-in';
    project.style.overflow = 'hidden';

    const MIN_WIDTH = window.innerWidth > 380 ? 180 : 150;
    const MIN_HEIGHT = 290 + 3 * REM();

    const other = project === mealPlan ? trainingLog : mealPlan;
    const t = new TimelineMax();

    // back button disappears
    t.to(backButton, 0.5, { opacity: 0, top: 0, right: 0 });

    // project shrinks
    t.to(project, 0.5, { width: MIN_WIDTH, height: MIN_HEIGHT }, '-=0.5');

    // project moves back to column center
    t.to(project, 0.5, { top: 'unset', left: 'unset' });

    // other project reappears
    t.to(other, 0.5, { opacity: 1, width: MIN_WIDTH }, '-=0.5');
  }
}
