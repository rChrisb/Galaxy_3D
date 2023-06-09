import * as THREE from "three";
import * as dat from "dat.gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import face1 from "../images/exosystem_ft.png";
import face2 from "../images/exosystem_bk.png";
import face3 from "../images/exosystem_up.png";
import face4 from "../images/exosystem_dn.jpg";
import face5 from "../images/exosystem_rt.jpg";
import face6 from "../images/exosystem_lf.png";

const pinkColor = 0xff65ed;
const windSound = document.getElementById("windSound");
windSound.play();
console.log(windSound.volume);
const camera = new THREE.PerspectiveCamera(
  55,
  window.innerWidth / window.innerHeight,
  0.1,
  30000
);
const renderer = new THREE.WebGLRenderer({ antialias: true });
const scene = new THREE.Scene();
function pinkPlanet() {
  /* camera.position.set(-900, -200, -900); */
  camera.position.z = -300;

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
    new THREE.MeshBasicMaterial({ map: texture_ft, color: pinkColor })
  );
  materialArray.push(
    new THREE.MeshBasicMaterial({ map: texture_bk, color: pinkColor })
  );
  materialArray.push(
    new THREE.MeshBasicMaterial({ map: texture_up, color: pinkColor })
  );
  materialArray.push(
    new THREE.MeshBasicMaterial({ map: texture_dn, color: pinkColor })
  );
  materialArray.push(
    new THREE.MeshBasicMaterial({ map: texture_rt, color: pinkColor })
  );
  materialArray.push(
    new THREE.MeshBasicMaterial({ map: texture_lf, color: pinkColor })
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
pinkPlanet();

/// GUI
const gui = new dat.GUI();
const goBackToSpace = {
  "Back to Space": function () {
    window.location.href = "3D_scene.html";
  },
};
const menuFolder = gui.addFolder("Menu");
menuFolder.add(goBackToSpace, "Back to Space");
