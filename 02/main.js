import * as THREE from "three"
import { aspectRatio } from "./aspect_ratio";

// demo scene set up. A scene with a perspective camera and a blue cube
const canvas = document.querySelector("canvas.webgl");
const scene = new THREE.Scene();
const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(),
  new THREE.MeshBasicMaterial({color: "blue"})
);
const camera = new THREE.PerspectiveCamera(45, aspectRatio.get(), 1, 1000);

const renderer = new THREE.WebGLRenderer({canvas: canvas});
renderer.setSize(aspectRatio.width, aspectRatio.height);

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
  mesh.rotation.y += 1.0 * delta;

  // render
  renderer.render(scene, camera);

  // prep for next update: 1-request another animation frame and pass the update function to be executed then, 2-update lastTick
  window.requestAnimationFrame(update);
  lastTick = currTick;
}

update();