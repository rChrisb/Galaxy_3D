import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import moon from "../images/moon.jpg";
import earth from "../images/earth.jpg";
import rocks from "../images/rocks-stones-with-rough-surface.jpg";
import rocks2 from "../images/rocks2.jpg";
import spaceshipmap from "../images/spaceship_texture.jpg";
import pink from "../images/pink-red-mix-paints-paper.jpg";
import * as TWEEN from "tween.js";
import { gsap } from "/node_modules/gsap/index";
import * as dat from "dat.gui";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";

// import 3D model
const spaceship = new URL("../models/spaceship.fbx", import.meta.url);
const spaceship2 = new URL("../models/3d-model.fbx", import.meta.url);
const spaceship3 = new URL(
  "../models/uploads_files_869754_space_shuttle_fbx_export(1).fbx",
  import.meta.url
);
// set the render
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

// set the scene
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
// scene.fog = new THREE.FogExp2(0xffffff, 0.01);
scene.fog = new THREE.Fog(0, 0, 700);
scene.background = new THREE.Color(0x0e041b);

// set the camera
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// to allow and see camera rotation
const orbit = new OrbitControls(camera, renderer.domElement);
orbit.enableZoom = false;
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);
camera.position.set(0, 0, 100);
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
const sphereGeometry = new THREE.SphereGeometry(8, 50, 50);
const sphereMaterial = new THREE.MeshPhysicalMaterial({
  map: textureLoader.load(rocks),
  color: randomColor,
});
const firstPlanet = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(firstPlanet);
firstPlanet.position.set(10, 10, 60);

// Define the array of spaceship model URLs and their corresponding scale values
const spaceshipModels = [
  { url: spaceship.href, scale: 0.8 },
  {
    url: spaceship2.href,
    scale: 0.01,
    rotationY: Math.PI,
    texture: spaceshipmap,
  },
  /* { url: spaceship3.href, scale: 0.005, rotationY: Math.PI }, */
  // Add more spaceship model URLs and scale values if needed
];

// Randomly select a spaceship model and its corresponding scale value
const randomModelIndex = Math.floor(Math.random() * spaceshipModels.length);
const selectedModel = spaceshipModels[randomModelIndex];

const modelLoader = new FBXLoader();
let spaceshipModel;
const spaceshipOffset = new THREE.Vector3(0, -1, -5);

modelLoader.load(
  selectedModel.url,
  function (model) {
    spaceshipModel = model;
    spaceshipModel.traverse(function (child) {
      if (child.isMesh && child.material && child.material.color) {
        // Change the color of the spaceship's material
        child.material.color.set(0x103d19); // Set the color to red (adjust the color value as needed)

        // Change the texture of the spaceship's material
      }
    });
    spaceshipModel.scale.set(
      selectedModel.scale,
      selectedModel.scale,
      selectedModel.scale
    );
    spaceshipModel.color;

    if (selectedModel.rotationY) {
      spaceshipModel.rotation.y = selectedModel.rotationY;
    }

    scene.add(spaceshipModel);
  },
  undefined,
  function (err) {
    console.error(err);
  }
);
console.log(randomColor);

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
  const radius = Math.random() * 100 + 40;
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
const numberOfParticules = 4500;
for (let i = 0; i < numberOfParticules; i++) {
  createParticle();
}

// renderer.domElement.addEventListener("mousedown", function () {
//   gsap.to(camera.position, {
//     duration: 1,
//     z: camera.position.z - 10,
//     ease: "power3.inOut",
//   });
// });
// animation of the scene
function animate() {
  /* const targetX = (mouseX / window.innerWidth) * 2 - 1;
  const targetY = -(mouseY / window.innerHeight) * 2 + 1; */

  const speed = options.speed;
  if (leftZoomDirection !== 0) {
    const leftZoomSpeed = -1 * speed; // Adjust the zoom speed as needed
    const newCameraZ = camera.position.z + leftZoomSpeed * leftZoomDirection;

    // Calculate the distance between the camera and the sphere
    const distance = camera.position.distanceTo(firstPlanet.position);

    if (distance <= 15 && newCameraZ <= firstPlanet.position.z + 15) {
      gsap.to(camera.position, {
        duration: 1,
        z: firstPlanet.position.z + 5,
        ease: "power3.inOut",
      }); // Limit the zoom when in front of the sphere
    } else {
      hideMessageButton();
      camera.position.z = newCameraZ; // Allow zooming otherwise
    }

    /* camera.lookAt(0, 0, 0); */
  }

  // Update camera position based on zoom direction for right button
  if (rightZoomDirection !== 0) {
    const rightZoomSpeed = -1 * speed; // Adjust the zoom speed as needed
    const newCameraZ = camera.position.z + rightZoomSpeed * rightZoomDirection;

    // Calculate the distance between the camera and the sphere
    const distance = camera.position.distanceTo(firstPlanet.position);

    if (distance <= 15 && newCameraZ <= firstPlanet.position.z + 15) {
      gsap.to(camera.position, {
        duration: 1.5,
        z: camera.position.z + 5,
        ease: "power3.inOut",
      }); // Limit the zoom when in front of the first Planet
    } else {
      camera.position.z = newCameraZ; // Allow zooming otherwise
    }
    if (distance <= 17) showMessageButton();
    else hideMessageButton();

    /* camera.lookAt(0, 0, 0); */
  }
  if (spaceshipModel) {
    const spaceshipPosition = camera.position.clone().add(spaceshipOffset);
    spaceshipModel.position.copy(spaceshipPosition);
    spaceshipModel.rotation.x = THREE.MathUtils.degToRad(10);
  }

  firstPlanet.rotation.y += 0.007;
  /* particles.forEach((particle) => (particle.rotation.x += 0.06)); */
  orbit.update();
  TWEEN.update();
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

// Variables to keep track of the zoom direction for each mouse button
let leftZoomDirection = 0;
let rightZoomDirection = 0;

// Register mousedown and mouseup events
window.addEventListener("mousedown", function (event) {
  if (event.button === 0) {
    leftZoomDirection = -1; // Zoom in when the left button is held down
  } else if (event.button === 2) {
    rightZoomDirection = 1; // Zoom out when the right button is held down
    leftZoomDirection = 0;
  }
  mouseX = event.clientX;
  mouseY = event.clientY;
});
window.addEventListener("mouseup", function (event) {
  if (event.button === 0) {
    leftZoomDirection = 0; // Stop zooming when the left button is released
  } else if (event.button === 2) {
    rightZoomDirection = 0; // Stop zooming when the right button is released
  }
});

// Register mousemove event to track mouse position
window.addEventListener("mousemove", function (event) {
  mouseX = event.clientX;
  mouseY = event.clientY;
});
// Animation of the scene using GSAP's ticker
gsap.ticker.add(animate);
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

// Function to zoom the camera towards the mouse position

// gui options
const gui = new dat.GUI();
gui.close();
// const guiContainer = document.createElement("div");
// guiContainer.classList.add("gui-container");
// document.body.appendChild(guiContainer);
// guiContainer.appendChild(gui.domElement);

const options = {
  speed: 0.3,
  color: "#4a4714", // Red
  sound: "on",
};
gui.add(options, "speed", 0.1, 1.25);
gui.addColor(options, "color").onChange(function (e) {
  spaceshipModel.traverse(function (child) {
    if (child.isMesh) {
      // Change the color of the spaceship's material
      child.material.color.set(e); // Set the color to red (adjust the color value as needed)
    }
  });
});

const messageOverlay = document.getElementById("message-overlay");
const messageButton = document.getElementById("message-button");

function updateButtonPosition() {
  if (!camera || !messageButton) return; // Check if the camera and messageButton are defined

  const cameraPosition = camera.position.clone();
  const cameraProjection = cameraPosition.clone().project(camera);
  const x = ((cameraProjection.x + 1) * window.innerWidth) / 2;
  const y = ((-cameraProjection.y + 1) * window.innerHeight) / 2;
  const buttonZ = camera.position.z - 10; // Adjust the distance between the camera and button

  messageButton.style.left = x + "px";
  messageButton.style.top = y + "px";
}

function showMessageButton() {
  updateButtonPosition();
  messageButton.style.display = "block";
}

function hideMessageButton() {
  messageButton.style.display = "none";
}
document.addEventListener("keydown", function (event) {
  if (event.code === "Enter" && messageButton.style.display === "block") {
    messageButton.click();
    console.log("the user wants to enter the planet!");
  }
});

// renderer of the animated scene
function playBackgroundSound() {
  const backgroundMusic = document.getElementById("backgroundMusic");
  backgroundMusic.play();
}
document.addEventListener("contextmenu", playBackgroundSound);
document.addEventListener("click", playBackgroundSound);
document.addEventListener("keydown", playBackgroundSound);
