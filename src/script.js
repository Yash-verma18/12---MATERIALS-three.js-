import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import { MaterialLoader } from "three";

// Add debug control

const gui = new dat.GUI();

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/*
 * TEXTURES
 *
 */

/* ------------- 3RD : LOAD THE TEXTURE ---------------- */

const textureLoader = new THREE.TextureLoader();
const doorColorTexture = textureLoader.load("/textures/door/color.jpg");

// now update the mesh material so we can see the texture : "const material = new THREE.MeshBasicMaterial({ map: colorTexture });"

// Loading more textures
const doorAlphaTexture = textureLoader.load("/textures/door/alpha.jpg");
const doorHeightTexture = textureLoader.load("/textures/door/height.jpg");
const doorNormalTexture = textureLoader.load("/textures/door/normal.jpg");
const doorAmbientOcclusionTexture = textureLoader.load(
  "/textures/door/ambientOcclusion.jpg"
);
const doorMetalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
const doorRoughnessTexture = textureLoader.load("/textures/door/roughness.jpg");

// Matcap
const matcapTexture = textureLoader.load("/textures/matcaps/1.png");

// Gradient
const gradientTexture = textureLoader.load("/textures/gradients/3.jpg");

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

// ---------------------------MESH BASIC MATERIAL---------------------------

/*

Until now, we used the MeshBasicMaterial which applies a uniform color or a texture on our geometry. Search for material on the Three js documentation. We are going to test them all.

1. MeshBasicMaterial : The most basic material but we did not cover all its properties. Most of the materials properties can be set in two ways, We will use the second method.

*/

// If you dont give any color it the default will be white.
// const material = new THREE.MeshBasicMaterial();

// const material = new THREE.MeshBasicMaterial();
// one way of giving texture :
// const material = new THREE.MeshBasicMaterial({
//   map: doorColorTexture,
// });

// 2nd way of giving texture, Same results.
// material.map = doorColorTexture;

/*
Color will apply a uniform color on the surface of the geometry, Once Instatiated, The color property becomes a color.

// const material = new THREE.MeshBasicMaterial({
//   color: 'red',
// });

// This wont work :- 
material.color = 'red';


*/
// So to change a color, we have to use set method.
// material.color.set("red");

// Or we have to provide the Color class instantiate.
// material.color.set("red");

// We can combine color and map, We get combine results :
// material.map = doorColorTexture;
// material.color.set(0x00ff00);

// Wireframe will show the triangels that compose the geometry. All the subdivision are visible
// material.wireframe = true;

// Opacity controls the general opacity, We need to set 'transparent = true' to use opacity feature.
// material.transparent = true;
// material.opacity = 0.5;

// You can enable texture to see the Door effect.
// AlphaMap controls transparency with a texture, so We need to set 'transparent = true' to use alphamap feature.
// material.map = doorColorTexture;
// material.alphaMap = doorAlphaTexture;
// As you can see the door is visible and all the white color is not, so we have to use the map and alpha map feature.

/*
Side lets you decide which side of a face is visible
* THREE.FrontSide (default)
* THREE.BackSide
* THREE.DoubleSide
*/

// material.side = THREE.FrontSide;
// material.side = THREE.BackSide;
// material.side = THREE.DoubleSide;
// Try not to use double Size cause its more calculation for the GPU and the computer.

// Some of these propeties like wireframe or opacity can be used with other types of materials.

// ---------------------------MESH NORMAL MATERIAL---------------------------

/*
normals are information that contains the direction of the outside of the face.

normals can be use for lighting, reflection, refraction etc.
MeshNormalMaterial shares common properties with MeshBasicMaterial like wireframe, transparent, opacity, side. But there is also a flatshading property

Flatshading property will flatten the faces, meaning that the normals wont be interpolated between the vertices.

MeshNormalMaterial is usually used to debug normals, but the color looks so great that you can use it for your projects.
*/

// IT DOES LOOK VERY COOL
// const material = new THREE.MeshNormalMaterial();
// material.wireframe = true;
// THIS LOOKS VERY COOL. ITS FLAT, WE CAN SEE THE FACES
// material.flatShading = true;

// ----------------------------------------------------------------------------------

// ---------------------------MESH MAT CAP MATERIAL---------------------------

/*

MESHMATCAPMATERIAL : will display a color by using the normals as a reference to pick the right color on a texture that looks like a sphere.

To find the matcaps textures: 'https://github.com/nidorx/matcaps'
You can also create your own with a 3D software, Or you can create it in a 2D software like photoshop.

*/

// const material = new THREE.MeshMatcapMaterial();

// Set the matcap texture with the matcap property
// We get an illusion that the objects are being illuminated.
// This material is faking light without the light in the scene.

// material.matcap = matcapTexture;

// ----------------------------------------------------------

// ---------------------------MESH DEPTH MATERIAL---------------------------

/*
It will simply color the geometry in 'white' if its close to the 'near', And in 'black' if its close to the 'far' value of the camera.
As you zoom to the object, the objects gets visible. VICE VERSA (NEAR = WHITE, FAR = BLACK)

This can be used for fogs, snowfall. 
*/

// const material = new THREE.MeshDepthMaterial();

// ---------------------------------------------------------------------------
// ---------------------------------ADDING A FEW LIGHTS------------------------------------------

/*

The next material that we are gonna use needs lights. So we will use lights here.
Lights does not work on meshdepthmaterial.
*/

/*
 * Lights
 */
// first parameter is white and 2nd is intensity
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;

scene.add(pointLight);

// ---------------------------------MESH LAMBERT MATERIAL------------------------------------------
/*THIS MESH LAMBERT MATERIAL WOULD NOT ABLE TO SEE WITHOUT THE LIGHTS, IT JUST REACT TO LIGHT
It have new properties related to lights but we will see those later with a more adequate material. Its performant but we see strange patterns on the geometry.
*/
// const material = new THREE.MeshLambertMaterial();

// -------------------------------------------------------------------------
// ---------------------------------MESH PHONG MATERIAL------------------------------------------
/* Same results, but strange pattern is gone, Its similar to mesh lambert material, but the strange patterns are less visible, and you can also see the light relection

We can control light reflection with 'shininess' and the color of this reflection with 'specular'
*/
// const material = new THREE.MeshPhongMaterial();
// material.shininess = 10000;
// material.specular = new THREE.Color("red");

// -------------------------------------------------------------------------
// ---------------------------------MESH TOON MATERIAL------------------------------------------
/*
Its similar to meshlambermaterial but with a cartoonish.
To add a more steps to the coloration, you can use the gradientMap property and use the gradientTexture

If you want cartoonish, use it.

*/

// const material = new THREE.MeshToonMaterial();
// material.gradientMap = gradientTexture;

// We see a gradient instead of a clear separation because the gradient is small and the magfilter tries to fix it with the mipmapping. Set the minFilter and magFilter to Three.nearestFilter, We can also deactivate the mipmapping. 'gradie'

// gradientTexture.minFilter = THREE.NearestFilter;
// gradientTexture.magFilter = THREE.NearestFilter;

/*As we are using nearest filter so deactivate the generate mip maps, Its always better to deactivate them if we can. */
// gradientTexture.generateMipmaps = false;

// try more gradient we have in gradients folder.
// const gradientTexture = textureLoader.load("/textures/gradients/5.jpg");

// -------------------------------------------------------------------------
// ---------------------------------MESH STANDARD MATERIAL------------------------------------------

const material = new THREE.MeshStandardMaterial();

/*
It uses physically based rendering principles (PBR) Like MeshLambertMaterial and MeshPhongMaterial, It supports lights but with a more realistic algorithm and better parameters like roughness and metalness.
*/

// We can change the roughness and the metalness.
// material.metalness = 0.45;
// material.roughness = 0.65;
material.side = THREE.DoubleSide;

// map allows you apply a texture
material.map = doorColorTexture;

// aoMap ("ambient occlusion map") will add shadows where the texture is dark. We must add a second set of UV named uv2 to use this feature.
material.aoMap = doorAmbientOcclusionTexture;

// Add the aomap with the doorAmbientOcculsionTexture texture and control the instensity with aoMapIntensity
material.aoMapIntensity = 1;
gui.add(material, "aoMapIntensity").min(0).max(5).step(0.0001);

// DisplacementMap will move the vertices to create relief
// height map and displacement map are the same.
material.displacementMap = doorHeightTexture;
material.displacementScale = 0.09;
gui.add(material, "displacementScale").min(0).max(1).step(0.0001);

/*
It should look terrible because it lacks vertices and the displacement is way too strong.
*/

// Instead of specifying uniform, matalness and roughness for the whole geometry, we can use metalnessMap and roughnessMap
// When its black it goes up and when white it goes down.

material.metalnessMap = doorMetalnessTexture;
material.roughnessMap = doorRoughnessTexture;

// The reflection looks weird because the metalness and roughness properties still affect each map respectively, comment metalness and roughness or use their original values.
material.metalness = 0;
material.roughness = 1;

// material.wireframe = true;

// gui.add(material, "metalness", 0.1, 1);
// gui.add(material, "roughness", 0.1, 1);
gui.add(material, "metalness").min(0).max(1).step(0.0001);
gui.add(material, "roughness").min(0).max(1).step(0.0001);

// -------------------------------------------------------------------------
// 1st mesh
const sphere = new THREE.Mesh(
  new THREE.SphereBufferGeometry(0.5, 64, 64),
  material
);
sphere.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2)
);

const plane = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(1, 1, 100, 100),
  material
);

// AMBIENT OCCULSIONS
// console.log(plane.geometry.attributes.uv.array);
// To add a new attribute to geometry
// Three js need uv2 coordinates in order to place the ambient occulsions on the texture. Cause uv coordinates has to go 2*2
plane.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2)
);

plane.position.x = -2.5;

const torus = new THREE.Mesh(
  new THREE.TorusBufferGeometry(0.3, 0.2, 64, 128),
  material
);
torus.position.x = +2.5;
torus.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2)
);

// We can add multiple mesh at one code, instead of adding it separately.
scene.add(torus, plane, sphere);

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
  // plane.rotation.y = 0.1 * elapsedTime;
  torus.rotation.y = 0.1 * elapsedTime;

  sphere.rotation.x = 0.15 * elapsedTime;
  // plane.rotation.x = 0.15 * elapsedTime;
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
