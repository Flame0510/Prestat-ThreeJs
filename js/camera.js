//CAMERA
const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  1,
  1000
);

const modelCenter = new THREE.Vector3(0, isMobile ? 5 : 3, 0);

/* camera.far = 100000;
camera.updateProjectionMatrix(); */

let cameraZ;

const calcCameraZ = () => {
  cameraZ = 20 - window.innerWidth / 50;
  console.log("CAMERA Z: ", cameraZ);

  const minY = 7;
  const cameraY = cameraZ - 2 < minY ? cameraZ - 2 : minY;

  isMobile ? camera.position.set(0, 10, 10) : camera.position.set(0, 6, 7);
};

//calcCameraZ();

//camera.position.z = 15;
//camera.position.set(0, -5, 15);
//camera.lookAt(modelCenter);

//camera.rotation.set(0, 0, 0);

//ORBIT CONTROLS
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableZoom = true;
controls.enablePan = false;
controls.enabled = false;
controls.minDistance = 4;
controls.maxDistance = 15;
controls.rotateSpeed = 0.01;
controls.zoomSpeed = 0.2;
// controls.enableDamping = true;
// controls.dampingFactor = 0.25;

controls.minAzimuthAngle = -1.4;
controls.maxAzimuthAngle = 1.8;

const setDefaultPolarAngle = () => {
  const polarAngle = isMobile ? 1.17 : 1.01;
  controls.minPolarAngle = polarAngle;
  controls.maxPolarAngle = polarAngle;
};

setDefaultPolarAngle();

controls.target = modelCenter;

const controlsFolder = gui.addFolder("CONTROLS");
controlsFolder.add(controls.target, "x", -10, 10);
controlsFolder.add(controls.target, "y", -10, 10);
controlsFolder.add(controls.target, "z", -10, 10);

const cameraFolder = gui.addFolder("Camera");
cameraFolder.add(camera.position, "x", -10, 10);
cameraFolder.add(camera.position, "y", -10, 10);
cameraFolder.add(camera.position, "z", -10, 10);
cameraFolder.add(camera.rotation, "x", -10, 10);
cameraFolder.add(camera.rotation, "y", -10, 10);
cameraFolder.add(camera.rotation, "z", -10, 10);
cameraFolder.open();

gsap
  .timeline({
    onComplete: () => {
      camera.lookAt(modelCenter);
      controls.target = modelCenter;

      controls.enabled = true;

      //hideLoader();
    },
  })
  .to(
    camera.position,
    {
      x: modelCenter.x,
      y: modelCenter.y + 5,
      z: modelCenter.z + isMobile ? 12 : 8,
      duration: 1,
    },
    0
  )
  .to(
    camera.rotation,
    {
      x: isMobile ? -0.394 : -0.558,
      y: 0,
      z: 0,
      duration: 1,
    },
    0
  );
