document.addEventListener("keydown", keydownCallback);
function keydownCallback(event) {
  keystroke(event.key);
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

var _timerContainer;
let _elapsedTime = 0;
const _PERIODS = [['y', 31557600], ['mo', 2629800], ['d', 86400], ['h', 3600], ['m', 60], ['s', 1]];

function setTimer(textPlaceholder) {
  _timerContainer = textPlaceholder;
}

function updateTimer(timeDelta) {
  if (_timerContainer) {
    var previousSeconds = Math.floor(_elapsedTime);
    _elapsedTime += timeDelta;
    var seconds = Math.floor(_elapsedTime);
    if (seconds > previousSeconds) {
      var content = '';
      _PERIODS.forEach(period => {
        if (seconds >= period[1]) {
          content += ' ' + Math.floor(seconds/period[1]).toString() + period[0];
          seconds %= period[1];
        } else if (content.length > 0) {
          content += ' 0' + period[0];
        }
      })
      _timerContainer.textContent = content;
    }
  }
}

var _instructionsDetails;

function setInstructor(placeholder) {
  placeholder.innerHTML = '\
    <small>\
      <p>\
        Press <a onclick="keystroke(\'i\')"><span class="key"> i </span></a>\
        to switch on/off <strong> instructions </strong>.\
      </p>\
      <div id="instructionsDetails" style="display: none">\
        <p>\
          <strong>Click</strong> and drag to <strong>move</strong> arround pointed object,\
          <strong>roll</strong> forward/backwards to <strong>zoom</strong> out/in and use\
          <span class="key"> arrows </span> to <strong>pan</strong> camera, or press:\
        </p>\
        <p>\
          <a onclick="keystroke(\'c\')"><span class="key"> c </span></a>\
          to change the viewpoint <strong>camera</strong>.\
        </p>\
        <p>\
          <a onclick="keystroke(\'>\')"><span class="key"> &gt </span></a>\
          <a onclick="keystroke(\'<\')"><span class="key"> &lt </span></a>\
          to increase/decrease <strong>scale</strong> objects.</p>\
        <p>\
          <a onclick="keystroke(\'+\')"><span class="key"> + </span></a>\
          <a onclick="keystroke(\'-\')"><span class="key"> - </span></a>\
          to accelerate/decelerate <strong>time</strong>.\
        </p>\
        <p>\
          <a onclick="keystroke(\' \')"><span class="key"> Spacebar </span></a>\
          to <strong>freeze</strong> time.\
        </p>\
      </div>\
    </small>';
    _instructionsDetails = document.getElementById("instructionsDetails");
  }

function toggleInstructions() {
  _instructionsDetails.style.display = (_instructionsDetails.style.display == "none")? "block": "none";
}
