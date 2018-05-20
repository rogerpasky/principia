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
let viewPoints = [];
let viewPointIndex = 0;
let nameContainer;

function ViewPoint(universe, target, x, y, z, name) {
  let aspectRatio = window.innerWidth / window.innerHeight;
  this.camera = new THREE.PerspectiveCamera(50, aspectRatio, 0.04, 2*universe.radius);
  this.camera.position.x = x/K || 0;
  this.camera.position.y = y/K || 0;
  this.camera.position.z = z/K || 0;
  target.add(this.camera);
  this.name = name || 'Object ' + universe.spaceObjects.length.toString();

  this.controls = new THREE.OrbitControls(this.camera);
  this.controls.enabled = false;

  viewPoints.push(this);
  if (viewPoints.length == 1) nextViewPoint()
}
Object.assign(ViewPoint.prototype, {
  isViewPoint: true
} );

function setNamer(textPlaceholder) {
  nameContainer = textPlaceholder;
}

var camera;
var controls;

function nextViewPoint() {
  if (viewPoints.length != 0) {
    viewPoints[viewPointIndex].controls.enabled = false;
    viewPointIndex = (viewPointIndex + 1) % viewPoints.length;
    nameContainer.textContent = viewPoints[viewPointIndex].name;
    camera = viewPoints[viewPointIndex].camera;
    controls = viewPoints[viewPointIndex].controls;
    controls.enabled = true;
  }
}

// export {SpaceObject};
