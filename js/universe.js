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

//import {THREE} from 'three.js';

function Universe(radius) {
  THREE.Object3D.call(this);
  this.type = 'Universe';

  scene.add(this);

  this.light = new THREE.AmbientLight('white', 0.02);
  this.add(this.light);

  this.radius = radius/K || 7.0e8/K;
  var texture = new THREE.TextureLoader().load("images/textures/stars.png");
  var cover = new THREE.MeshBasicMaterial({lights: false, map: texture, side: THREE.BackSide});
  var shape = new THREE.SphereGeometry(this.radius, 32, 16);
  var stars = new THREE.Mesh(shape, cover);
  this.add(stars);

  this.viewPoint = new ViewPoint(this, this, 3000*K, 3000*K, 3000*K, 'Overall view');
}
Universe.prototype = Object.assign(Object.create(THREE.Object3D.prototype), {
  constructor: Universe,
  isUniverse: true,
} );
// export {Universe};