import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import moon from "../images/moon.jpg";
import earth from "../images/earth.jpg";
import * as TWEEN from "tween.js";

// set the render
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

// set the scene
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
// scene.fog = new THREE.FogExp2(0xffffff, 0.01);
scene.fog = new THREE.Fog(0, 0, 700);

// set the camera
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// to allow and see camera rotation
const orbit = new OrbitControls(camera, renderer.domElement);
orbit.enableZoom = true;
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);
camera.position.set(-10, 30, 30);
orbit.update();

// lighting
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

// variable for random colors
const randomColor = new THREE.Color(
  Math.random(),
  Math.random(),
  Math.random()
);

// texture varaible that will allow to set textures of object
const textureLoader = new THREE.TextureLoader();

// create a simple object
const sphereGeometry = new THREE.SphereGeometry(4);
const sphereMaterial = new THREE.MeshStandardMaterial({
  map: textureLoader.load(moon),
  color: randomColor,
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);

// particules array
const particles = [];

function createParticle() {
  const geometry = new THREE.SphereGeometry(0.04); // size as parameter
  const material = new THREE.MeshBasicMaterial({
    color: new THREE.Color(Math.random(), Math.random(), Math.random()),
    map: textureLoader.load(earth),
  }); // each particule has a random color, different of the randomcolor variable
  const particle = new THREE.Mesh(geometry, material);

  // Randomly position the particle within a sphere
  const radius = Math.random() * 40 + 40;
  const theta = Math.random() * Math.PI * 2;
  const phi = Math.random() * Math.PI * 2;
  particle.position.set(
    radius * Math.sin(theta) * Math.cos(phi),
    radius * Math.sin(theta) * Math.sin(phi),
    radius * Math.cos(theta)
  );

  // Add the particle to the scene
  scene.add(particle);
  particles.push(particle);
}
// create X number of particules
const numberOfParticules = 1500;
for (let i = 0; i < numberOfParticules; i++) {
  createParticle();
}

// Event listener for mouse scroll
// document.addEventListener("wheel", function (event) {
//   event.preventDefault();

//   const zoomSpeed = 0.1; // Adjust the zoom speed here
//   const zoomDelta = -event.deltaY * zoomSpeed; // Invert the zoom direction

//   // Calculate the zoom factor based on the mouse position
//   const mouse = new THREE.Vector2();
//   mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//   mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
//   const zoomFactor = Math.pow(0.95, zoomDelta) * 1.1;
//   const zoomAmount =
//     (camera.position.z - camera.near) * zoomFactor -
//     (camera.position.z - camera.near);

//   // Get the world position of the mouse cursor
//   const raycaster = new THREE.Raycaster();
//   raycaster.setFromCamera(mouse, camera);
//   const intersects = raycaster.intersectObjects(scene.children);
//   const target =
//     intersects.length > 0 ? intersects[0].point : new THREE.Vector3();

//   // Zoom towards the mouse position
//   const zoomDirection = camera.position.clone().sub(target).normalize();
//   const newPosition = camera.position
//     .clone()
//     .add(zoomDirection.multiplyScalar(zoomAmount));
//   camera.position.copy(newPosition);
// });

// animation of the scene
function animate() {
  sphere.rotation.z += 0.02;
  particles.forEach((particle) => (particle.rotation.x += 0.06));
  orbit.update();
  TWEEN.update();
  renderer.render(scene, camera);
}

// renderer of the animated scene
renderer.setAnimationLoop(animate);
