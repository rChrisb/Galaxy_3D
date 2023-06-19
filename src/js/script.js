import * as THREE from "three";
import * as CANNON from "cannon-es";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GPUComputationRenderer } from "three/examples/jsm/misc/GPUComputationRenderer";
import * as dat from "dat.gui";
import moon from "../images/moon-inspired-textures (1).jpg";
import earth from "../images/green-vintage-folder-paper.jpg";
import rocks from "../images/rocks-stones-with-rough-surface.jpg";
import rocks2 from "../images/rocks2.jpg";
import galaxy from "../images/panoramic-view-sunset-night.jpg";
import spaceshipmap from "../images/spaceship_texture.jpg";
import pink from "../images/pink-red-mix-paints-paper.jpg";
import greenTexture from "../images/grass_planet.jpg";
import disc from "../images/disc.png";
import motor from "../images/motor.png";
import meteoriteTexture from "../images/orange-details-moon-texture-concept.jpg";
import smoke from "../images/ink-explosion-gradient-gray-splash-removebg-preview.png";
import pharaon from "../images/pharaon-removebg-preview.png";
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

// import 3D model
const spaceship = new URL("../models/spaceship.fbx", import.meta.url);
const spaceship2 = new URL("../models/3d-model.fbx", import.meta.url);
const spaceship3 = new URL(
  "../models/uploads_files_869754_space_shuttle_fbx_export(1).fbx",
  import.meta.url
);
const options = {
  speed: 0.01,
  color: "#093032", // cyan
  sound: "on",
};

const menuMusic = document.getElementById("menuMusic");
const sceneMusic = document.getElementById("sceneMusic");
const loadingMusic = document.getElementById("loadingMusic");
const ufoSound = document.getElementById("ufoSound");
const ufoSoundSlow = document.getElementById("ufoSoundSlow");
const itemSound = document.getElementById("itemSound");
const vortexSound = document.getElementById("vortexSound");
function restartAudio() {
  setTimeout(() => {
    ufoSound.currentTime = 0; // Reset the current playback time to the beginning
  }, (ufoSound.duration - 0.9) * 1000); // Restart 0.5 seconds before the end
}
ufoSound.addEventListener("ended", restartAudio);

menuMusic.play();
menuMusic.volume = 0.05;

let canClose = true;
let infoVisible = true;
let canOpenGUI = true;
let canCloseGUI = false;

const infoWindow = document.querySelectorAll("info-window");
const window1 = document.querySelector(".window1");
const window2 = document.querySelector(".window2");
const window3 = document.querySelector(".window3");
const window4 = document.querySelector(".window4");
const window5 = document.querySelector(".window5");
const actionButtons = document.querySelectorAll(".action-button");
const action1 = document.querySelector(".first");
const action2 = document.querySelector(".second");
const action3 = document.querySelector(".third");
const action4 = document.querySelector(".fourth");
const action5 = document.querySelector(".fifth");

const planet2Button = {
  message: document.querySelector(".planet2"),
  window: window2,
  action: action2,
  minimum_score: false,
};
const planet1Button = {
  message: document.querySelector(".planet1"),
  window: window1,
  action: action1,
  minimum_score: true,
  all_items: true,
  script: "http://localhost:3000/game-2d",
};
const planet3Button = {
  message: document.querySelector(".planet3"),
  window: window3,
  action: action3,
  minimum_score: false,
  script: `http://localhost:3000/game-2d?level=2`,
};
const planet4Button = {
  message: document.querySelector(".planet4"),
  window: window4,
  action: action4,
  minimum_score: false,
};
const planet5Button = {
  message: document.querySelector(".planet5"),
  window: window5,
  action: action5,
  minimum_score: false,
};
const messageButtons = [
  planet1Button,
  planet2Button,
  planet3Button,
  planet4Button,
  planet5Button,
];
console.log(messageButtons);
const closeButton = document.querySelectorAll(".close-window");

messageButtons.forEach((button) => {
  button.message.addEventListener("click", () => {
    infoVisible = true;
    button.action.style.display = "block";
    if (button.message.style.display === "block" && infoVisible) {
      button.window.style.display = "block";
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
messageButtons.forEach((button) =>
  button.action.addEventListener("click", () => {
    if (button.minimum_score && button.script && button.all_items)
      window.location.href = button.script;
    console.log("the user wants to enter the planet!");
  })
);

///
///
///
// MENU PAGE

const startButton = document.getElementById("start-button");
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

  galaxyThreejs();
  progressBarContainer.style.display = "flex";
  loadingMusic.play();
  loadingMusic.volume = 0.03;
});

// 3D SCENE
function galaxyThreejs() {
  /* showLoadingScreen(); */
  // set the render
  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;

  // set the scene
  document.body.appendChild(renderer.domElement);

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
    const distanceFromSpaceship = 6;
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
  const textureLoader = new THREE.TextureLoader(loadingManager);
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
    progressBarContainer.style.display = "none";
    loadingMusic.pause();
    sceneMusic.play();
    sceneMusic.volume = 0.05;
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

  for (let cloud = 880; cloud > 250; cloud--) {
    const smokeMaterial = new THREE.SpriteMaterial({
      map: textureLoader.load(smoke),
      transparent: true,
      opacity: 0.1,
      /* size: 100000, */
      color: new THREE.Color(Math.random(), Math.random(), Math.random()),
    });
    const smokeCloud1 = new THREE.Sprite(smokeMaterial);
    const spriteParent = new THREE.Object3D();
    scene.add(spriteParent);
    spriteParent.add(smokeCloud1);
    /* smokeCloud1.add(cloudLight); */
    /* smokeCloud1.add(cloudLight); */
    spriteParent.rotation.z = Math.random() * 360;
    smokeCloud1.position.set(
      0.5 * cloud * Math.cos((4 * cloud * Math.PI) / 180),
      -0.5 * cloud * Math.sin((4 * cloud * Math.PI) / 180),
      0.5 * cloud
    );

    smokeCloud1.scale.set(400, 1200, 700);
    clouds1.push(spriteParent);
    /* scene.add(smokeCloud1); */
  }

  // PLANETS
  const sphereGeometry1 = new THREE.SphereGeometry(12, 50, 50);
  const sphereMaterial1 = new THREE.MeshPhysicalMaterial({
    map: textureLoader.load(earth),
    color: 0x4b4e49,
  });
  const sphereGeometry2 = new THREE.SphereGeometry(65, 50, 50);
  const sphereMaterial2 = new THREE.MeshPhysicalMaterial({
    map: textureLoader.load(pink),
    /* color: 0x4b4e49, */
  });
  const sphereGeometry3 = new THREE.SphereGeometry(150, 50, 50);
  const sphereMaterial3 = new THREE.MeshPhysicalMaterial({
    map: textureLoader.load(rocks),
    /* color: 0x4b4e49, */
  });
  const sphereGeometry4 = new THREE.SphereGeometry(40, 50, 50);
  const sphereMaterial4 = new THREE.MeshPhysicalMaterial({
    map: textureLoader.load(moon),
    color: 0x201a70,
  });
  const sphereGeometry5 = new THREE.SphereGeometry(110, 50, 50);
  const sphereMaterial5 = new THREE.MeshPhysicalMaterial({
    map: textureLoader.load(rocks2),
    color: 0x4f1a0d,
  });
  const firstPlanet = new THREE.Mesh(sphereGeometry1, sphereMaterial1);
  const secondPlanet = new THREE.Mesh(sphereGeometry2, sphereMaterial2);
  const thirdPlanet = new THREE.Mesh(sphereGeometry3, sphereMaterial3);
  const fourthPlanet = new THREE.Mesh(sphereGeometry4, sphereMaterial4);
  const fifthPlanet = new THREE.Mesh(sphereGeometry5, sphereMaterial5);

  const all_planets = [
    firstPlanet,
    secondPlanet,
    thirdPlanet,
    fourthPlanet,
    fifthPlanet,
  ];
  all_planets.forEach((planet) => scene.add(planet));

  firstPlanet.position.set(10, 10, 60);
  secondPlanet.position.set(-400, 360, -800);
  thirdPlanet.position.set(2500, -200, -1800);
  fourthPlanet.position.set(60, -800, -200);
  fifthPlanet.position.set(-2000, -260, 320);

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

  let spaceshipSpeed = 0.08;

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
        spaceshipContainer.rotateOnAxis(new THREE.Vector3(0, 1, 0), -0.01);
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

  window.addEventListener("keydown", function (event) {
    if (event.code === "KeyW") {
      ufoSound.play();
      ufoSound.volume = 0.08;
      if (ufoSound.volume < 0.5) ufoSound.volume += 0.03;
      moveForward = true; // Move forward when 'Z' key is pressed ('W' for qwerty board)
    } else if (event.code === "KeyS") {
      moveBackward = true; // Move backward when 'S' key is pressed
    } else if (event.code === "KeyA") {
      moveLeft = true; // Move left when 'Q' key is pressed ('A' in qwerty)
    } else if (event.code === "KeyD") {
      moveRight = true; // Move right when 'D' key is pressed
    } else if (event.code === "ArrowUp") {
      moveUp = true; // Move up when spacebar is pressed
    } else if (event.code === "ArrowDown") {
      moveDown = true; // Move down when left shift key is pressed
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
      ufoSoundSlow.volume = 0.05;
      moveForward = false; // Stop moving forward when 'Z' (azerty) key is released
    } else if (event.code === "KeyS") {
      moveBackward = false; // Stop moving backward when 'S' key is released
    } else if (event.code === "KeyA") {
      moveLeft = false; // Stop rotating left when 'Q' (azerty) key is released
    } else if (event.code === "KeyD") {
      moveRight = false; // Stop rotating right when 'D' key is released
    } else if (event.code === "ArrowUp") {
      moveUp = false; // Stop moving up when spacebar is released
    } else if (event.code === "ArrowDown") {
      moveDown = false; // Stop moving down when left shift key is released
    }
  });

  let spaceshipDirection;
  let spaceshipVelocity = new THREE.Vector3();
  const spaceshipAcceleration = 0.005;
  const spaceshipInertia = 0.998;
  const bounceAmplitude = 0.0036;
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
  for (let i = 0; i < 3000010; i++) {
    const star = new THREE.Vector3(
      Math.random() * 3200 - 1600,
      Math.random() * 3200 - 1600,
      Math.random() * 3200 - 1600
    );
    stars.push(star);
  }
  starGeo.setFromPoints(stars);
  starGeo.computeVertexNormals();
  const starss = new THREE.Points(starGeo, starMater);
  scene.add(starss);

  ///
  // PARTICLES SYSTEM

  // cannon.js bodies for the planet and spaceship
  const planetShape = new CANNON.Sphere(8);
  const planetBody = new CANNON.Body({
    shape: planetShape,
    type: CANNON.Body.STATIC,
  });
  const world = new CANNON.World();
  world.addBody(planetBody);

  const spaceshipShape = new CANNON.Box(new CANNON.Vec3(1, 1, 1));
  const spaceshipBody = new CANNON.Body({ mass: 1, shape: spaceshipShape });
  world.addBody(spaceshipBody);

  const timeStep = 1 / 60;

  ///
  /// FUN PART
  ///
  /// SHOOTING GAME
  let projectiles = [],
    targets = [];
  let score = 0;
  const timeElement = document.getElementById("time");
  const messageElement = document.getElementById("score");
  messageElement.addEventListener("transitionend", () => {
    myElement.style.display = "none";
  });

  let raceStartTime,
    result,
    totalTargets = targets.length;
  let targetIndex = 1;
  function updateMessage(content) {
    messageElement.textContent = content;
  }
  function setTimer(content) {
    timeElement.textContent = content;
  }

  function createTargets() {
    const geometry = new THREE.CylinderGeometry(15, 15, 2, 32);
    geometry.rotateX(Math.PI / 2);
    const material = new THREE.MeshPhongMaterial({
      /* color: 0x766ced, */
      side: THREE.DoubleSide,
      map: textureLoader.load(portal),
      transparent: true,
      opacity: 0.5,
      emissive: 0x000000,
    });
    const targetPositions = [
      new THREE.Vector3(-100, 100, 500),
      new THREE.Vector3(-150, 100, 800),
      new THREE.Vector3(-300, 150, 1100),
      new THREE.Vector3(-360, 150, 1400),
      new THREE.Vector3(-400, 160, 1700),
      new THREE.Vector3(-550, 100, 2000),
      new THREE.Vector3(-600, 40, 2300),
      new THREE.Vector3(-750, 0, 2600),
      new THREE.Vector3(-650, 50, 3000),
      new THREE.Vector3(-550, 20, 3400),
    ];

    for (let i = 0; i < targetPositions.length; i++) {
      const target = new THREE.Mesh(geometry, material);
      const position = targetPositions[i];
      target.position.copy(position);
      scene.add(target);
      const light = new THREE.PointLight(0x0000ff, 2, 5);
      target.add(light);

      // Show only the first target initially
      target.visible = i === 0;

      targets.push(target);
    }
  }
  // Reset targets and score
  function resetTargets() {
    for (let i = 0; i < targets.length; i++) {
      const target = targets[i];
      target.visible = i === 0;
    }
    score = 0;
  }
  let timerInterval;
  function updateTargets() {
    const spaceshipPosition = spaceshipContainer.position;
    let scoreMoved = false;

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
        updateMessage(`${score} / ${targets.length}`);

        if (score === 1) {
          raceStartTime = Date.now();
          timeElement.style.display = "block";
          startTimer();
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
          updateMessage(`Finished in ${raceTime} seconds`);

          resetTargets();
          raceStartTime = Date.now();

          messageElement.style.display = "block";
          messageElement.textContent = `Finished in ${raceTime} seconds`;
          clearInterval(timerInterval);
          timeElement.style.display = "none";
          setTimeout(() => {
            messageElement.style.display = "none";
          }, 8000);
        }
      }
    }
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
  const meteGeo = new THREE.SphereGeometry(10, 6, 6);
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
  });
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

  const item1Planet3 = new THREE.Sprite(pharaonMaterial);
  const item2Planet3 = new THREE.Sprite(pharaonMaterial);
  const item3Planet3 = new THREE.Sprite(pharaonMaterial);
  const item4Planet3 = new THREE.Sprite(pharaonMaterial);
  const item5Planet3 = new THREE.Sprite(pharaonMaterial);
  const item6Planet3 = new THREE.Sprite(pharaonMaterial);
  item1Planet3.position.set(1100, -200, -1100);
  item2Planet3.position.set(1300, -200, -1200);
  item3Planet3.position.set(1500, -200, -1300);
  item4Planet3.position.set(1700, -200, -1400);
  item5Planet3.position.set(1900, -200, -1500);
  item6Planet3.position.set(2100, -200, -1600);
  const planet3Items = [
    item1Planet3,
    item2Planet3,
    item3Planet3,
    item4Planet3,
    item5Planet3,
    item6Planet3,
  ];

  planet3Items.forEach((item) => {
    item.scale.set(10, 10, 1);
    scene.add(item);
  });
  let collectedItems = 0;
  function collectPharaons() {
    const numberOfItems = planet3Items.length;

    planet3Items.forEach((item) => {
      if (item.visible && spaceshipPosition.distanceTo(item.position) < 15) {
        collectedItems++;
        itemSound.play();
        itemSound.volume = 0.3;
        item.visible = false;
        console.log(collectedItems);
      }
    });

    if (collectedItems === numberOfItems) planet3Button.all_items = true;
    if (planet3Button.all_items) console.log(planet3Button.all_items);
  }
  createTargets();

  updateMessage("HELLO ;)");

  ///
  // ANIMATION OF THE SCENE
  function animate() {
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
    world.step(timeStep);
    const speed = options.speed;
    /* if (
      (moveForward ||
        moveBackward ||
        moveDown ||
        moveUp ||
        moveLeft ||
        moveRight) &&
      spaceshipSpeed < speed / 5 + 2.5
    ) {
      spaceshipSpeed += 0.003;
    } else  */
    spaceshipSpeed = 0.02;

    // distance between the camera and the planets
    let distance, distance2, distance3, distance4, distance5;
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

    if (spaceshipSpeed >= 1.5 && distance < 60 && (moveBackward || moveForward))
      spaceshipSpeed = spaceshipSpeed / speed - 0.997;

    // this limits the zoom when in front of planets/meteorites
    meteoritesPlanet3.forEach((meteorite) => {
      if (spaceshipPosition.distanceTo(meteorite.position) <= 20) {
        gsap.to(spaceshipPosition, {
          duration: 2,
          x: 800,
        });
      }
    });

    if (distance <= 15) {
      gsap.to(spaceshipPosition, {
        duration: 2,
        z: 35,
        /* ease: "power3.inOut", */
      });
    }
    if (distance2 <= 75) {
      gsap.to(spaceshipPosition, {
        duration: 2,
        z: -700,
        /* ease: "power3.inOut", */
      });
    }
    if (distance3 <= 180) {
      gsap.to(spaceshipPosition, {
        duration: 2,
        z: -1600,
        /* ease: "power3.inOut", */
      });
    }
    if (distance3 <= 2800) planet3MeteoritesMovement(4.2);
    else planet3MeteoritesMovement(0.3);
    if (distance4 <= 50) {
      gsap.to(spaceshipPosition, {
        duration: 2,
        z: -120,
        /* ease: "power3.inOut", */
      });
    }
    if (distance5 <= 140) {
      gsap.to(spaceshipPosition, {
        duration: 2,
        z: 120,
        /* ease: "power3.inOut", */
      });
    }

    if (distance <= 30 && canClose) showMessageButton(planet1Button.message);
    else if (distance2 <= 150 && canClose) {
      showMessageButton(planet2Button.message);
    } else if (distance3 <= 300 && canClose) {
      // this check for the current sessionID and if the score is good enough
      fetch("/game-2d/score/" + localStorage.getItem("sessionId"), {
        method: "GET",
      })
        .then((response) => response.json())
        .then((scoreData) => {
          // find the highest score in the array of scores
          const highestScore = scoreData.reduce(
            (max, score) => Math.max(max, score.score),
            0
          );
          if (highestScore >= 100) {
            planet3Button.minimum_score = true;
          }
        })
        .catch((error) => console.error("Error:", error));
      console.log("Loading level 2");

      showMessageButton(planet3Button.message);
    } else if (distance4 <= 145 && canClose)
      showMessageButton(planet4Button.message);
    else if (distance5 <= 325 && canClose)
      showMessageButton(planet5Button.message);
    else hideMessageButton();

    /* camera.lookAt(0, 0, 0); */
    /* } */
    if (spaceshipModel) {
      /* const spaceshipPosition = camera.position.clone().add(spaceshipOffset);
      spaceshipModel.position.copy(spaceshipPosition); */
      spaceshipModel.rotation.x = THREE.MathUtils.degToRad(10);
    }

    all_planets.forEach((planet) => (planet.rotation.y += 0.001));
    targets.forEach((target) => (target.rotation.z += 0.09));

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
    collectPharaons();
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
  gui.close();
  /* const guiContainer = document.createElement("div");
  guiContainer.classList.add("gui-container");
  document.body.appendChild(guiContainer);
  guiContainer.appendChild(gui.domElement); */

  gui.add(options, "speed", 0.3, 5);
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
      location.reload(); // Refresh the page
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
    if (allClosed === 5) {
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
document.addEventListener("keydown", function (event) {
  if (event.code === "Enter" && startButton.style.display !== "none") {
    startButton.click();
  }
});

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
