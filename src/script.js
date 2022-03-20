import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/*
Materials are used to put a color on each visible pixel of the geometries, The algorithms are written in programs called shaders, We dont need to write shaders and we can use built in materials.

SETUP ->

The starter is empty so we can practice a little.


*/

/*
 * OBJECT
 */

/*

// ------------ 1ST : PREPAPRE SCENE : CREATE THREE MESH -----------------------

Prepare OUR SCENE ->

Create 3 Meshes composed of 3 Different Geometries (a sphere, a plane and a torus)
Use the same MeshBasicMaterial on all 3.
*/

// If you dont give any color it the default will be white.
// const material = new THREE.MeshBasicMaterial();
const material = new THREE.MeshBasicMaterial({ color: "pink" });

// 1st mesh
const sphere = new THREE.Mesh(
  new THREE.SphereBufferGeometry(0.5, 16, 16),
  material
);

const plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(1, 1), material);
plane.position.x = -1.2;

const torus = new THREE.Mesh(
  new THREE.TorusBufferGeometry(0.3, 0.2, 16, 32),
  material
);
torus.position.x = +1.2;

// We can add multiple mesh at one code, instead of adding it separately.
scene.add(sphere, plane, torus);

/* As we made all the mesh using the same material so, If i want to change all the meshes color, i can do that in go, In material code itself 
const material = new THREE.MeshBasicMaterial({color:'pink'});

And having one material is better for performance. If You have 100 mesh in your scene having the same colour its better to have one material for all meshes.
*/

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */

const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  /*
  // ------------ 2ND : CREATING ROTATION ANIMATION -----------------------

   // UPDATE THE OBJECTS
    ROTATE THE OBJECTS IN THE TICK FUNCTION 
  */

  sphere.rotation.y = 0.1 * elapsedTime;
  plane.rotation.y = 0.1 * elapsedTime;
  torus.rotation.y = 0.1 * elapsedTime;

  sphere.rotation.x = 0.15 * elapsedTime;
  plane.rotation.x = 0.15 * elapsedTime;
  torus.rotation.x = 0.15 * elapsedTime;

  // YOU dont need to rotate on z axis, because rotating in and x and y is already showing all possible rotation.

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
