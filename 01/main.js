import * as THREE from "three"

// size we will use for the canvas and renderer
const sizes = {
  w: window.innerWidth,
  h: window.innerHeight
};

// canvas
const canvas = document.querySelector("canvas.webgl");

// scene
const scene = new THREE.Scene();

// object
const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({color: "red"})
const mesh = new THREE.Mesh(geometry, material);

// add mesh to scene
scene.add(mesh);

// camera
const camera = new THREE.PerspectiveCamera(45, sizes.w / sizes.h, 1, 1000);

// set its position
camera.position.z = 5;
camera.position.y = 2;

// add camera to scene
scene.add(camera);

// create renderer and link to to our HTML canvas
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})

// set the renderer size
renderer.setSize(sizes.w, sizes.h);

// render a frame
renderer.render(scene, camera);