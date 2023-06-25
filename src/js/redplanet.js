import * as THREE from "three";
import * as dat from "dat.gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import face1 from "../images/flame_ft.jpg";
import face2 from "../images/flame_bk.jpg";
import face3 from "../images/flame_up.jpg";
import face4 from "../images/flame_dn.jpg";
import face5 from "../images/flame_rt.jpg";
import face6 from "../images/flame_lf.jpg";

const redColor = 0x704242;
const environmentSound = document.getElementById("environmentSound");
environmentSound.play();
environmentSound.volume = 0.2;
console.log(environmentSound.volume);
function redPlanet() {
  const scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    0.1,
    30000
  );
  /* camera.position.set(-900, -200, -900); */
  camera.position.z = -300;

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  let controls = new OrbitControls(camera, renderer.domElement);
  controls.addEventListener("change", function () {
    renderer.render(scene, camera);
  });
  controls.enableZoom = false;
  controls.minDistance = 10;
  controls.maxDistance = 4000;
  controls.enableDamping = true;

  controls.update();

  //   const ambientLight = new THREE.AmbientLight(0x7f2769);
  //   scene.add(ambientLight);

  let materialArray = [];
  let texture_ft = new THREE.TextureLoader().load(face1);
  let texture_bk = new THREE.TextureLoader().load(face2);
  let texture_up = new THREE.TextureLoader().load(face3);
  let texture_dn = new THREE.TextureLoader().load(face4);
  let texture_rt = new THREE.TextureLoader().load(face5);
  let texture_lf = new THREE.TextureLoader().load(face6);

  materialArray.push(
    new THREE.MeshBasicMaterial({ map: texture_ft, color: redColor })
  );
  materialArray.push(
    new THREE.MeshBasicMaterial({ map: texture_bk, color: redColor })
  );
  materialArray.push(
    new THREE.MeshBasicMaterial({ map: texture_up, color: redColor })
  );
  materialArray.push(
    new THREE.MeshBasicMaterial({ map: texture_dn, color: redColor })
  );
  materialArray.push(
    new THREE.MeshBasicMaterial({ map: texture_rt, color: redColor })
  );
  materialArray.push(
    new THREE.MeshBasicMaterial({ map: texture_lf, color: redColor })
  );

  for (let i = 0; i < 6; i++) materialArray[i].side = THREE.BackSide;

  let skyboxGeo = new THREE.BoxGeometry(10000, 10000, 10000);
  let skybox = new THREE.Mesh(skyboxGeo, materialArray);
  scene.add(skybox);
  animate();
}

function animate() {
  camera.rotation.y -= 0.0015;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

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
document.addEventListener("mousemove", showCursor);
document.addEventListener("mouseenter", showCursor);
document.addEventListener("mouseleave", hideCursor);
redPlanet();

/// GUI
const gui = new dat.GUI();
const goBackToSpace = {
  "Back to Space": function () {
    window.location.href = "3D_scene.html";
  },
};
const menuFolder = gui.addFolder("Menu");
menuFolder.add(goBackToSpace, "Back to Space");
