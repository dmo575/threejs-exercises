import * as THREE from "three"

// size we will use for the canvas and renderer. Here we are using the client's window entirely. Keep in mind that since these values are captured once when first
// running the code, any resizing we do to the window will not update these values, you will need to refresh.
const sizes = {
  w: window.innerWidth,
  h: window.innerHeight
};

// canvas
// we get the canvas element on our index.html
const canvas = document.querySelector("canvas.webgl");

// scene
// we create a 3D scene. This is where we will add out meshes and cameras. You can think of this as the 3D world/space we will work in.
const scene = new THREE.Scene();

// object
// first we create a basic geometry, a 3D box. a geometry defines shape only.
const geometry = new THREE.BoxGeometry(1,1,1);
// then we create a material, in this case a basic material that we can apply to a mesh with the color red.
const material = new THREE.MeshBasicMaterial({color: "red"})
// finally we create a mesh. A mesh takes in a geometry (a shape, in this case our box) and a material to apply to that geometry, in this case our red meterial
const mesh = new THREE.Mesh(geometry, material);

// add mesh to scene. Creating a mesh (a geometry with a material applied to it) is not enough, we also need to add that mesh onto our world.
scene.add(mesh);

// camera
// a camera is a special object that we can add into a scene that defines some properties related to our viewport.
// field of view (set to 45), is the apperture if you will, of the camera, in degrees. 360 means you can see everything, including behind you.
// dimension of the camera goes next, for us is our canvas width / our canvas height. A good way of thinking about dimension is, if the number is less than 0, you have
// entered the portrait space, if its more than 0 you are in the landscape space and, if its 0, then its a squared viewport. You can mentally picture how the viewport would
// change by sliding that number from one extre to the other based on that information.
// the 1 and 1000 values are, I believe the clipping ranges. Meaning what is the depth range you want to capture. If the units were meters, you can think of these as
// "I want this camera to be able to see everything it has in front of it, starting 1 meter after its position and ending 1000 meters away."
const camera = new THREE.PerspectiveCamera(45, sizes.w / sizes.h, 1, 1000);
// There are more simple cameras out there, like ortographic cameras, those do not have field of view I believe. But because of that they don't record depth really well.

// set the camera position
camera.position.z = 5;
camera.position.y = 2;

// add camera to scene
scene.add(camera);

// create renderer and link to to our HTML canvas
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})

// set the renderer size. This will in turn modify our canvas elemet size.
renderer.setSize(sizes.w, sizes.h);

// render a frame
// we provide the renderer with a scene to render, and a camera to render from (remember to add the camera to the scene as well as not doing so might cause undefined behavior)
renderer.render(scene, camera);