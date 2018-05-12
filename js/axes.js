function Axes(parent, size, x, y, z, n) {
  size = size/K || 1;
  var vertices = [
    0, 0, 0,	size, 0, 0,
    0, 0, 0,	0, size, 0,
    0, 0, 0,	0, 0, size,
    0, 0, 0,	-size, 0, 0,
    0, 0, 0,	0, -size, 0,
    0, 0, 0,	0, 0, -size,
  ];
  var colors = [
    1, 0, 0,	0.1, 0, 0,
    0, 1, 0,	0, 0.1, 0,
    0, 0, 1,	0, 0, 0.1,
    0, 1, 1,	0, 0.1, 0.1,
    1, 0, 1,	0.1, 0, 0.1,
    1, 1, 0,	0.1, 0.1, 0,
  ];
  var n = n || 0; // TODO: Decimal measure lines

  var geometry = new THREE.BufferGeometry();
  geometry.addAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.addAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  var material = new THREE.LineBasicMaterial({vertexColors: THREE.VertexColors});

  THREE.LineSegments.call(this, geometry, material);
  this.position.x += x/K;
  this.position.y += y/K;
  this.position.z += z/K;
  parent.add(this);
}
Axes.prototype = Object.assign(Object.create(THREE.LineSegments.prototype), {
  constructor: Axes,
  isAxes: true
} );
// export {Axes};

