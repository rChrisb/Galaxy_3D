import * as THREE from "three";
import * as CANNON from "cannon-es";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GPUComputationRenderer } from "three/examples/jsm/misc/GPUComputationRenderer";
import * as dat from "dat.gui";
import moon from "../images/moon-inspired-textures (1).jpg";
import texture4 from "../images/painted-surface-with-holes.jpg";
import earth from "../images/mud-water-surface.jpg";
import rocks from "../images/rocks-stones-with-rough-surface.jpg";
import rocks2 from "../images/rocks2.jpg";
import rocks3 from "../images/cracked-dry-brown-soil-surface-photography.jpg";
import galaxy from "../images/panoramic-view-sunset-night.jpg";
import spaceshipmap from "../images/spaceship_texture.jpg";
import pink from "../images/pink-red-mix-paints-paper.jpg";
import pink2 from "../images/soft-concrete-texture.jpg";
import greenTexture from "../images/grass_planet.jpg";
import disc from "../images/disc.png";
import motor from "../images/motor.png";
import meteoriteTexture from "../images/orange-details-moon-texture-concept.jpg";
import smoke from "../images/ink-explosion-gradient-gray-splash-removebg-preview.png";
import pharaon from "../images/rm281batch2-adj-011-removebg-preview.png";
import space1 from "../images/space-posx.jpg";
import space2 from "../images/space-negx.jpg";
import space3 from "../images/space-posy.jpg";
import space4 from "../images/space-negy.jpg";
import space5 from "../images/space-posz.jpg";
import space6 from "../images/space-negz.jpg";
import portal from "../images/vortex.jpg";
import * as TWEEN from "tween.js";
import { gsap } from "/node_modules/gsap/index";
import * as dat from "dat.gui";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { FirstPersonControls } from "three/examples/jsm/controls/FirstPersonControls";
import {
  CSS2DRenderer,
  CSS2DObject,
} from "three/examples/jsm/renderers/CSS2DRenderer";
// import 3D model
const spaceship = new URL("../models/spaceship.fbx", import.meta.url);
const spaceship2 = new URL("../models/3d-model.fbx", import.meta.url);
const spaceship3 = new URL(
  "../models/uploads_files_869754_space_shuttle_fbx_export(1).fbx",
  import.meta.url
);
// set the render
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

// set the scene
document.body.appendChild(renderer.domElement);
const options = {
  speed: 5,
  color: "#093032", // cyan
  sound: "on",
};

const timeElement = document.getElementById("time");
const messageElement = document.getElementById("score");

// const menuMusic = document.getElementById("menuMusic");
const sceneMusic = document.getElementById("sceneMusic");
const loadingMusic = document.getElementById("loadingMusic");
const ufoSound = document.getElementById("ufoSound");
const ufoSoundSlow = document.getElementById("ufoSoundSlow");
const itemSound = document.getElementById("itemSound");
const vortexSound = document.getElementById("vortexSound");
const TransitionSound = document.getElementById("2DTransitionSound");
const timerSound = document.getElementById("timerSound");
const windowSound = document.getElementById("windowSound");
const correctSound = document.getElementById("correctSound");
const failedSound = document.getElementById("failedSound");
const alertSound = document.getElementById("alertSound");
const boingSound = document.getElementById("boingSound");
// const controlsOption = document.querySelector(".close-button");
// controlsOption.textContent = "o p t i o n s";
// function restartAudio() {
//   setTimeout(() => {
//     ufoSound.currentTime = 0; // Reset the current playback time to the beginning
//   }, (ufoSound.duration - 0.9) * 1000); // Restart 0.5 seconds before the end
// }
// ufoSound.addEventListener("ended", restartAudio);

// menuMusic.play();
// menuMusic.volume = 0.05;

let canClose = true;
let infoVisible = true;
let canOpenGUI = true;
let canCloseGUI = false;
let spaceshipSpeed;
let spaceshipAcceleration = 0.005;
let spaceshipInertia = 0.998;

const infoWindow = document.querySelectorAll("info-window");
const window1 = document.querySelector(".window1");
const window2 = document.querySelector(".window2");
const window3 = document.querySelector(".window3");
const window4 = document.querySelector(".window4");
const window5 = document.querySelector(".window5");
const window6 = document.querySelector(".window6");
const actionButtons = document.querySelectorAll(".action-button");
const action1 = document.querySelector(".first");
const action2 = document.querySelector(".second");
const action3 = document.querySelector(".third");
const action4 = document.querySelector(".fourth");
const action5 = document.querySelector(".fifth");
const accessElement = document.getElementById("access");

const planetScore = {
  message: document.querySelector(".planet6"),
  window: window6,
};
const planet2Button = {
  message: document.querySelector(".planet2"),
  window: window2,
  action: action2,
  succeededRace: false,
  maximumTime: 40,
  all_items: true,
  minimum_score: true,
  color: "pink",
  stringColor: "pink",
  script: new URL("/pinkplanet.html", window.location.href).href,
};
const planet1Button = {
  message: document.querySelector(".planet1"),
  window: window1,
  action: action1,
  time: 35,
  succeededRace: false,
  minimum_score: true,
  all_items: false,
  color: "green",
  stringColor: "green",
  for2D: true,
  script: new URL("/game-2d", window.location.href).href,
};
const planet3Button = {
  message: document.querySelector(".planet3"),
  window: window3,
  action: action3,
  previous: "planet 1",
  time: 25,
  succeededRace: false,
  minimum_score: false,
  scoreNeededPreviously: 2000,
  color: "#a1802c",
  stringColor: "yellow",
  for2D: true,
  script: new URL("/game-2d?level=2", window.location.href).href,
};
const planet4Button = {
  message: document.querySelector(".planet4"),
  window: window4,
  action: action4,
  previous: "planet 3",
  time: 50,
  succeededRace: false,
  minimum_score: false,
  scoreNeededPreviously: 3000,
  color: "#0529c9",
  stringColor: "blue",
  for2D: true,
  script: new URL("/game-2d?level=3", window.location.href).href,
};
const planet5Button = {
  message: document.querySelector(".planet5"),
  window: window5,
  action: action5,
  maximumTime: 30,
  all_items: true,
  minimum_score: true,
  color: "#4f1a0d",
  stringColor: "red",
  script: new URL("/redplanet.html", window.location.href).href,
};
const messageButtons = [
  planet1Button,
  planet2Button,
  planet3Button,
  planet4Button,
  planet5Button,
  planetScore,
];
console.log(messageButtons);

const closeButton = document.querySelectorAll(".close-window");

messageButtons.forEach((button) => {
  button.message.addEventListener("click", () => {
    infoVisible = true;
    windowSound.play();
    windowSound.volume = 0.3;
    if (button.action) button.action.style.display = "block";
    if (button.message.style.display === "block" && infoVisible) {
      button.window.style.display = "block";
      console.log("WTF");
    } else {
      button.window.style.display = "none";
    }
  });
});

closeButton.forEach((button) =>
  button.addEventListener("click", () => {
    messageButtons.forEach((button) => {
      if (button.window.style.display !== "none") {
        button.window.style.display = "none";
        sceneMusic.play();
        canClose = true;
        console.log("tried to click");
      }
    });
  })
);

// 2D TRANSITION
messageButtons.forEach((button) => {
  if (button.action)
    button.action.addEventListener("click", () => {
      const accessElement = document.getElementById("access");

      if (!button.minimum_score) {
        alertSound.play();
        alertSound.volume = 0.3;
        accessElement.textContent = `Score ${button.scoreNeededPreviously} points in ${button.previous} to unlock access`;
      } else if (
        button.minimum_score &&
        (!button.all_items || !button.succeededRace) &&
        button.for2D
      ) {
        alertSound.play();
        alertSound.volume = 0.3;
        accessElement.textContent = `Collect all ${button.stringColor} items in less than ${button.time} seconds to unlock access`;
      } else if (!button.succeededRace) {
        alertSound.play();
        alertSound.volume = 0.3;
        accessElement.textContent = `Go through all ${button.stringColor} vortexes in less than ${button.maximumTime} seconds to unlock access`;
      } else if (
        button.minimum_score &&
        button.all_items &&
        button.succeededRace &&
        button.script
      ) {
        TransitionSound.play();
        TransitionSound.volume = 0.3;

        button.window.style.display = "none";
        messageElement.style.display = "none";
        fadeOut();
        spaceshipInertia = 0.98;
        setTimeout(() => {
          window.location.href = button.script;
        }, 4000);
        console.log("The user wants to enter the planet!");
        return; // Exit the function early after redirecting to the planet script
      }

      // Display the access element
      accessElement.style.opacity = 1;
      accessElement.style.display = "block";
      accessElement.style.color = button.color;

      // Hide the access element after 3 seconds
      setTimeout(() => {
        accessElement.style.opacity = 0;
      }, 3000);
    });
});

///
///
///
// MENU PAGE

// const startButton = document.getElementById("start-button");
const openingText = document.getElementById("scrolling-text");
const menuContainer = document.getElementById("menu-container");
const progressBarContainer = document.querySelector(".progress-bar-container");
const progressBar = document.getElementById("progress-bar");
// startButton.addEventListener("click", () => {
//   openingText.style.display = "none"; // Hide the opening text
//   startButton.style.display = "none";
//   menuContainer.parentNode.removeChild(menuContainer);
//   menuMusic.pause();
//   menuMusic.currentTime = 0;

//   galaxyThreejs();
//   loadingMusic.play();
//   loadingMusic.volume = 0.03;
// });
loadingMusic.play();
loadingMusic.volume = 0.03;
galaxyThreejs();

// 3D SCENE

function galaxyThreejs() {
  /* showLoadingScreen(); */

  const scene = new THREE.Scene();

  // scene.fog = new THREE.FogExp2(0xffffff, 0.01);
  /* scene.fog = new THREE.Fog(0, 0, 700); */

  /* scene.background = new THREE.Color(0x040312); */

  // const fogColor = 0x040312; // Color of the fog
  // const fogNear = 0; // Near distance of the fog
  // const fogFar = 6000; // Far distance of the fog
  // scene.fog = new THREE.Fog(fogColor, fogNear, fogFar);

  /* renderer.setClearColor(fogColor);

  renderer.setClearAlpha(1); */

  /* renderer.autoClear = false; */

  // set the camera
  const cameraDistance = 20; // Distance between the camera and spaceship
  const cameraOffset = new THREE.Vector3(0, 10, -cameraDistance); // Camera offset from the spaceship
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const newFarClippingPlane = 10000;
  camera.far = newFarClippingPlane;
  camera.updateProjectionMatrix();
  camera.frustum = new THREE.Frustum();
  const controls = new FirstPersonControls(camera, renderer.domElement);
  controls.movementSpeed = 10;
  controls.lookSpeed = 0.2;

  //1st person camera
  // update camera position and lookat based on spaceshipcontainer's position
  function updateCamera() {
    const spaceshipPosition = spaceshipContainer.position;
    const spaceshipRotation = spaceshipContainer.rotation;

    // set the camera's position relative to the spaceship's rotation
    const distanceFromSpaceship = 8.5;
    const offset = new THREE.Vector3(0, 2, -distanceFromSpaceship);
    offset.applyEuler(spaceshipRotation);
    const cameraPosition = spaceshipPosition.clone().add(offset);
    camera.position.copy(cameraPosition);

    // set the camera's look-at target to be in the direction of the spaceship's rotation
    const lookAtTarget = spaceshipPosition
      .clone()
      .add(new THREE.Vector3(0, 1, 0));
    camera.lookAt(lookAtTarget);
  }

  // to allow and see camera rotation
  const orbit = new OrbitControls(camera, renderer.domElement);
  orbit.enableZoom = false;
  const axesHelper = new THREE.AxesHelper(2);
  scene.add(axesHelper);
  camera.position.set(0, 0, 100);
  orbit.update();

  const labelRenderer = new CSS2DRenderer();
  labelRenderer.setSize(window.innerWidth, window.innerHeight);
  labelRenderer.domElement.style.position = "absolute";
  labelRenderer.domElement.style.top = "0px";
  labelRenderer.domElement.style.pointerEvents = "none";
  document.body.appendChild(labelRenderer.domElement);

  // lighting
  const ambientLight = new THREE.AmbientLight(0xffffff);
  scene.add(ambientLight);

  // variable for RANDOM COLORS
  const randomColor = new THREE.Color(
    Math.random(),
    Math.random(),
    Math.random()
  );

  // texture varaible that will allow to set textures of object
  const loadingManager = new THREE.LoadingManager();
  const textureLoader = new THREE.TextureLoader();
  const textureLoader2 = new THREE.TextureLoader(loadingManager);
  const cubeLoader = new THREE.CubeTextureLoader();
  const backgroundMap = cubeLoader.load(
    [space1, space2, space3, space4, space5, space6],
    () => {},
    undefined,
    (error) => {
      console.error("Error loading background images:", error);
    }
  );
  backgroundMap.colorSpace = THREE.SRGBColorSpace;
  scene.background = backgroundMap;

  loadingManager.onProgress = function (url, loaded, total) {
    progressBar.value = (loaded / total) * 100;
  };

  loadingManager.onLoad = function (url) {
    loadingMusic.pause();

    console.log("finished loading");
    if (!localStorage.getItem("sessionId")) {
      const sessionId =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
      localStorage.setItem("sessionId", sessionId);
    }
    console.log("Current sessionId: " + localStorage.getItem("sessionId"));
  };

  // PARTICLE SETUP
  let clock = new THREE.Clock();
  let clouds1 = [];

  // for (let cloud = 880; cloud > 250; cloud--) {
  //   const smokeMaterial = new THREE.SpriteMaterial({
  //     map: textureLoader.load(smoke),
  //     transparent: true,
  //     opacity: 0.1,
  //     /* size: 100000, */
  //     color: new THREE.Color(Math.random(), Math.random(), Math.random()),
  //   });
  //   const smokeCloud1 = new THREE.Sprite(smokeMaterial);
  //   const spriteParent = new THREE.Object3D();
  //   scene.add(spriteParent);
  //   spriteParent.add(smokeCloud1);
  //   /* smokeCloud1.add(cloudLight); */
  //   /* smokeCloud1.add(cloudLight); */
  //   spriteParent.rotation.z = Math.random() * 360;
  //   smokeCloud1.position.set(
  //     0.5 * cloud * Math.cos((4 * cloud * Math.PI) / 180),
  //     -0.5 * cloud * Math.sin((4 * cloud * Math.PI) / 180),
  //     0.5 * cloud
  //   );

  //   smokeCloud1.scale.set(400, 1200, 700);
  //   clouds1.push(spriteParent);
  //   /* scene.add(smokeCloud1); */
  // }

  // PLANETS
  const sphereGeometry1 = new THREE.SphereGeometry(100, 50, 50);
  const sphereMaterial1 = new THREE.MeshPhysicalMaterial({
    map: textureLoader.load(earth),
    color: 0x4d6839,
  });
  const sphereGeometry2 = new THREE.SphereGeometry(100, 50, 50);
  const sphereMaterial2 = new THREE.MeshPhysicalMaterial({
    map: textureLoader2.load(pink2),
    color: 0xef96e5,
    /* color: 0x4b4e49, */
  });
  const sphereGeometry3 = new THREE.SphereGeometry(100, 50, 50);
  const sphereMaterial3 = new THREE.MeshPhysicalMaterial({
    map: textureLoader.load(rocks),
    /* color: 0x4b4e49, */
  });
  const sphereGeometry4 = new THREE.SphereGeometry(100, 50, 50);
  const sphereMaterial4 = new THREE.MeshPhysicalMaterial({
    map: textureLoader.load(texture4),
    color: 0x201a70,
  });
  const sphereGeometry5 = new THREE.SphereGeometry(100, 50, 50);
  const sphereMaterial5 = new THREE.MeshPhysicalMaterial({
    map: textureLoader.load(rocks3),
    color: 0x4f1a0d,
  });
  const sphereGeometry6 = new THREE.SphereGeometry(100, 50, 50);
  const sphereMaterial6 = new THREE.MeshPhysicalMaterial({
    map: textureLoader.load(moon),
  });

  const firstPlanet = new THREE.Mesh(sphereGeometry1, sphereMaterial1);
  const secondPlanet = new THREE.Mesh(sphereGeometry2, sphereMaterial2);
  const thirdPlanet = new THREE.Mesh(sphereGeometry3, sphereMaterial3);
  const fourthPlanet = new THREE.Mesh(sphereGeometry4, sphereMaterial4);
  const fifthPlanet = new THREE.Mesh(sphereGeometry5, sphereMaterial5);
  const sixthPlanet = new THREE.Mesh(sphereGeometry6, sphereMaterial6);

  const all_planets = [
    firstPlanet,
    secondPlanet,
    thirdPlanet,
    fourthPlanet,
    fifthPlanet,
    sixthPlanet,
  ];
  all_planets.forEach((planet) => {
    scene.add(planet);
  });

  firstPlanet.position.set(100, 10, 1700);
  secondPlanet.position.set(-400, 175, 3800);
  thirdPlanet.position.set(2000, -200, 2800);
  fourthPlanet.position.set(60, -800, 3100);
  fifthPlanet.position.set(-2000, -260, 4000);
  sixthPlanet.position.set(900, -300, 1300);

  // define the array of spaceship model urls and their corresponding scale values
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

  // randomly select a spaceship model and its corresponding scale value
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
          child.material.color.set(0x070707);
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

  // POINT LIGHT for illustrate spaceship activity
  const pointLight = new THREE.PointLight(0xff0000, 2, 6);
  pointLight.position.set(0, 0, -5); // Adjust the position as per your spaceship

  spaceshipContainer.add(pointLight);

  const fireTexture = textureLoader.load(motor);

  // POWERLIGHT MATERIAL
  const fireMaterial = new THREE.SpriteMaterial({
    map: fireTexture,
    color: 0xc90712,
    opacity: 0,
  });

  let spaceshipPosition = new THREE.Vector3(); // Initial spaceship position

  const fireSprite1 = new THREE.Sprite(fireMaterial);
  fireSprite1.scale.set(0.2, 0.2, 0.2);

  const fireSprite2 = new THREE.Sprite(fireMaterial);
  fireSprite2.scale.set(0.2, 0.2, 0.2);

  const firePosition1 = new THREE.Vector3(0, 0, -1);
  const firePosition2 = new THREE.Vector3(-0.47, 0, -1);

  firePosition1.add(spaceshipPosition);
  firePosition2.add(spaceshipPosition);

  fireSprite1.position.copy(firePosition1);
  fireSprite2.position.copy(firePosition2);

  spaceshipContainer.add(fireSprite1);
  spaceshipContainer.add(fireSprite2);

  let moveForward = false;
  let moveBackward = false;
  let moveLeft = false;
  let moveRight = false;
  let moveUp = false;
  let moveDown = false;

  //  keystate object to track the state of each key
  const keyState = {};

  function updateKeyboardControls() {
    // Check if the left arrow key is pressed
    if (keyState["ArrowLeft"]) {
      // Rotate the spaceship to the left
      if (spaceshipModel) {
        spaceshipContainer.rotateOnAxis(new THREE.Vector3(0, 1, 0), 0.005);
      }
    }

    // Check if the right arrow key is pressed
    if (keyState["ArrowRight"]) {
      // Rotate the spaceship to the right
      if (spaceshipModel) {
        spaceshipContainer.rotateOnAxis(new THREE.Vector3(0, 1, 0), -0.005);
      }
    }
  }

  document.addEventListener("keydown", handleKeyDown);
  document.addEventListener("keyup", handleKeyUp);

  function handleKeyDown(event) {
    keyState[event.code] = true;
  }

  function handleKeyUp(event) {
    keyState[event.code] = false;
  }

  const rotationAmount = 0.02;
  const rotationResetSpeed = 0.05;
  const maxRotationAngle = Math.PI / 8;

  let currentRotationX = 0;
  let currentRotationY = 0;
  let currentRotationZ = 0;

  // Function to reset the rotation of spaceshipContainer
  function resetRotation() {
    // Gradually reset the rotation back to zero
    gsap.to(spaceshipModel.rotation, {
      /* duration: 1.5, */
      x: 0,
      y: 0,
      z: 0,
    });
    gsap.to(fireSprite1.position, {
      /* duration: 1.5, */
      x: 0,
      y: 0,
    });
    gsap.to(fireSprite2.position, {
      /* duration: 1.5, */
      x: -0.47,
      y: 0,
    });

    currentRotationX = 0;
    currentRotationY = 0;
    currentRotationZ = 0;
  }

  function inclinaisonModel(x1, z1, y1 = spaceshipModel.rotation.y) {
    gsap.to(spaceshipModel.rotation, {
      duration: 0.5,
      x: x1,
      y: y1,
      z: z1,
    });
  }
  function inclinaisonContainer(x1, z1) {
    gsap.to(spaceshipContainer.rotation, {
      /* duration: 1.5, */
      x: x1,
      z: z1,
    });
  }
  window.addEventListener("keydown", function (event) {
    if (event.code === "KeyW") {
      ufoSound.play();
      ufoSound.volume = 1;
      if (ufoSound.volume < 1) ufoSound.volume += 0.03;
      moveForward = true; // Move forward when 'Z' key is pressed ('W' for qwerty board)
      moveBackward = false;
    } else if (event.code === "KeyS") {
      moveBackward = true; // Move backward when 'S' key is pressed
      moveForward = false;
    } else if (event.code === "KeyA") {
      moveLeft = true; // Move left when 'Q' key is pressed ('A' in qwerty)
      moveRight = false;
      gsap.to(fireSprite2.position, {
        duration: 0.5,

        y: 0.1,
      });
      inclinaisonModel(spaceshipModel.rotation.x, -0.2);
    } else if (event.code === "KeyD") {
      moveRight = true; // Move right when 'D' key is pressed
      moveLeft = false;
      gsap.to(fireSprite1.position, {
        duration: 0.5,

        y: 0.1,
      });
      inclinaisonModel(spaceshipModel.rotation.x, 0.2);
    } else if (event.code === "ArrowUp" || event.code === "Space") {
      moveUp = true; // Move up when spacebar is pressed
      moveDown = false;
      camera.rotation.x += 10;
    } else if (event.code === "ArrowDown" || event.code === "ShiftLeft") {
      moveDown = true; // Move down when left shift key is pressed
      moveUp = false;
      inclinaisonModel(Math.PI, spaceshipModel.rotation.z);
    } else if (event.code === "ArrowRight") {
      inclinaisonModel(
        spaceshipModel.rotation.x,
        spaceshipModel.rotation.z,
        -0.12
      );
      gsap.to(fireSprite1.position, {
        /* duration: 1.5, */

        x: 0.1,
      });
      gsap.to(fireSprite2.position, {
        /* duration: 1.5, */

        x: -0.37,
      });
    } else if (event.code === "ArrowLeft") {
      inclinaisonModel(
        spaceshipModel.rotation.x,
        spaceshipModel.rotation.z,
        0.12
      );
      gsap.to(fireSprite1.position, {
        /* duration: 1.5, */

        x: -0.1,
      });
      gsap.to(fireSprite2.position, {
        /* duration: 1.5, */

        x: -0.57,
      });
    }
    if (event.code === "KeyW" && event.code === "KeyD") {
      moveForward = true;
      moveRight = true;
    } else if (event.code === "KeyW" && event.code === "KeyA") {
      moveForward = true;
      moveLeft = true;
    } else if (event.code === "KeyS" && event.code === "KeyD") {
      moveBackward = true;
      moveRight = true;
    } else if (event.code === "KeyS" && event.code === "KeyA") {
      moveBackward = true;
      moveLeft = true;
    }
    if (event.code === "KeyW" && event.code === "KeyD") {
      moveForward = false;
      moveRight = false;
    } else if (event.code === "KeyW" && event.code === "KeyA") {
      moveForward = false;
      moveLeft = false;
    } else if (event.code === "KeyS" && event.code === "KeyD") {
      moveBackward = false;
      moveRight = false;
    } else if (event.code === "KeyS" && event.code === "KeyA") {
      moveBackward = false;
      moveLeft = false;
    }
  });

  window.addEventListener("keyup", function (event) {
    if (event.code === "KeyW") {
      ufoSound.pause();
      ufoSoundSlow.play();
      ufoSoundSlow.volume = 0.02;
      resetRotation();
      moveForward = false; // Stop moving forward when 'Z' (azerty) key is released
    } else if (event.code === "KeyS") {
      resetRotation();
      moveBackward = false; // Stop moving backward when 'S' key is released
    } else if (event.code === "KeyA") {
      resetRotation();
      moveLeft = false; // Stop rotating left when 'Q' (azerty) key is released
    } else if (event.code === "KeyD") {
      resetRotation();

      moveRight = false; // Stop rotating right when 'D' key is released
    } else if (event.code === "ArrowUp" || event.code === "Space") {
      resetRotation();
      moveUp = false; // Stop moving up when spacebar is released
    } else if (event.code === "ArrowDown" || event.code === "ShiftLeft") {
      resetRotation();
      moveDown = false; // Stop moving down when left shift key is released
    } else if (event.code === "ArrowLeft" || event.code === "ArrowRight") {
      resetRotation();
    }
  });

  let spaceshipDirection;
  let spaceshipVelocity = new THREE.Vector3();

  const bounceAmplitude = 0.0077;
  const bounceFrequency = 0.006;
  let initialOpacity = 0;

  spaceshipPosition.z -= 300;
  function updateSpaceship() {
    spaceshipDirection = new THREE.Vector3();

    const forwardDirection = new THREE.Vector3(0, 0, -1);
    const rightDirection = new THREE.Vector3(1, 0, 0);
    const upDirection = new THREE.Vector3(0, 1, 0);

    // direction based on the spaceship's rotation
    forwardDirection.applyQuaternion(spaceshipContainer.quaternion);
    rightDirection.applyQuaternion(spaceshipContainer.quaternion);
    upDirection.applyQuaternion(spaceshipContainer.quaternion);

    // spaceship's direction based on the input
    const directionZ = Number(moveBackward) - Number(moveForward);
    const directionX = Number(moveLeft) - Number(moveRight);
    const directionY = Number(moveUp) - Number(moveDown);

    // direction components combined with the adjusted direction vectors
    spaceshipDirection.copy(forwardDirection.multiplyScalar(directionZ));
    spaceshipDirection.add(rightDirection.multiplyScalar(directionX));
    spaceshipDirection.add(upDirection.multiplyScalar(directionY));
    spaceshipDirection.normalize().multiplyScalar(spaceshipSpeed);

    // spaceship's velocity based on acceleration and direction
    if (spaceshipDirection.lengthSq() > 0) {
      spaceshipVelocity.add(
        spaceshipDirection.multiplyScalar(spaceshipAcceleration)
      );
    }

    // inertia to the spaceship's velocity
    spaceshipVelocity.multiplyScalar(spaceshipInertia);

    // bounce effect
    const bounceOffset =
      Math.sin(Date.now() * bounceFrequency) * bounceAmplitude;
    spaceshipPosition.y = spaceshipPosition.y + bounceOffset;

    // POWERLIGHTS
    if (
      !moveBackward &&
      !moveForward &&
      !moveDown &&
      !moveUp &&
      !moveLeft &&
      !moveRight
    ) {
      /* initialOpacity = 0; */
      pointLight.distance = 6;
      /* pointLight.color.set(0xff0000); */
    }
    if (
      (moveForward && initialOpacity <= 0.6) ||
      (moveUp && initialOpacity <= 0.6)
    ) {
      pointLight.color.set(0xff0000);
      initialOpacity += 0.001;
      pointLight.distance += 0.2;
    } else if (
      (moveBackward && initialOpacity <= 0.6) ||
      (moveDown && initialOpacity <= 0.6)
    ) {
      pointLight.color.set(0x0000ff);
      initialOpacity += 0.001;
      pointLight.distance += 0.2;
    } else if (
      (moveLeft && initialOpacity <= 0.6) ||
      (moveRight && initialOpacity <= 0.6)
    ) {
      pointLight.color.set(0x00ff00);
      /* initialOpacity += 0.001; */
      initialOpacity -= 0.002;
      pointLight.distance += 0.2;
    } else {
      if (initialOpacity >= 0 && pointLight.distance >= 6) {
        initialOpacity -= 0.002;
        pointLight.distance -= 0.1;
      }
    }
    fireSprite1.material.opacity = initialOpacity;
    fireSprite2.material.opacity = initialOpacity;

    // Update spaceship position based on velocity
    spaceshipPosition.add(spaceshipVelocity);

    // Update spaceship container position
    spaceshipContainer.position.copy(spaceshipPosition);
  }

  console.log(randomColor);

  const stars = [];
  const starMater = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.5,
    sizeAttenuation: true,
    alphaTest: 0.5,
    transparent: true,
    map: textureLoader.load(disc),
  });
  const starGeo = new THREE.BufferGeometry();
  for (let i = 0; i < 1000010; i++) {
    const star = new THREE.Vector3(
      Math.random() * 5000 - 2500,
      Math.random() * 5000 - 2500,
      Math.random() * 5000 - 2500
    );
    stars.push(star);
  }
  starGeo.setFromPoints(stars);
  starGeo.computeVertexNormals();
  const starss = new THREE.Points(starGeo, starMater);
  starss.position.z += 2000;
  scene.add(starss);

  ///
  // PARTICLES SYSTEM

  // cannon.js bodies for the planet and spaceship
  // const planetShape = new CANNON.Sphere(8);
  // const planetBody = new CANNON.Body({
  //   shape: planetShape,
  //   type: CANNON.Body.STATIC,
  // });
  // const world = new CANNON.World();
  // world.addBody(planetBody);

  // const spaceshipShape = new CANNON.Box(new CANNON.Vec3(1, 1, 1));
  // const spaceshipBody = new CANNON.Body({ mass: 1, shape: spaceshipShape });
  // world.addBody(spaceshipBody);

  const timeStep = 1 / 60;

  ///
  /// FUN PART
  ///
  /// SHOOTING GAME
  let projectiles = [],
    targets = [];
  let score = 0;

  messageElement.addEventListener("transitionend", () => {
    myElement.style.display = "none";
  });

  let raceStartTime,
    result,
    totalTargets = targets.length;
  let targetIndex = 1;
  function updateMessage(content, color) {
    messageElement.textContent = content;
    messageElement.style.color = color;
  }
  function setTimer(content) {
    timeElement.textContent = content;
  }

  const planetTargetsMap = new Map();
  function createTargets(planet) {
    targets = [];
    const geometry = new THREE.CylinderGeometry(15, 15, 2, 32);
    geometry.rotateX(Math.PI / 2);
    const material = new THREE.MeshPhongMaterial({
      /* color: 0x766ced, */
      side: THREE.DoubleSide,
      map: textureLoader.load(portal),
      transparent: true,
      opacity: 0.5,
      emissive: 0x000000,
      color: planet.material.color,
    });
    if (planet === firstPlanet) material.color.set(0x14870a);
    else if (planet === secondPlanet) material.color.set(0xce31be);
    else if (planet === thirdPlanet) material.color.set(0x685e0e);
    else if (planet === fourthPlanet) material.color.set(0x093896);
    else if (planet === fifthPlanet) material.color.set(0xed0030);
    const targetPositions = [
      new THREE.Vector3(
        planet.position.x + 300,
        planet.position.y - 75,
        planet.position.z - 3300
      ),
      new THREE.Vector3(
        planet.position.x + 250,
        planet.position.y - 75,
        planet.position.z - 3000
      ),
      new THREE.Vector3(
        planet.position.x + 100,
        planet.position.y - 25,
        planet.position.z - 2700
      ),
      new THREE.Vector3(
        planet.position.x + 40,
        planet.position.y - 25,
        planet.position.z - 2400
      ),
      new THREE.Vector3(
        planet.position.x,
        planet.position.y - 15,
        planet.position.z - 2100
      ),
      new THREE.Vector3(
        planet.position.x - 150,
        planet.position.y - 75,
        planet.position.z - 1800
      ),
      new THREE.Vector3(
        planet.position.x - 200,
        planet.position.y - 135,
        planet.position.z - 1500
      ),
      new THREE.Vector3(
        planet.position.x - 350,
        planet.position.y - 175,
        planet.position.z - 1200
      ),
      new THREE.Vector3(
        planet.position.x - 250,
        planet.position.y - 125,
        planet.position.z - 800
      ),
      new THREE.Vector3(
        planet.position.x - 150,
        planet.position.y - 155,
        planet.position.z - 400
      ),
    ];

    for (let i = 0; i < targetPositions.length; i++) {
      const target = new THREE.Mesh(geometry, material);
      const position = targetPositions[i];
      target.position.copy(position);
      scene.add(target);
      /* const cPointLabel = new CSS2DObject(p);
      scene.add(cPointLabel);
      cPointLabel.scale.set(50, 50, 50);
      cPointLabel.position.copy(position); */
      const p = document.createElement("p");
      p.textContent = "Vortex";
      const div = document.createElement("div");
      div.appendChild(p);
      const divContainer = new CSS2DObject(div);
      scene.add(divContainer);
      console.log(divContainer.position);
      divContainer.scale.set(100, 100, 100);

      const light = new THREE.PointLight(0x0000ff, 2, 5);
      target.add(light);

      // Show only the first target initially
      target.visible = i === 0;

      targets.push(target);
    }
    planetTargetsMap.set(planet, targets);
  }
  let timerInterval;

  function updateTargets() {
    const spaceshipPosition = spaceshipContainer.position;
    let scoreMoved = false;

    // Iterate over each planet and its targets
    for (const [planet, targets] of planetTargetsMap.entries()) {
      for (let i = 0; i < targets.length; i++) {
        const target = targets[i];

        if (
          target.visible &&
          spaceshipPosition.distanceTo(target.position) < 15
        ) {
          // Spaceship has passed through this target
          scoreMoved = true;
          score++;
          vortexSound.play();
          vortexSound.volume = 0.3;

          if (score > 0) console.log(score);
          updateMessage(
            `${i + 1} / ${targets.length}`,
            planet === secondPlanet ? "#d31bca" : "#a5040d"
          );

          if (i + 1 === 1) {
            raceStartTime = Date.now();
            timeElement.style.display = "block";
            startTimer();
            timerSound.play();
            timerSound.volume = 0.2;
          }

          // Hide the current target
          target.visible = false;

          if (i < targets.length - 1) {
            // Show the next target
            targets[i + 1].visible = true;
            scoreMoved = true;

            // Display the message element for 2 seconds
            messageElement.style.display = "block";
            setTimeout(() => {
              messageElement.style.display = "none";
              scoreMoved = false;
            }, 3000);
          } else {
            // All targets have been passed
            const raceEndTime = Date.now();
            const raceTime = (raceEndTime - raceStartTime) / 1000;
            result = raceTime;
            updateMessage(
              `Racetime: ${raceTime} seconds`,
              planet === secondPlanet ? "#d31bca" : "#a5040d"
            );
            let color;
            if (
              planet === secondPlanet &&
              result <= planet2Button.maximumTime
            ) {
              planet2Button.succeededRace = true;
              correctSound.play();
              correctSound.volume = 0.3;
              accessElement.textContent = "Unlocked access to Aetheria";
              color = "#d31bca";
            } else if (
              planet === secondPlanet &&
              result >= planet2Button.maximumTime
            ) {
              planet2Button.succeededRace = false;
              failedSound.play();
              failedSound.volume = 0.3;
              accessElement.textContent = `Race Time was longer than ${planet2Button.maximumTime} seconds`;
              color = "#d31bca";
            }
            if (planet === fifthPlanet && result <= planet5Button.maximumTime) {
              planet5Button.succeededRace = true;
              correctSound.play();
              correctSound.volume = 0.3;
              accessElement.textContent = "Unlocked access to Emberfell";
              color = "#a5040d";
            } else if (
              planet === fifthPlanet &&
              result >= planet5Button.maximumTime
            ) {
              planet5Button.succeededRace = false;
              failedSound.play();
              failedSound.volume = 0.3;
              accessElement.textContent = `Race Time was longer than ${planet5Button.maximumTime} seconds`;
              color = "#a5040d";
            }
            accessElement.style.opacity = 1;
            accessElement.style.display = "block";
            accessElement.style.color = color;

            // Hide the access element after 3 seconds
            setTimeout(() => {
              accessElement.style.opacity = 0;
            }, 3000);

            resetTargets();
            raceStartTime = Date.now();

            messageElement.style.display = "block";
            messageElement.textContent = `Racetime: ${raceTime} seconds`;
            clearInterval(timerInterval);
            timerSound.pause();
            timeElement.style.display = "none";
            setTimeout(() => {
              messageElement.style.display = "none";
            }, 8000);
          }
        }
      }
    }
  }

  // Reset targets and score
  function resetTargets() {
    for (const [planet, targets] of planetTargetsMap.entries()) {
      for (let i = 0; i < targets.length; i++) {
        const target = targets[i];
        target.visible = i === 0;
      }
    }
    score = 0;
  }
  function startTimer() {
    timerInterval = setInterval(() => {
      const elapsedTime = (Date.now() - raceStartTime) / 1000;
      setTimer("time: " + elapsedTime.toFixed(2));
    }, 10); // Update timer every 10 milliseconds
  }
  function setTimer(content) {
    timeElement.textContent = content;
  }
  /* const meteGeo = new THREE.SphereGeometry(10, 5, 5);
  const meteoMaterial = new THREE.MeshPhongMaterial({
    map: textureLoader.load(meteoriteTexture),
    color: 0x442b10,
  });
  const meterorite1_p3 = new THREE.Mesh(meteGeo, meteoMaterial);
  const meterorite2_p3 = new THREE.Mesh(meteGeo, meteoMaterial);
  const meterorite3_p3 = new THREE.Mesh(meteGeo, meteoMaterial);
  const meterorite4_p3 = new THREE.Mesh(meteGeo, meteoMaterial);
  const meterorite5_p3 = new THREE.Mesh(meteGeo, meteoMaterial);
  const meterorite6_p3 = new THREE.Mesh(meteGeo, meteoMaterial);
  const meteoritesPlanet3 = [
    meterorite1_p3,
    meterorite2_p3,
    meterorite3_p3,
    meterorite4_p3,
    meterorite5_p3,
    meterorite6_p3,
  ];
  meterorite1_p3.position.set(2000, -200, -2000);
  meterorite2_p3.position.set(1800, -200, -1600);
  meterorite3_p3.position.set(1600, -200, -2000);
  meterorite4_p3.position.set(1400, -200, -1600);
  meterorite5_p3.position.set(1200, -200, -2000);
  meterorite6_p3.position.set(1000, -200, -1600);
  meteoritesPlanet3.forEach((meteorite) => scene.add(meteorite));
  const meteoritesGroup1 = [];
  const meteoritesGroup2 = [];
  meteoritesPlanet3.forEach((meteorite) => {
    if (meteorite.position.z === -2000) meteoritesGroup1.push(meteorite);
    else meteoritesGroup2.push(meteorite);
  }); */
  function planet3MeteoritesMovement(speed) {
    const time1 = performance.now() * 0.001; // Time for meteorites at z = -2000
    const time2 = performance.now() * 0.001; // Time for meteorites at z = -1600 (offset by 1000 milliseconds)
    meteoritesGroup1.forEach((meteorite, index) => {
      const initialPosition = -1400;
      const targetPosition = -1000;
      const distance = targetPosition - initialPosition;
      const movementRange = Math.abs(distance) * 1.5;

      const positionOffset = Math.sin((time1 + index) * speed) * movementRange;

      meteorite.position.z = initialPosition + positionOffset;
    });

    meteoritesGroup2.forEach((meteorite, index) => {
      const initialPosition = -1000;
      const targetPosition = -1400;
      const distance = targetPosition - initialPosition;
      const movementRange = Math.abs(distance) * 1.7;

      const positionOffset = Math.sin((time2 + index) * speed) * movementRange;

      meteorite.position.z = initialPosition + positionOffset;
    });
  }
  const pharaonMaterial = new THREE.SpriteMaterial({
    map: textureLoader.load(pharaon),
  });
  const pharaonMaterial1 = new THREE.SpriteMaterial({
    map: textureLoader.load(pharaon),
    color: 0x2edd47,
  });
  const pharaonMaterial2 = new THREE.SpriteMaterial({
    map: textureLoader.load(pharaon),
    color: 0x504df2,
  });

  const item1Planet1 = new THREE.Sprite(pharaonMaterial1);
  const item2Planet1 = new THREE.Sprite(pharaonMaterial1);
  const item3Planet1 = new THREE.Sprite(pharaonMaterial1);
  const item4Planet1 = new THREE.Sprite(pharaonMaterial1);
  const item5Planet1 = new THREE.Sprite(pharaonMaterial1);
  const item6Planet1 = new THREE.Sprite(pharaonMaterial1);
  item1Planet1.position.set(150, 50, 1500);
  item2Planet1.position.set(-150, -50, 1400);
  item3Planet1.position.set(150, 100, 1300);
  item4Planet1.position.set(-150, -100, 1200);
  item5Planet1.position.set(150, 150, 1100);
  item6Planet1.position.set(-150, -150, 1000);
  const item1Planet4 = new THREE.Sprite(pharaonMaterial2);
  const item2Planet4 = new THREE.Sprite(pharaonMaterial2);
  const item3Planet4 = new THREE.Sprite(pharaonMaterial2);
  const item4Planet4 = new THREE.Sprite(pharaonMaterial2);
  const item5Planet4 = new THREE.Sprite(pharaonMaterial2);
  const item6Planet4 = new THREE.Sprite(pharaonMaterial2);
  item1Planet4.position.set(200, -700, 3100);
  item2Planet4.position.set(200, -950, 3000);
  item3Planet4.position.set(200, -700, 3200);
  item4Planet4.position.set(0, -950, 3100);
  item5Planet4.position.set(0, -700, 3000);
  item6Planet4.position.set(0, -950, 3200);
  const item1Planet3 = new THREE.Sprite(pharaonMaterial);
  const item2Planet3 = new THREE.Sprite(pharaonMaterial);
  const item3Planet3 = new THREE.Sprite(pharaonMaterial);
  const item4Planet3 = new THREE.Sprite(pharaonMaterial);
  const item5Planet3 = new THREE.Sprite(pharaonMaterial);
  const item6Planet3 = new THREE.Sprite(pharaonMaterial);
  item1Planet3.position.set(1750, -200, 2800);
  item2Planet3.position.set(1650, -200, 2200);
  item3Planet3.position.set(1500, -200, 2600);
  item4Planet3.position.set(1400, -200, 1800);
  item5Planet3.position.set(1200, -200, 1400);
  item6Planet3.position.set(1050, -200, 1000);
  const planet1Items = [
    item1Planet1,
    item2Planet1,
    item3Planet1,
    item4Planet1,
    item5Planet1,
    item6Planet1,
  ];
  const planet4Items = [
    item1Planet4,
    item2Planet4,
    item3Planet4,
    item4Planet4,
    item5Planet4,
    item6Planet4,
  ];
  const planet3Items = [
    item1Planet3,
    item2Planet3,
    item3Planet3,
    item4Planet3,
    item5Planet3,
    item6Planet3,
  ];

  planet1Items.forEach((item) => {
    item.scale.set(10, 10, 1);

    scene.add(item);
  });
  planet4Items.forEach((item) => {
    item.scale.set(10, 10, 1);

    scene.add(item);
  });
  planet3Items.forEach((item) => {
    item.scale.set(10, 10, 1);
    scene.add(item);
  });
  let collectedItems = {
    Elysir: 0,
    Xerxes: 0,
    planet4: 0,
  };
  console.log(collectedItems["planet4"]);

  const planetItems = [
    { planet: firstPlanet, itemsList: planet1Items, button: planet1Button },
    { planet: thirdPlanet, itemsList: planet3Items, button: planet3Button },
    { planet: fourthPlanet, itemsList: planet4Items, button: planet4Button },
  ];

  const raceStatus = {
    Elysir: { raceOn: true, opacity: 0 },
    Xerxes: { raceOn: true, opacity: 0 },
    planet4: { raceOn: true, opacity: 0 },
  };

  const itemCollectionTimers = {}; // Object to store the item collection timers

  function collectPharaons(planet, planetItemsList, button) {
    const numberOfItems = planetItemsList.length;
    let index;

    if (planet === firstPlanet) index = "Elysir";
    if (planet === fourthPlanet) index = "planet4";
    if (planet === thirdPlanet) index = "Xerxes";

    planetItemsList.forEach((item) => {
      if (item.visible && spaceshipPosition.distanceTo(item.position) < 15) {
        collectedItems[index]++; // Increment the appropriate property
        if (collectedItems[index] === 1) {
          raceStartTime = Date.now();
          timeElement.style.display = "block";
          startTimer();
          timerSound.play();
          timerSound.volume = 0.2;
        }

        itemSound.play();
        itemSound.volume = 0.2;
        item.visible = false;
        console.log(collectedItems[index]);
      }
    });

    if (collectedItems[index] === numberOfItems && raceStatus[index].raceOn) {
      button.all_items = true;

      const raceEndTime = Date.now();
      let resultSound = correctSound;
      let raceMessage = "";
      const raceTime = (raceEndTime - raceStartTime) / 1000;
      result = raceTime;
      updateMessage(
        `Racetime: ${raceTime} seconds`,
        planet === secondPlanet ? "#d31bca" : "#a5040d"
      );
      raceStartTime = Date.now();
      messageElement.style.display = "block";
      messageElement.style.color = button.color;
      messageElement.textContent = `Racetime: ${raceTime} seconds`;
      const resultTime = raceTime;
      clearInterval(timerInterval);
      timerSound.pause();
      timeElement.style.display = "none";
      setTimeout(() => {
        messageElement.style.display = "none";
      }, 8000);
      if (resultTime <= button.time) button.succeededRace = true;
      else {
        raceMessage = ` in more time than required`;
        resultSound = failedSound;
      }
      console.log("you collected all items for", planet);
      resultSound.play();
      resultSound.volume = 0.3;
      accessElement.textContent =
        button.minimum_score && button.succeededRace
          ? `Unlocked access to ${index}`
          : `Collected all items of ${index}` + raceMessage;
      accessElement.style.opacity = 1;
      accessElement.style.display = "block";
      accessElement.style.color = button.color;
      raceStatus[index].raceOn = false;
      setTimeout(() => {
        console.log(12);
        accessElement.style.opacity = 0;
        raceStatus[index].opacity = 0;
      }, 3000);
    } else if (
      collectedItems[index] !== numberOfItems &&
      !raceStatus[index].raceOn
    ) {
      raceStatus[index].raceOn = true;
      accessElement.style.opacity = raceStatus[index].opacity;
      accessElement.style.display = "block";
      accessElement.style.color = "blue";
    }
    if (collectedItems[index] === numberOfItems && !raceStatus[index].raceOn) {
      setTimeout(() => {
        planetItemsList.forEach((item) => {
          item.visible = true;
        });
        collectedItems[index] = 0;
      }, 10000);
    }

    if (planet.all_items) console.log(planet.all_items);
  }
  // createTargets(firstPlanet);
  createTargets(secondPlanet);
  // createTargets(thirdPlanet);
  // createTargets(fourthPlanet);
  createTargets(fifthPlanet);
  updateMessage("HELLO ;)");

  let sceneIsLoaded = false;

  ///
  // ANIMATION OF THE SCENE
  ///
  function animate() {
    if (!sceneIsLoaded) progressBarContainer.style.display = "flex";
    setTimeout(() => {
      progressBarContainer.style.display = "none";
      sceneIsLoaded = true;
      sceneMusic.play();
      sceneMusic.volume = 0.05;
    }, 6000);
    let delta = clock.getDelta();
    clouds1.forEach((cloud) => {
      cloud.rotation.z -= delta * 0.03;
      const radiusOfPath = 5000;
      const speed = 0.000015;
      const angle = Date.now() * speed;
      const x = Math.cos(angle) * radiusOfPath;
      const z = Math.sin(angle) * radiusOfPath;
      cloud.position.set(x, 0, z);
    });
    /* const dist = 0.5 * delta;
    projectiles.forEach((projectile) => {
      projectile.translateZ(dist);

      // Remove the projectile if it goes beyond a certain distance
      if (projectile.position.z < -10000) scene.remove(projectile);
    }); */

    let canPause = false;
    messageButtons.forEach((button) => {
      if (button.window.style.display === "block") {
        canClose = false;
        messageButtons.forEach((button) => {
          button.message.style.display = "none";
          canPause = true;
        });
      }
    });
    if (canPause) return;
    /* world.step(timeStep); */
    let speed = options.speed;
    if (
      (moveForward ||
        moveBackward ||
        moveDown ||
        moveUp ||
        moveLeft ||
        moveRight) &&
      spaceshipSpeed < speed / 5 + 1.5
    ) {
      spaceshipSpeed += 0.0003;
    } else spaceshipSpeed = speed / 5;

    // distance between the camera and the planets
    let distance, distance2, distance3, distance4, distance5, distance6;
    if (firstPlanet) {
      distance = spaceshipPosition.distanceTo(firstPlanet.position);
    }
    if (secondPlanet) {
      distance2 = spaceshipPosition.distanceTo(secondPlanet.position);
    }
    if (thirdPlanet) {
      distance3 = spaceshipPosition.distanceTo(thirdPlanet.position);
    }
    if (fourthPlanet) {
      distance4 = spaceshipPosition.distanceTo(fourthPlanet.position);
    }
    if (fifthPlanet) {
      distance5 = spaceshipPosition.distanceTo(fifthPlanet.position);
    }
    if (sixthPlanet) {
      distance6 = spaceshipPosition.distanceTo(sixthPlanet.position);
    }

    // if (spaceshipSpeed >= 1.5 && distance < 60 && (moveBackward || moveForward))
    //   spaceshipSpeed = spaceshipSpeed / speed - 0.997;

    // this limits the zoom when in front of planets/meteorites
    // meteoritesPlanet3.forEach((meteorite) => {
    //   if (spaceshipPosition.distanceTo(meteorite.position) <= 20) {
    //     gsap.to(spaceshipPosition, {
    //       duration: 2,
    //       x: 800,
    //     });
    //   }
    // });
    // [distance, distance2, distance3, distance4, distance5].forEach(
    //   (distance) => {
    //     if (distance <= 500 && moveForward) {
    //       moveBackward = true;
    //       moveForward = false;
    //       setTimeout(() => {
    //         moveBackward = false;
    //       }, 1000);
    //     }
    //   }
    // );

    if (distance <= 151) {
      moveBackward = true;
      moveForward = false;
      setTimeout(() => {
        moveBackward = false;
      }, 1000);
    }
    if (distance <= 150) {
      boingSound.play();
      boingSound.volume = 0.2;
      gsap.to(spaceshipPosition, {
        duration: 2,
        z: 1400,
        /* ease: "power3.inOut", */
      });
    }
    if (distance2 <= 151) {
      moveBackward = true;
      moveForward = false;
      setTimeout(() => {
        moveBackward = false;
      }, 1000);
    }
    if (distance2 <= 150) {
      boingSound.play();
      boingSound.volume = 0.2;
      gsap.to(spaceshipPosition, {
        duration: 2,
        z: 3500,
        /* ease: "power3.inOut", */
      });
    }
    if (distance3 <= 141) {
      moveBackward = true;
      moveForward = false;
      setTimeout(() => {
        moveBackward = false;
      }, 1000);
    }
    if (distance3 <= 140) {
      boingSound.play();
      boingSound.volume = 0.2;
      gsap.to(spaceshipPosition, {
        duration: 2,
        z: 2500,
        /* ease: "power3.inOut", */
      });
    }
    // if (distance3 <= 2800) planet3MeteoritesMovement(2);
    // else
    // planet3MeteoritesMovement(0.3);
    if (distance4 <= 151) {
      moveBackward = true;
      moveForward = false;
      setTimeout(() => {
        moveBackward = false;
      }, 1000);
    }
    if (distance4 <= 150) {
      boingSound.play();
      boingSound.volume = 0.2;
      gsap.to(spaceshipPosition, {
        duration: 2,
        z: 2800,
        /* ease: "power3.inOut", */
      });
    }
    if (distance5 <= 151) {
      moveBackward = true;
      moveForward = false;
      setTimeout(() => {
        moveBackward = false;
      }, 1000);
    }
    if (distance5 <= 150) {
      boingSound.play();
      boingSound.volume = 0.2;
      gsap.to(spaceshipPosition, {
        duration: 2,
        z: 3700,
        /* ease: "power3.inOut", */
      });
    }
    if (distance6 <= 151) {
      moveBackward = true;
      moveForward = false;
      setTimeout(() => {
        moveBackward = false;
      }, 1000);
    }
    if (distance6 <= 150) {
      boingSound.play();
      boingSound.volume = 0.2;
      gsap.to(spaceshipPosition, {
        duration: 2,
        z: 1100,
        /* ease: "power3.inOut", */
      });
    }

    if (distance <= 400 && canClose) showMessageButton(planet1Button.message);
    else if (distance2 <= 400 && canClose) {
      showMessageButton(planet2Button.message);
    } else if (distance3 <= 400 && canClose) {
      // this check for the current sessionID and if the score is good enough
      fetch("/game-2d/score/" + localStorage.getItem("sessionId"), {
        method: "GET",
      })
        .then((response) => response.json())
        .then((scoreData) => {
          // filter scores for map1 and find the highest score
          const highestScore = scoreData
            .filter((score) => score.map === "map1")
            .reduce((max, score) => Math.max(max, score.score), 0);
          console.log(highestScore);
          if (highestScore >= planet3Button.scoreNeededPreviously) {
            planet3Button.minimum_score = true;
          }
        })
        .catch((error) => console.error("Error:", error));
      console.log("Loading level 2");

      showMessageButton(planet3Button.message);
    } else if (distance4 <= 400 && canClose) {
      fetch("/game-2d/score/" + localStorage.getItem("sessionId"), {
        method: "GET",
      })
        .then((response) => response.json())
        .then((scoreData) => {
          // filter scores for map1 and find the highest score
          const highestScore = scoreData
            .filter((score) => score.map === "map2")
            .reduce((max, score) => Math.max(max, score.score), 0);
          console.log(highestScore);
          if (highestScore >= planet4Button.scoreNeededPreviously) {
            planet4Button.minimum_score = true;
          }
        })
        .catch((error) => console.error("Error:", error));
      console.log("Loading level 3");
      showMessageButton(planet4Button.message);
    } else if (distance5 <= 400 && canClose)
      showMessageButton(planet5Button.message);
    else if (distance6 <= 400 && canClose)
      showMessageButton(planetScore.message);
    else hideMessageButton();

    /* camera.lookAt(0, 0, 0); */
    /* } */
    if (spaceshipModel) {
      /* const spaceshipPosition = camera.position.clone().add(spaceshipOffset);
      spaceshipModel.position.copy(spaceshipPosition); */
      spaceshipModel.rotation.x = THREE.MathUtils.degToRad(10);
    }

    all_planets.forEach((planet) => (planet.rotation.y += 0.001));
    for (const [planet, targets] of planetTargetsMap.entries()) {
      targets.forEach((target) => (target.rotation.z += 0.03));
    }

    updateKeyboardControls();
    spaceshipContainer.rotation.y =
      spaceshipContainer.rotation.y % (2 * Math.PI);
    /* smokeCloud1.position.y += 0.05;
    smokeCloud1.position.x += 0.2;
    smokeCloud1.position.z += 0.2; */

    orbit.update();
    TWEEN.update();
    updateCamera();
    updateSpaceship();
    planetItems.forEach((item) => {
      collectPharaons(item.planet, item.itemsList, item.button);
    });
    updateTargets();
    // Update projectiles
    for (let i = projectiles.length - 1; i >= 0; i--) {
      const projectile = projectiles[i];
      const velocity = projectile.userData.velocity;

      // Update the position of the projectile based on its velocity
      projectile.position.add(velocity);

      // Check if the projectile is out of bounds
      if (projectile.position.z < -1000) {
        // Remove the projectile from the scene
        scene.remove(projectile);
        projectiles.splice(i, 1);
      }
    }

    renderer.render(scene, camera);
  }

  // SCENE ANIMATION RENDERING
  renderer.setAnimationLoop(animate);

  gsap.ticker.add(animate);

  // GUI OPTIONS
  const gui = new dat.GUI();
  /* gui.close(); */
  /* const guiContainer = document.createElement("div");
  guiContainer.classList.add("gui-container");
  document.body.appendChild(guiContainer);
  guiContainer.appendChild(gui.domElement); */

  gui.add(options, "speed", 0.3, 10);
  gui.addColor(options, "color").onChange(function (e) {
    spaceshipModel.traverse(function (child) {
      if (child.isMesh) {
        child.material.color.set(e);
      }
    });
  });

  //"Go Back to Menu" button
  const goBackToTheMenu = {
    "Home Page": function () {
      window.location.href = new URL("/#MENU", window.location.href).href;
    },
  };
  /* gui.add(goBackToTheMenu, "Home Page"); */

  //new menu folder
  const menuFolder = gui.addFolder("Menu");
  menuFolder.add(goBackToTheMenu, "Home Page");

  const messageOverlay = document.getElementById("message-overlay");

  function updateButtonPosition() {
    /* if (!camera || !messageButton) return; */ // Check if the camera and messageButton are defined

    const cameraPosition = camera.position.clone();
    const cameraProjection = cameraPosition.clone().project(camera);
    const x = ((cameraProjection.x + 1) * window.innerWidth) / 2;
    const y = ((-cameraProjection.y + 1) * window.innerHeight) / 2;
    const buttonZ = camera.position.z - 10; // Adjust the distance between the camera and button

    /* messageButton.style.left = x + "px";
    messageButton.style.top = y + "px"; */
  }

  function showMessageButton(button) {
    updateButtonPosition();
    button.style.display = "block";
  }

  function hideMessageButton() {
    messageButtons.forEach((button) => {
      button.message.style.display = "none";
    });
  }

  // EVENT LISTENERS FOR MESSAGES BUTTONS AND GUI
  document.addEventListener("keydown", function (event) {
    let allClosed = 0;
    messageButtons.forEach((button) => {
      if (
        button.window.style.display !== "block" &&
        button.message.style.display !== "block"
      ) {
        allClosed += 1;
      } else allClosed = 0;
    });
    if (allClosed === 6) {
      canOpenGUI = true;
      canCloseGUI = true;
    } else {
      canCloseGUI = false;
      canCloseGUI = false;
    }
    if (event.code === "Enter") {
      messageButtons.forEach((button) => {
        if (
          button.window.style.display !== "block" &&
          button.message.style.display !== "block"
        ) {
          /* button.message.click(); */

          if (canOpenGUI) {
            gui.open();
          }
        } else {
          canOpenGUI = false;
          canCloseGUI = false;
        }
      });

      if (canCloseGUI) console.log("open controls");
    }
    if (event.code === "Escape") {
      messageButtons.forEach((button) => {
        if (button.window.style.display !== "block") {
          messageButtons.forEach((button) => {
            if (button.message.style.display !== "block") {
              /* button.message.click(); */
              if (canCloseGUI) {
                gui.close();
              }
            }
          });
        }
      });
      if (canOpenGUI) console.log("close controls");
    }

    if (event.code === "Enter") {
      messageButtons.forEach((button) => {
        if (
          button.window.style.display === "block" &&
          button.action &&
          button.action !== "none"
        ) {
          button.action.click();
          canOpenGUI = false;
        }
      });
    }

    if (event.code === "Enter") {
      messageButtons.forEach((button) => {
        if (button.message.style.display === "block") {
          button.message.click();
          canOpenGUI = false;
          console.log("check planet info");
        }
      });
    }

    if (event.code === "Escape")
      messageButtons.forEach((button) => {
        if (button.window.style.display === "block") {
          closeButton.forEach((button) => button.click());
          console.log("window closed!");
        }
      });
  });
}

// CURSOR
let cursorVisible = false;
let cursorTimeout;

function showCursor() {
  if (!cursorVisible) {
    document.body.style.cursor = "auto";
    cursorVisible = true;
  }

  clearTimeout(cursorTimeout);
  cursorTimeout = setTimeout(hideCursor, 1000); // Hide the cursor after 1 second of inactivity
}

function hideCursor() {
  if (cursorVisible) {
    document.body.style.cursor = "none";
    cursorVisible = false;
  }
}

// EVENT LISTENERS TO DETECT MOUSE MOVEMENT
document.addEventListener("mousemove", showCursor);
document.addEventListener("mouseenter", showCursor);
document.addEventListener("mouseleave", hideCursor);

///FADE OUT FUNCTION
function fadeOut() {
  let opacity = 1;

  const fadeOutLoop = () => {
    opacity -= 0.003;

    renderer.domElement.style.opacity = opacity;

    if (opacity > 0.1) {
      requestAnimationFrame(fadeOutLoop);
    } else {
      opacity = 1; // Set opacity back to 1
      renderer.domElement.style.opacity = opacity;
      return; // Exit the function after opacity is reset
    }
  };

  fadeOutLoop();
}

function fadeIn() {
  let opacity = 0;

  const fadeInLoop = () => {
    opacity += 0.003;

    renderer.domElement.style.opacity = opacity;

    if (opacity < 1) {
      requestAnimationFrame(fadeInLoop);
    }
  };

  fadeInLoop();
}

fetch("/game-2d/score/" + localStorage.getItem("sessionId"), {
  method: "GET",
})
  .then((response) => response.json())
  .then((scoreData) => {
    const map1ScoresDiv = document.getElementById("map1-scores");
    const map2ScoresDiv = document.getElementById("map2-scores");
    const map3ScoresDiv = document.getElementById("map3-scores");

    const map1Scores = getTopScores("map1", scoreData);
    const map2Scores = getTopScores("map2", scoreData);
    const map3Scores = getTopScores("map3", scoreData);

    displayScores(map1Scores, map1ScoresDiv, "Map 1 Scores");
    displayScores(map2Scores, map2ScoresDiv, "Map 2 Scores");
    displayScores(map3Scores, map3ScoresDiv, "Map 3 Scores");
  });

function getTopScores(map, scoreData) {
  return scoreData
    .filter((score) => score.map === map)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

function displayScores(scores, scoresDiv, mapName) {
  scoresDiv.style.display = "block";
  scoresDiv.innerHTML = ""; // Clear the previous scores

  const mapTitle = document.createElement("h3");
  mapTitle.textContent = mapName;
  scoresDiv.appendChild(mapTitle);

  const scoresList = document.createElement("ul");

  scores.forEach((score) => {
    const scoreItem = document.createElement("li");
    scoreItem.textContent = score.score;
    scoresList.appendChild(scoreItem);
  });

  scoresDiv.appendChild(scoresList);
}
