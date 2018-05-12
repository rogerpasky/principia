let viewPoints = [];
let viewPointIndex = 0;
let nameContainer;

function ViewPoint(universe, target, x, y, z, name) {
  let aspectRatio = window.innerWidth / window.innerHeight;
  this.camera = new THREE.PerspectiveCamera(50, aspectRatio, 0.1, 2*universe.radius);
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
