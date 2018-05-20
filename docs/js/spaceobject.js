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
let spaceObjects = [];

function SpaceObject(universe, x, y, z, radius, name, vx0, vy0, vz0, mass, tilt, period) {
    THREE.Object3D.call(this);
    this.type = 'SpaceObject';
  
    this.position.x = x/K || 0;
    this.position.y = y/K || 0;
    this.position.z = z/K || 0;
  
    this.mesh = new THREE.Mesh();
    this.radius = radius/K || 0;
    this.velocity = new THREE.Vector3(vx0/K || 0, vy0/K || 0, vz0/K || 0);
    this.mass = mass/K || 0;
    this.tilt = tilt || 0;
    this.rotation.z = this.tilt;
    this.period = period || 0;
    this.g = new THREE.Vector3();
    universe.add(this);
    spaceObjects.push(this);
  
    this.viewPoint = new ViewPoint(universe, this, 0, 0, radius*5 , name); // Unscaled
    this.trail = new Trail(universe, this.position.x, this.position.y, this.position.z, 200, 50)
}
SpaceObject.prototype = Object.assign(Object.create(THREE.Object3D.prototype), {
  constructor: SpaceObject,
  isSpaceObject: true,
  
  reScale: function(scaleValue) {
    this.mesh.scale.set(scaleValue, scaleValue, scaleValue);
  },

  applyForces: function(timeIncrement) {
    this.velocity.addScaledVector(this.g, timeIncrement/this.mass);
  },
  
  move: function(timeIncrement) {
    this.position.addScaledVector(this.velocity, timeIncrement);
    if (this.period) this.mesh.rotation.y += 2*Math.PI*timeIncrement/this.period;
    this.trail.setPosition(this.position.x, this.position.y, this.position.z, timeIncrement);
  }
})
// export {SpaceObject};

let scaleFactor = 0;

function reScale(increment) {
  scaleFactor += increment;
  if (scaleFactor > 5) scaleFactor = 5;
  if (scaleFactor < 0) scaleFactor = 0;
  spaceObjects.forEach(object => {
    object.reScale(Math.pow(2, scaleFactor));
  })
}

const G = 6.67408e-11/K/K; // 6.674e−11 m3⋅kg−1⋅s−2

function physicsAnimationStep(timeDelta) {
  spaceObjects.forEach(body => {
    body.move(timeDelta);
  })
  spaceObjects.forEach(attracted => {
    attracted.g.setScalar(0);
    spaceObjects.forEach(attractor => {
      if (attracted !== attractor) {
        var distance = attractor.position.clone().sub(attracted.position);
        var gFactor = G * attracted.mass * attractor.mass / Math.pow(distance.lengthSq(), 1.5);
        attracted.g.addScaledVector(distance, gFactor);
      }
    })
    attracted.applyForces(timeDelta);
  })
}
