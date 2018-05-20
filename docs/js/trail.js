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
function Trail(parent, x0, y0, z0, n, period) {
  this.n = n || 100;
  this.i = 0;
  this.period = period || 1;
  this.elapsedTime = 0;

  var array = new Float32Array( n * 3 * 2); // 3 values / point * 2 points / segment
  array[0] = array[3] = x0;
  array[1] = array[4] = y0;
  array[2] = array[5] = z0;
  var geometry = new THREE.BufferGeometry();
  geometry.addAttribute('position', new THREE.BufferAttribute(array, 3));
  var material = new THREE.LineBasicMaterial({color: 0xaaaaff, linewidth: 2});
  THREE.LineSegments.call(this, geometry, material);
  parent.add(this);
}
Trail.prototype = Object.assign(Object.create(THREE.LineSegments.prototype), {
  constructor: Trail,
  isTrail: true,

  setPosition: function(x, y, z, t) {
    this.elapsedTime += t;
    if (this.elapsedTime > this.period) {
      this.elapsedTime = 0;
      var positions = this.geometry.attributes.position.array;
      var j = this.i;
      this.i = (this.i + 1) % this.n;
      positions[this.i*6 + 0] = positions[j*6 + 3];
      positions[this.i*6 + 1] = positions[j*6 + 4];
      positions[this.i*6 + 2] = positions[j*6 + 5];
      positions[this.i*6 + 3] = x;
      positions[this.i*6 + 4] = y;
      positions[this.i*6 + 5] = z;
      this.geometry.attributes.position.needsUpdate = true;
    }
  }
} );
// export {Trail};