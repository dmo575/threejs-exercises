import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

// demo scene set up. A scene with a perspective camera and a blue cube
const canvas = document.querySelector("canvas.webgl");
const scene = new THREE.Scene();
const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(),
  new THREE.MeshBasicMaterial({color: "blue"})
);
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);

const renderer = new THREE.WebGLRenderer({canvas: canvas});
// set the pixel ratio of the renderer. This will make the renderer render images with the correct amount of pixels based on our actual physical amount of pixels, unless the
// pixel ratio is more than 2, at which case it would be too many pixels and we could have performance issues.
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
const controls = new OrbitControls(camera, canvas);

scene.add(mesh);
scene.add(camera);

camera.position.z = 3;


//the game loop, where we will be able to run things "every frame" (every animation frame):

// last tick is first given the current time.
let lastTick = Date.now();

// runs every animation frame
function update() {
  // get delta
  const currTick = Date.now();
  const delta = (currTick - lastTick) / 1000.0;

  // update cube's rotation
  //mesh.rotation.y += 1.0 * delta;

  // render
  renderer.render(scene, camera);

  // prep for next update: 1-request another animation frame and pass the update function to be executed then, 2-update lastTick
  window.requestAnimationFrame(update);
  lastTick = currTick;
}

// handle resize
window.addEventListener("resize", () => {
  // here we update the camera aspect ratio
  camera.aspect = window.innerWidth / window.innerHeight;

  // for some reason we need to update the projection matrix too
  camera.updateProjectionMatrix();

  // we also update the renderer size, which is the canvas. If we dont we would have wrapping in our image because of differences in size between the camera and the canvas,
  // which would make it so that the image we get from the camera would stretch in and out to fit the canvas.
  renderer.setSize(window.innerWidth, window.innerHeight);

  // set the pixel ratio of the renderer. This will make the renderer render images with the correct amount of pixels based on our actual physical amount of pixels, unless the
  // pixel ratio is more than 2, at which case it would be too many pixels and we could have performance issues.
  // placed onside the resize because someone could drag the browser onto a second monitor.
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

update();