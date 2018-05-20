//
// Copyright (c) Pascual de Juan and contributors. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//
// See the License for the specific language governing permissions and
// limitations under the License.
//
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