const backButton = document.querySelector('.back-button');
const mealPlan = document.querySelector('.project__meal-plan');
const trainingLog = document.querySelector('.project__training-log');

const REM = () =>
  parseFloat(getComputedStyle(document.documentElement).fontSize);
const MIN_WIDTH = 180;
const SCREENSHOT_HEIGHT = 290;

mealPlan.addEventListener('click', expandMealPlan);
trainingLog.addEventListener('click', expandTrainingLog);

function expandMealPlan() {
  console.log(mealPlan.style.width, trainingLog.style.width);
  mealPlan.removeEventListener('click', expandMealPlan);
  backButton.addEventListener('click', collapseMealPlan);
  mealPlan.style.cursor = 'default';

  const MIN_HEIGHT = SCREENSHOT_HEIGHT + 3 * REM();
  const { width, height } =
    document.querySelector('#recent-work').getBoundingClientRect();
  const arr1 = [0, 0, MIN_WIDTH, 0, MIN_WIDTH, MIN_HEIGHT, 0, MIN_HEIGHT];
  const arr2 = [0, 0, width, 0, width, height, 0, height];
  const t1 = new TimelineMax();

  // project moves into upper left
  t1.to(mealPlan, 0.5, { top: 0, left: 0 });

  // other project vanishes
  t1.to(trainingLog, 0.5, { opacity: 0, width: 0 }, '-=0.5');

  arr2.onUpdate = function () {
    TweenMax.set(
      mealPlan,
      {
        clipPath: `polygon(
          ${arr1[0]} ${arr1[1]},
          ${arr1[2]}px ${arr1[3]},
          ${arr1[4]}px ${arr1[5]}px,
          ${arr1[6]} ${arr1[7]}px
        )`
      }
    );
  };

  // clip-path reveals project
  t1.to(arr1, 0.5, arr2, '-=0.2');
  // TweenMax.to(arr1, 2, arr2);

  // back button appears
  t1.to(backButton, 0.5, { opacity: 0.9, top: '1rem', right: '2rem' }, '-=0.5')
}

function collapseMealPlan() {
  backButton.removeEventListener('click', collapseMealPlan);
  mealPlan.addEventListener('click', expandMealPlan);
  mealPlan.style.cursor = 'zoom-in';

  const MIN_HEIGHT = SCREENSHOT_HEIGHT + 3 * REM();
  const recentWork = document.querySelector('#recent-work');
  const { width, height } = recentWork.getBoundingClientRect();
  const arr1 = [0, 0, width, 0, width, height, 0, height];
  const arr2 = [0, 0, MIN_WIDTH, 0, MIN_WIDTH, MIN_HEIGHT, 0, MIN_HEIGHT];
  const t = new TimelineMax();

  // back button disappears
  t.to(backButton, 0.5, { opacity: 0, top: 0, right: 0 });

  // other project reappears
  const colWidth = width / 2 - 2 * REM();
  t.to(
    trainingLog,
    0.5,
    {
      opacity: 1,
      width: colWidth,
      onComplete: () => trainingLog.style.width = ''
    },
    '-=0.5'
  );

  arr2.onUpdate = function () {
    TweenMax.set(
      mealPlan,
      {
        clipPath: `polygon(
          ${arr1[0]} ${arr1[1]},
          ${arr1[2]}px ${arr1[3]},
          ${arr1[4]}px ${arr1[5]}px,
          ${arr1[6]} ${arr1[7]}px
        )`
      }
    );
  };

  // clip-path reveals project
  t.to(arr1, 0.3, arr2, '-=0.5');

  // project moves back to column center
  const colHeight = height - 3 * REM();
  t.to(
    mealPlan,
    0.5,
    {
      top: colHeight / 2 - MIN_HEIGHT / 2 - 2 * REM(),
      left: colWidth / 2 - MIN_WIDTH / 2
    },
    '-=0.5'
  );
}

function expandTrainingLog() {
  trainingLog.removeEventListener('click', expandTrainingLog);
  backButton.addEventListener('click', collapseTrainingLog);
  trainingLog.style.cursor = 'default';

  const MIN_HEIGHT = SCREENSHOT_HEIGHT + 3 * REM();
  const { width, height } =
    document.querySelector('#recent-work').getBoundingClientRect();
  const arr1 = [0, 0, MIN_WIDTH, 0, MIN_WIDTH, MIN_HEIGHT, 0, MIN_HEIGHT];
  const arr2 = [0, 0, width, 0, width, height, 0, height];
  const t1 = new TimelineMax();

  // project moves into upper left
  t1.to(trainingLog, 0.5, { top: 0, left: 0 });

  // other project vanishes
  t1.to(mealPlan, 0.5, { opacity: 0, width: 0 }, '-=0.5');

  arr2.onUpdate = function () {
    TweenMax.set(
      trainingLog,
      {
        clipPath: `polygon(
          ${arr1[0]} ${arr1[1]},
          ${arr1[2]}px ${arr1[3]},
          ${arr1[4]}px ${arr1[5]}px,
          ${arr1[6]} ${arr1[7]}px
        )`
      }
    );
  };

  // clip-path reveals project
  t1.to(arr1, 0.5, arr2, '-=0.2');
  // TweenMax.to(arr1, 2, arr2);

  // back button appears
  t1.to(backButton, 0.5, { opacity: 0.9, top: '1rem', right: '2rem' }, '-=0.5')
}

function collapseTrainingLog() {
  backButton.removeEventListener('click', collapseTrainingLog);
  trainingLog.addEventListener('click', expandTrainingLog);
  trainingLog.style.cursor = 'zoom-in';

  const MIN_HEIGHT = SCREENSHOT_HEIGHT + 3 * REM();
  const recentWork = document.querySelector('#recent-work');
  const { width, height } = recentWork.getBoundingClientRect();
  const arr1 = [0, 0, width, 0, width, height, 0, height];
  const arr2 = [0, 0, MIN_WIDTH, 0, MIN_WIDTH, MIN_HEIGHT, 0, MIN_HEIGHT];
  const t = new TimelineMax();

  // back button disappears
  t.to(backButton, 0.5, { opacity: 0, top: 0, right: 0 });

  // other project reappears
  const colWidth = width / 2 - 2 * REM();
  t.to(
    mealPlan,
    0.5,
    {
      opacity: 1,
      width: colWidth,
      onComplete: () => mealPlan.style.width = ''
    },
    '-=0.5'
  );

  arr2.onUpdate = function () {
    TweenMax.set(
      trainingLog,
      {
        clipPath: `polygon(
          ${arr1[0]} ${arr1[1]},
          ${arr1[2]}px ${arr1[3]},
          ${arr1[4]}px ${arr1[5]}px,
          ${arr1[6]} ${arr1[7]}px
        )`
      }
    );
  };

  // clip-path reveals project
  t.to(arr1, 0.3, arr2, '-=0.5');

  // project moves back to column center
  const colHeight = height - 3 * REM();
  t.to(
    trainingLog,
    0.5,
    {
      top: colHeight / 2 - MIN_HEIGHT / 2 - 2 * REM(),
      left: colWidth / 2 - MIN_WIDTH / 2
    },
    '-=0.5'
  );
}
