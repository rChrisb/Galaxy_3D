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
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { FirstPersonControls } from "three/examples/jsm/controls/FirstPersonControls";

// import 3D model
const spaceship = new URL("../models/spaceship.fbx", import.meta.url);
const spaceship2 = new URL("../models/3d-model.fbx", import.meta.url);
const spaceship3 = new URL(
  "../models/uploads_files_869754_space_shuttle_fbx_export(1).fbx",
  import.meta.url
);
const options = {
  speed: 0.3,
  color: "#4a4714", // Red
  sound: "on",
};
const menuMusic = document.getElementById("menuMusic");
const sceneMusic = document.getElementById("sceneMusic");
menuMusic.play();

// window.addEventListener("click", () => {
//   menuMusic.loop = true;
//   menuMusic.play();
// });

// Menu page
const messageButton = document.getElementById("message-button");
const startButton = document.getElementById("start-button");
// const loadingScreen = document.getElementById('loading-screen');
// const progressBar = document.getElementById('progress-bar');
const openingText = document.getElementById("scrolling-text");
const menuContainer = document.getElementById("menu-container");
const progressBarContainer = document.querySelector(".progress-bar-container");
const progressBar = document.getElementById("progress-bar");
startButton.addEventListener("click", () => {
  openingText.style.display = "none"; // Hide the opening text
  startButton.style.display = "none";
  menuContainer.parentNode.removeChild(menuContainer);
  menuMusic.pause();
  menuMusic.currentTime = 0;

  sceneMusic.play();
  galaxyThreejs();
  progressBarContainer.style.display = "flex";
  // Show the loading screen

  /* progressBarContainer.style.display = "flex"; */
  /*
  // Start loading the 3D scene
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "script.js", true);

  xhr.addEventListener("progress", function (event) {
    if (event.lengthComputable) {
      const percentComplete = (event.loaded / event.total) * 100;
      console.log("Loading progress:", percentComplete.toFixed(2) + "%");

      // Update the progress bar value if you have one
      const progressBar = document.getElementById("progress-bar");
      progressBar.value = percentComplete;
    }
  });

  xhr.addEventListener("load", function () {
    console.log("Loading complete");

    // Hide the loading screen
    progressBarContainer.style.display = "none";

    // Start the 3D scene
    galaxyThreejs();

    // Delay hiding the loading screen to allow more time for the scene to load
    setTimeout(function () {
      progressBarContainer.style.display = "none";
    }, 10000);
  });

  xhr.addEventListener("error", function () {
    console.log("Error loading the 3D scene");
  });

  xhr.send(); */
});

// // Function to hide the loading screen
// function hideLoadingScreen() {
//   loadingScreen.style.display = "none";
// }

// // Function to show the loading screen
// function showLoadingScreen() {
//   loadingScreen.style.display = "block";
// }

function galaxyThreejs() {
  /* showLoadingScreen(); */
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
  const cameraDistance = 20; // Distance between the camera and spaceship
  const cameraOffset = new THREE.Vector3(0, 10, -cameraDistance); // Camera offset from the spaceship
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const controls = new FirstPersonControls(camera, renderer.domElement);
  controls.movementSpeed = 10;
  controls.lookSpeed = 0.2;

  // 3rd person camera
  // function updateCamera() {
  //   const spaceshipPosition = spaceshipContainer.position;
  //   const cameraPosition = spaceshipPosition.clone().add(cameraOffset);
  //   camera.position.copy(cameraPosition);
  //   camera.lookAt(spaceshipPosition);
  // }

  //1st person camera
  // Update camera position and lookAt based on spaceshipContainer's position
  function updateCamera() {
    const spaceshipPosition = spaceshipContainer.position;
    const spaceshipRotation = spaceshipContainer.rotation;
    const distanceFromSpaceship = 6;

    // Update camera position to follow the spaceshipContainer's position
    camera.position.copy(spaceshipPosition);
    camera.position.add(new THREE.Vector3(0, 2, -distanceFromSpaceship));

    // Update camera lookAt to follow the spaceshipContainer's rotation
    const forward = new THREE.Vector3(0, 1, -1); // Assuming the spaceship's forward direction is along the negative z-axis
    const lookAtTarget = spaceshipContainer.position.clone().add(forward);
    camera.lookAt(lookAtTarget);
  }

  // to allow and see camera rotation
  const orbit = new OrbitControls(camera, renderer.domElement);
  orbit.enableZoom = false;
  const axesHelper = new THREE.AxesHelper(2);
  scene.add(axesHelper);
  camera.position.set(0, 0, 100);
  orbit.update();

  // // loading screen
  // const xhr = new XMLHttpRequest();
  // xhr.open("GET", window.location.href, true);
  // xhr.responseType = "blob";

  // xhr.addEventListener("progress", function (event) {
  //   if (event.lengthComputable) {
  //     const progress = (event.loaded / event.total) * 100;
  //     console.log(`Scene loading progress: ${progress}%`);
  //   }
  // });
  // xhr.addEventListener("readystatechange", function () {
  //   if (xhr.readyState === XMLHttpRequest.LOADING) {
  //     console.log("Scene loading in progress");
  //   }
  // });
  // xhr.send();
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
  const loadingManager = new THREE.LoadingManager();
  const textureLoader = new THREE.TextureLoader(loadingManager);
  loadingManager.onProgress = function (url, loaded, total) {
    progressBar.value = (loaded / total) * 100;
  };

  loadingManager.onLoad = function (url) {
    progressBarContainer.style.display = "none";
    console.log("finished loading");
  };

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
    /* {
      url: spaceship2.href,
      scale: 0.01,
      rotationY: Math.PI,
      texture: spaceshipmap,
    }, */
    /* { url: spaceship3.href, scale: 0.005, rotationY: Math.PI }, */
    // Add more spaceship model URLs and scale values if needed
  ];

  // Randomly select a spaceship model and its corresponding scale value
  const randomModelIndex = Math.floor(Math.random() * spaceshipModels.length);
  const selectedModel = spaceshipModels[randomModelIndex];

  const modelLoader = new FBXLoader();
  let spaceshipModel;
  const spaceshipOffset = new THREE.Vector3(0, -1, -5);
  const spaceshipContainer = new THREE.Object3D();
  scene.add(spaceshipContainer);

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

      spaceshipContainer.add(spaceshipModel);
      progressBarContainer.style.display = "none";
    },
    undefined,
    function (err) {
      console.error(err);
    }
  );
  let spaceshipPosition = new THREE.Vector3(); // Initial spaceship position
  let spaceshipSpeed = 0.1; // Speed at which spaceship moves
  const spaceshipRotationSpeed = 0.02; // Speed at which spaceship rotates

  let moveForward = false;
  let moveBackward = false;
  let rotateLeft = false;
  let rotateRight = false;
  let moveUp = false;
  let moveDown = false;

  window.addEventListener("keydown", function (event) {
    if (event.code === "KeyW") {
      moveForward = true; // Move forward when 'W' key is pressed
    } else if (event.code === "KeyS") {
      moveBackward = true; // Move backward when 'S' key is pressed
    } else if (event.code === "KeyA") {
      rotateLeft = true; // Rotate left when 'A' key is pressed
    } else if (event.code === "KeyD") {
      rotateRight = true; // Rotate right when 'D' key is pressed
    } else if (event.code === "Space") {
      moveUp = true; // Move up when spacebar is pressed
    } else if (event.code === "ShiftLeft") {
      moveDown = true; // Move down when left shift key is pressed
    }
    if (event.code === "KeyW" && event.code === "KeyD") {
      moveForward = true;
      rotateRight = true;
    } else if (event.code === "KeyW" && event.code === "KeyA") {
      moveForward = true;
      rotateLeft = true;
    } else if (event.code === "KeyS" && event.code === "KeyD") {
      moveBackward = true;
      rotateRight = true;
    } else if (event.code === "KeyS" && event.code === "KeyA") {
      moveBackward = true;
      rotateLeft = true;
    }
    if (event.code === "KeyW" && event.code === "KeyD") {
      moveForward = false;
      rotateRight = false;
    } else if (event.code === "KeyW" && event.code === "KeyA") {
      moveForward = false;
      rotateLeft = false;
    } else if (event.code === "KeyS" && event.code === "KeyD") {
      moveBackward = false;
      rotateRight = false;
    } else if (event.code === "KeyS" && event.code === "KeyA") {
      moveBackward = false;
      rotateLeft = false;
    }
  });

  window.addEventListener("keyup", function (event) {
    if (event.code === "KeyW") {
      moveForward = false; // Stop moving forward when 'W' key is released
    } else if (event.code === "KeyS") {
      moveBackward = false; // Stop moving backward when 'S' key is released
    } else if (event.code === "KeyA") {
      rotateLeft = false; // Stop rotating left when 'A' key is released
    } else if (event.code === "KeyD") {
      rotateRight = false; // Stop rotating right when 'D' key is released
    } else if (event.code === "Space") {
      moveUp = false; // Stop moving up when spacebar is released
    } else if (event.code === "ShiftLeft") {
      moveDown = false; // Stop moving down when left shift key is released
    }
  });

  // window.addEventListener("mousemove", function (event) {
  //   const mouseX = event.clientX;
  //   const windowHalfX = window.innerWidth / 2;

  //   if (mouseX < windowHalfX) {
  //     rotateLeft = true; // Rotate left when mouse is on the left half of the screen
  //     rotateRight = false;
  //   } else {
  //     rotateLeft = false;
  //     rotateRight = true; // Rotate right when mouse is on the right half of the screen
  //   }
  // });

  function updateSpaceship() {
    const spaceshipDirection = new THREE.Vector3();
    const spaceshipQuaternion = new THREE.Quaternion();

    spaceshipDirection.z = Number(moveForward) - Number(moveBackward);
    spaceshipDirection.x = Number(rotateLeft) - Number(rotateRight);
    spaceshipDirection.y = Number(moveUp) - Number(moveDown);

    // Diagonal movement
    if ((moveForward || moveBackward) && (rotateLeft || rotateRight)) {
      const diagonalSpeed = Math.sqrt((spaceshipSpeed * spaceshipSpeed) / 2);
      spaceshipDirection.normalize().multiplyScalar(diagonalSpeed);
    } else {
      spaceshipDirection.normalize().multiplyScalar(spaceshipSpeed);
    }

    // Update spaceship rotation
    spaceshipQuaternion.setFromAxisAngle(
      new THREE.Vector3(0, 1, 0),
      spaceshipDirection.x * spaceshipRotationSpeed
    );
    spaceshipQuaternion.multiply(spaceshipContainer.quaternion);
    spaceshipContainer.quaternion.copy(spaceshipQuaternion);

    // Update spaceship position
    spaceshipPosition.add(spaceshipDirection);

    // Update spaceship container position
    spaceshipContainer.position.copy(spaceshipPosition);
    /* console.log(spaceshipPosition, firstPlanet.position); */
  }

  console.log(randomColor);

  // // particules array
  // const particles = [];

  // function createParticle() {
  //   const geometry = new THREE.SphereGeometry(0.04); // size as parameter
  //   const material = new THREE.MeshBasicMaterial({
  //     color: new THREE.Color(Math.random(), Math.random(), Math.random()),
  //     map: textureLoader.load(earth),
  //   }); // each particule has a random color, different of the randomcolor variable
  //   const particle = new THREE.Mesh(geometry, material);

  //   // Randomly position the particle within a sphere
  //   const radius = Math.random() * 100 + 40;
  //   const theta = Math.random() * Math.PI * 2;
  //   const phi = Math.random() * Math.PI * 2;
  //   particle.position.set(
  //     radius * Math.sin(theta) * Math.cos(phi),
  //     radius * Math.sin(theta) * Math.sin(phi),
  //     radius * Math.cos(theta)
  //   );

  //   // Add the particle to the scene
  //   scene.add(particle);
  //   particles.push(particle);
  // }
  // // create X number of particules
  // const numberOfParticules = 4500;
  // for (let i = 0; i < numberOfParticules; i++) {
  //   createParticle();
  // }

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
    spaceshipSpeed = speed / 5;
    // if (leftZoomDirection !== 0) {
    //   const leftZoomSpeed = -1 * speed; // Adjust the zoom speed as needed
    //   const newCameraZ = camera.position.z + leftZoomSpeed * leftZoomDirection;

    // Calculate the distance between the camera and the sphere
    let distance;
    if (firstPlanet) {
      distance = spaceshipPosition.distanceTo(firstPlanet.position);
    }

    if (distance <= 15) {
      gsap.to(spaceshipPosition, {
        duration: 1,
        z: firstPlanet.position.z + 5,
        ease: "power3.inOut",
      }); // Limit the zoom when in front of the sphere
    } else {
      hideMessageButton();
    }
    //     camera.position.z = newCameraZ; // Allow zooming otherwise
    //   }

    //   /* camera.lookAt(0, 0, 0); */
    // }

    // // Update camera position based on zoom direction for right button
    // if (rightZoomDirection !== 0) {
    //   const rightZoomSpeed = -1 * speed; // Adjust the zoom speed as needed
    //   const newCameraZ =
    //     camera.position.z + rightZoomSpeed * rightZoomDirection;

    //   // Calculate the distance between the camera and the sphere
    //   const distance = camera.position.distanceTo(firstPlanet.position);

    // if (distance <= 15 ) {
    //   gsap.to(camera.position, {
    //     duration: 1.5,
    //     z: camera.position.z + 5,
    //     ease: "power3.inOut",
    //   }); // Limit the zoom when in front of the first Planet
    // } else {
    //     camera.position.z = newCameraZ; // Allow zooming otherwise
    //   }
    if (distance <= 17) showMessageButton();
    else hideMessageButton();

    /* camera.lookAt(0, 0, 0); */
    /* } */
    if (spaceshipModel) {
      /* const spaceshipPosition = camera.position.clone().add(spaceshipOffset);
      spaceshipModel.position.copy(spaceshipPosition); */
      spaceshipModel.rotation.x = THREE.MathUtils.degToRad(10);
    }

    firstPlanet.rotation.y += 0.007;
    /* particles.forEach((particle) => (particle.rotation.x += 0.06)); */
    orbit.update();
    TWEEN.update();
    updateCamera();
    updateSpaceship();

    renderer.render(scene, camera);
  }
  // Start the 3D scene or perform any other action
  renderer.setAnimationLoop(animate);

  // Variables to keep track of the zoom direction for each mouse button
  let leftZoomDirection = 0;
  let rightZoomDirection = 0;

  // Register mousedown and mouseup events
  // window.addEventListener("mousedown", function (event) {
  //   if (event.button === 0) {
  //     leftZoomDirection = -1; // Zoom in when the left button is held down
  //   } else if (event.button === 2) {
  //     rightZoomDirection = 1; // Zoom out when the right button is held down
  //     leftZoomDirection = 0;
  //   }
  //   mouseX = event.clientX;
  //   mouseY = event.clientY;
  // });
  // window.addEventListener("mouseup", function (event) {
  //   if (event.button === 0) {
  //     leftZoomDirection = 0; // Stop zooming when the left button is released
  //   } else if (event.button === 2) {
  //     rightZoomDirection = 0; // Stop zooming when the right button is released
  //   }
  // });

  // // Register mousemove event to track mouse position
  // window.addEventListener("mousemove", function (event) {
  //   mouseX = event.clientX;
  //   mouseY = event.clientY;
  // });
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
  /* const guiContainer = document.createElement("div");
  guiContainer.classList.add("gui-container");
  document.body.appendChild(guiContainer);
  guiContainer.appendChild(gui.domElement); */

  gui.add(options, "speed", 0.1, 1.25);
  gui.addColor(options, "color").onChange(function (e) {
    spaceshipModel.traverse(function (child) {
      if (child.isMesh) {
        // Change the color of the spaceship's material
        child.material.color.set(e); // Set the color to red (adjust the color value as needed)
      }
    });
  });

  //"Go Back to Menu" button
  const goBackToTheMenu = {
    "Home Page": function () {
      location.reload(); // Refresh the page
    },
  };
  /* gui.add(goBackToTheMenu, "Home Page"); */

  //new menu folder
  const menuFolder = gui.addFolder("Menu");
  menuFolder.add(goBackToTheMenu, "Home Page");

  const messageOverlay = document.getElementById("message-overlay");

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

  /* hideLoadingScreen(); */

  //   function playBackgroundSound() {
  //     const backgroundMusic = document.getElementById("backgroundMusic");
  //     backgroundMusic.play();
  //   }
  //   document.addEventListener("contextmenu", playBackgroundSound);
  //   document.addEventListener("click", playBackgroundSound);
  //   document.addEventListener("keydown", playBackgroundSound);
}
