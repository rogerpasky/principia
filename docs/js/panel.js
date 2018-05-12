document.addEventListener("keydown", keydownCallback);
function keydownCallback(event) {
  keystroke(event.key)
}

function keystroke(key) {
  switch (key) {
    case ' ': 
      togglePause();
      break;
    case '+':
      speedUp();
      break;
    case '-':
      speedDown();
      break;
    case '>':
      reScale(1);
      break;
    case '<':
      reScale(-1);
      break;
    case 'c':
      nextViewPoint();
      break;
    case 'i':
      toggleInstructions();
  }
}

var timerContainer;
let elapsedTime = 0;
const PERIODS = [['y', 31557600], ['mo', 2629800], ['d', 86400], ['h', 3600], ['m', 60], ['s', 1]];

function setTimer(textPlaceholder) {
  timerContainer = textPlaceholder;
}

function updateTimer(timeDelta) {
  if (timerContainer) {
    var previousSeconds = Math.floor(elapsedTime);
    elapsedTime += timeDelta;
    var seconds = Math.floor(elapsedTime);
    if (seconds > previousSeconds) {
      var content = '';
      PERIODS.forEach(period => {
        if (seconds >= period[1]) {
          content += ' ' + Math.floor(seconds/period[1]).toString() + period[0];
          seconds %= period[1];
        } else if (content.length > 0) {
          content += ' 0' + period[0];
        }
      })
      timerContainer.textContent = content;
    }
  }
}

var instructionsContainer;

function setInstructor(placeholder) {
  instructionsContainer = placeholder;
}

function toggleInstructions() {
  instructionsContainer.style.display = (instructions.style.display == "none")? "block": "none";
}
