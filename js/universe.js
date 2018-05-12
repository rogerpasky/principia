//import {THREE} from 'three.js';

function Universe(radius) {
  THREE.Object3D.call(this);
  this.type = 'Universe';

  scene.add(this);

  this.light = new THREE.AmbientLight('white', 0.02);
  this.add(this.light);

  this.radius = radius/K || 7.0e8/K;
  var texture = new THREE.TextureLoader().load("/textures/stars.png");
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