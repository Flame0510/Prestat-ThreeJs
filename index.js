const vertexShader = () => {
  return `
          varying vec3 vUv;

          void main() {
            vUv = position;

            vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
            gl_Position = projectionMatrix * modelViewPosition;
          }
        `;
};

const fragmentShader = () => {
  return `
        uniform vec3 colorA;
        uniform vec3 colorB;
        varying vec3 vUv;

        void main() {
          gl_FragColor = vec4(mix(colorA, colorB, vUv.z), 1.0);
        }
    `;
};

//THREE JS
const scene = new THREE.Scene();
scene.background = new THREE.Color("#876b9e");

//CAMERA
const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  1,
  1000
);

gsap.registerPlugin(ScrollTrigger);

let cameraZ = 6 - window.innerWidth / 200;
//cameraZ < 1.3 && (cameraZ = 1.3);

console.log("CAMERA Z: ", cameraZ);
camera.position.y = 5;
camera.position.z = 7;
camera.rotation.x = 1;

const timeline = gsap.timeline();

//RENDERER
const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);

const domEvents = new THREEx.DomEvents(camera, renderer.domElement);

//CONTAINER
const container = document.querySelector(".threejsContainer");

container.append(renderer.domElement);

//GUI
const gui = new dat.GUI();

//MODEL
const loader = new THREE.GLTFLoader();

const tl = gsap.timeline();

let bigBox;
let bigBoxCameraTimeline = gsap.timeline({ paused: true });

loader.crossOrigin = true;

loader.load("./assets/glb/base.glb", (glb) => {
  const base = glb.scene;

  base.scale.set(1, 1, 1);
  base.position.y = -2.8;

  const baseFolder = gui.addFolder("BASE MODEL");
  baseFolder.add(base.position, "x", -5, 20);
  baseFolder.add(base.position, "y", -5, 20);
  baseFolder.add(base.position, "z", -5, 20);
  baseFolder.add(base.rotation, "x", -5, 20);
  baseFolder.add(base.rotation, "y", -5, 20);
  baseFolder.add(base.rotation, "z", -5, 20);
  baseFolder.open();

  domEvents.addEventListener(base, "click", () =>
    gsap.to(camera.position, {
      x: 0,
      y: 5,
      z: 7,
      duration: 1
    })
  );

  scene.add(base);
});

loader.load(
  "./assets/glb/big-box.glb",

  (glb) => {
    bigBox = glb.scene;

    // Set the models initial scale
    bigBox.scale.set(1, 1, 1);
    bigBox.position.y = -2.8;

    // Add the bigBox to the scene
    const modelFolder = gui.addFolder("3D Model");
    modelFolder.add(bigBox.position, "x", -5, 20);
    modelFolder.add(bigBox.position, "y", -5, 20);
    modelFolder.add(bigBox.position, "z", -5, 20);
    modelFolder.add(bigBox.rotation, "x", -5, 20);
    modelFolder.add(bigBox.rotation, "y", -5, 20);
    modelFolder.add(bigBox.rotation, "z", -5, 20);
    modelFolder.open();

    domEvents.addEventListener(bigBox, "click", () =>
      gsap.to(camera.position, {
        x: -1,
        y: 4,
        z: 5,
        duration: 1
      })
    );

    bigBoxCameraTimeline.to(camera.position, {
      z: 1.5,
      duration: 1
    });

    //bigBoxTimeline.play();

    scene.add(bigBox);
  }
);

loader.load("assets/glb/little-box.glb", (glb) => {
  const littleBox = glb.scene;

  littleBox.scale.set(1, 1, 1);
  littleBox.position.y = -2.8;

  domEvents.addEventListener(littleBox, "click", function () {
    console.log("LITTLE BOX");
    gsap.to(camera.position, {
      x: 2,
      y: 4,
      z: 5,
      duration: 1
    });
  });

  scene.add(littleBox);
});

loader.load("assets/glb/chocolate.glb", (glb) => {
  const chocolate = glb.scene;

  chocolate.scale.set(1, 1, 1);
  chocolate.position.y = -2.8;

  domEvents.addEventListener(chocolate, "click", function () {
    console.log("CHOCOLATE");
  });

  scene.add(chocolate);
});

const light = new THREE.DirectionalLight(0xffffff, 3);
light.target.position.set(0, 0, 0);
scene.add(light.target);
scene.add(light);

const lightHelper = new THREE.DirectionalLightHelper(light, 1);
scene.add(lightHelper);

const lightGui = light;
const lightFolder = gui.addFolder("LIGHT");
lightFolder.add(lightGui, "intensity", -5, 5);
lightFolder.add(lightGui.position, "x", -5, 20);
lightFolder.add(lightGui.position, "y", -5, 20);
lightFolder.add(lightGui.position, "z", -5, 20);
lightFolder.add(lightGui.rotation, "x", -5, 20);
lightFolder.add(lightGui.rotation, "y", -5, 20);
lightFolder.add(lightGui.rotation, "z", -5, 20);
/* lightFolder.add(lightGui.target.position, "x", -5, 20);
lightFolder.add(lightGui.target.position, "y", -5, 20);
lightFolder.add(lightGui.target.position, "z", -5, 20); */
lightFolder.open();

//TOP LIGHT
const topLight = new THREE.PointLight(0xffffff, 1);
topLight.position.y = 5;
//scene.add(topLight);

//BOTTOM LIGHT
const bottomLight = new THREE.PointLight(0xffffff, 1);
bottomLight.position.y = -5;
//scene.add(bottomLight);

//OVER LIGHT
const overLight = new THREE.PointLight(0xffffff, 1);
overLight.position.z = -10;
//scene.add(overLight);

//BEHIND LIGHT
const behindLight = new THREE.DirectionalLight(0xffffff, 2);
behindLight.position.set(0, 1, 2);
behindLight.target.position.set(0, 0, 0);
scene.add(behindLight);

const behindLightFolder = gui.addFolder("BEHIND LIGHT");
behindLightFolder.add(behindLight, "intensity", 0, 5);
behindLightFolder.add(behindLight.position, "x", -5, 5);
behindLightFolder.add(behindLight.position, "y", -5, 5);
behindLightFolder.add(behindLight.position, "z", -5, 5);
behindLightFolder.open();

scene.add(new THREE.DirectionalLightHelper(behindLight, 1));

//LEFT LIGHT
const leftLight = new THREE.PointLight(0xffffff, 1);
leftLight.position.x = -5;
//scene.add(leftLight);

//RIGHT LIGHT
const rightLight = new THREE.PointLight(0xffffff, 1);
rightLight.position.x = 5;
//scene.add(rightLight);

const lightAmb = new THREE.AmbientLight(0x777777);
//scene.add(lightAmb);

const pointLight = new THREE.PointLight("#fff", 1);
pointLight.position.set(0, 2, 1);

const pointLightFolder = gui.addFolder("LIGHT POINT");
pointLightFolder.add(pointLight.position, "x", -10, 10);
pointLightFolder.add(pointLight.position, "y", -10, 10);
pointLightFolder.add(pointLight.position, "z", -10, 10);
pointLightFolder.add(pointLight, "intensity", -10, 10);
pointLightFolder.open();

scene.add(pointLight);

const lightPointHelper = new THREE.PointLightHelper(pointLight, 1);
scene.add(lightPointHelper);

timeline.to(
  camera.rotation,
  {
    x: -0.6,
    duration: 1
  },
  0
);
/* .to(
    behindLight.position,
    {
      x: 1,
      y: 2,
      z: 4,
      duration: 1.75,
      delay: 0.25
    },
    0
  ); */
/* .to(
    behindLight.position,
    {
      x: -3,
      duration: 1,
      delay: 0.5
    },
    0
  ); */

/* ScrollTrigger.create({
  trigger: ".threejsContainer",
  animation: timeline,
  start: "top",
  end: "bottom",
  scrub: true,
  pin: true
}); */

//GEOMETRY
const geometry = new THREE.BoxGeometry();

const material = new THREE.MeshToonMaterial();

/*const material = new THREE.MeshPhysicalMaterial({ color: "#fff" });

let uniforms = {
  colorB: { type: "vec3", value: new THREE.Color("#ccc") },
  colorA: { type: "vec3", value: new THREE.Color("#fff") },
};

const material = new THREE.ShaderMaterial({
  uniforms: uniforms,
  fragmentShader: fragmentShader(),
  vertexShader: vertexShader(),
}); */

const box = new THREE.Mesh(geometry, material);
box.rotation.set(3, 2, 0);
//scene.add(box);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

const cameraFolder = gui.addFolder("Camera");
cameraFolder.add(camera.position, "x", -10, 10);
cameraFolder.add(camera.position, "y", -10, 10);
cameraFolder.add(camera.position, "z", -10, 10);
cameraFolder.add(camera.rotation, "x", -10, 10);
cameraFolder.add(camera.rotation, "y", -10, 10);
cameraFolder.add(camera.rotation, "z", -10, 10);
cameraFolder.open();

//gui.destroy();

//ORBIT CONTROLS
/* const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = true;
controls.enabled = true;
controls.target.set(0, 0, 0); */

animate();

window.addEventListener(
  "resize",
  function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  },
  false
);
