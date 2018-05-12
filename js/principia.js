var scene;
var clock;
var renderer;

function setAnimator(animationContainer) {
  scene = new THREE.Scene();
  clock = new THREE.Clock();
  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize(window.innerWidth, window.innerHeight);
  animationContainer.appendChild(renderer.domElement);
}

const K = 1.0e6; // Numeric scale factor to avoid JavaScript overflow in universe magnitudes
let speed = 1;
let pause = false;
var userAnimationStep;

function animate() {
  requestAnimationFrame(animate);
  var timeDelta = clock.getDelta()*speed;
  if (!pause) {
    updateTimer(timeDelta);
    physicsAnimationStep(timeDelta);
    if (userAnimationStep) userAnimationStep(timeDelta);
  }
  controls.update();
  renderer.render(scene, camera);
}

function speedUp() {speed *= 10;}
function speedDown() {speed /= 10;}
function togglePause() {pause = !pause;}
function setUserAnimation(_function) {userAnimationStep = _function;}