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
scene.background = new THREE.Color("#FBEAF1");

//CAMERA
const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  1,
  1000
);

let cameraZ = 6 - window.innerWidth / 300;
cameraZ < 2 && (cameraZ = 2);
console.log("CAMERA Z: ", cameraZ);
camera.position.z = cameraZ;

//RENDERER
const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);

//CONTAINER
const container = document.querySelector(".threejsContainer");

container.append(renderer.domElement);

//GUI
const gui = new dat.GUI();

//MODEL
const loader = new THREE.GLTFLoader();

const tl = gsap.timeline();

let model;

loader.load(
  "assets/glb/prestat-open-correct-gold.glb",

  (gltf) => {
    model = gltf.scene;

    // Set the models initial scale
    model.scale.set(0.5, 0.5, 0.5);
    model.position.set(0, 0, 0);
    model.rotation.set(0.8, -1, 0);

    // Add the model to the scene
    const modelFolder = gui.addFolder("3D Model");
    modelFolder.add(model.position, "x", -5, 20);
    modelFolder.add(model.position, "y", -5, 20);
    modelFolder.add(model.position, "z", -5, 20);
    modelFolder.add(model.rotation, "x", -5, 20);
    modelFolder.add(model.rotation, "y", -5, 20);
    modelFolder.add(model.rotation, "z", -5, 20);
    modelFolder.open();

    //GSAP MODEL ANIMATION
    tl.to(
      model.rotation,
      {
        x: 1,
        y: -2,
        duration: 4
      },
      0
    )
      .to(
        camera.position,
        {
          z: cameraZ + 1,
          duration: 4
        },
        0
      )
      .to(
        model.rotation,
        {
          x: 5,
          y: 1.2,
          duration: 12
        },
        4
      )
      /* .to(
        model.position,
        {
          y: -0.5,
          duration: 6,
        },
        4
      ) */
      .to(
        camera.position,
        {
          z: cameraZ <= 3 ? 1.8 : cameraZ - 1.8,
          duration: 10,
          delay: 6
        },
        4
      )
      /* .to(
        model.position,
        {
          y: 0,
          duration: 4,
        },
        18
      ) */
      .to(
        camera.position,
        {
          z: cameraZ + 1,
          duration: 20
        },
        20
      )
      .to(
        model.rotation,
        {
          x: 13.5,
          y: 5,
          duration: 20,
          delay: 0.2
        },
        20
      );

    tl.duration(10);
    //tl.play();

    ScrollTrigger.create({
      trigger: ".threejsContainer",
      animation: tl,
      start: "top",
      end: "bottom",
      scrub: true,
      //markers: true,
      pin: true
    });

    scene.add(model);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

//TOP LIGHT
const topLight = new THREE.PointLight(0xffffff, 1);
topLight.position.y = 5;
scene.add(topLight);

//BOTTOM LIGHT
const bottomLight = new THREE.PointLight(0xffffff, 1);
bottomLight.position.y = -5;
scene.add(bottomLight);

//OVER LIGHT
const overLight = new THREE.PointLight(0xffffff, 1);
overLight.position.z = -10;
//scene.add(overLight);

//BEHIND LIGHT
const behindLight = new THREE.PointLight(0xffffff, 1.2);
behindLight.position.z = 10;
scene.add(behindLight);

//LEFT LIGHT
const leftLight = new THREE.PointLight(0xffffff, 1);
leftLight.position.x = -5;
//scene.add(leftLight);

//RIGHT LIGHT
const rightLight = new THREE.PointLight(0xffffff, 1);
rightLight.position.x = 5;
//scene.add(rightLight);

const lightAmb = new THREE.AmbientLight(0x777777);
scene.add(lightAmb);

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
//scene.add(box);

camera.position.set(0, 0, 2);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

const lightFolder = gui.addFolder("BEHIND Light");
lightFolder.add(behindLight.position, "x", -5, 10);
lightFolder.add(behindLight.position, "y", -5, 10);
lightFolder.add(behindLight.position, "z", -5, 10);
lightFolder.open();
const cameraFolder = gui.addFolder("Camera");
cameraFolder.add(camera.position, "x", -10, 10);
cameraFolder.add(camera.position, "y", -10, 10);
cameraFolder.add(camera.position, "z", -10, 10);
cameraFolder.add(camera.rotation, "x", -10, 10);
cameraFolder.add(camera.rotation, "y", -10, 10);
cameraFolder.add(camera.rotation, "z", -10, 10);
cameraFolder.open();

gui.destroy();

//ORBIT CONTROLS
/* const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = true;
controls.enabled = true;
controls.target.set(0, 0, 0); */

animate();

function resizeRendererToDisplaySize(container, renderer) {
  const canvas = container;
  var width = window.innerWidth;
  var height = window.innerHeight;
  var canvasPixelWidth = canvas.width / window.devicePixelRatio;
  var canvasPixelHeight = canvas.height / window.devicePixelRatio;

  renderer.setSize(width, height, false);
}

const setSize = (container, camera, renderer) => {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
};

window.addEventListener("resize", () =>
  //setSize(container, camera, renderer)
  //resizeRendererToDisplaySize(container, renderer)
  renderer.setSize(window.innerWidth, window.innerHeight, false)
);
