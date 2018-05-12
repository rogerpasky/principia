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
