function Star(universe, x, y, z, radius, name, texture, vx0, vy0, vz0, mass, tilt, period) {
  SpaceObject.call(this, universe, x, y, z, radius, name, vx0, vy0, vz0, mass, tilt, period);
  this.type = 'Star';

  texture = texture || 'images/textures/sun.png'
  var texture = new THREE.TextureLoader().load(texture);
  var cover = new THREE.MeshBasicMaterial({map: texture, lights: false});
  var shape = new THREE.SphereGeometry(this.radius, 32, 16);
  this.mesh = new THREE.Mesh(shape, cover);
  this.add(this.mesh);
  
  var sunlight = new THREE.PointLight('white', 1.75);
  this.mesh.add(sunlight);
}
Star.prototype = Object.assign(Object.create(SpaceObject.prototype), {
  constructor: Star,
  isStar: true
} );
// export {Star};