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
function Rock(universe, x, y, z, radius, name, texture, vx0, vy0, vz0, mass, tilt, period) {
  SpaceObject.call(this, universe, x, y, z, radius, name, vx0, vy0, vz0, mass, tilt, period);
  this.type = 'Rock';

  texture = texture || 'images/textures/moon.png'
  var texture = new THREE.TextureLoader().load(texture);
  var cover = new THREE.MeshStandardMaterial({map: texture, roughness: 1});
  var shape = new THREE.SphereGeometry(this.radius, 32, 16);
  this.mesh = new THREE.Mesh(shape, cover);
  this.add(this.mesh)
}
Rock.prototype = Object.assign(Object.create(SpaceObject.prototype), {
  constructor: Rock,
  isRock: true
} );
// export {Rock};
