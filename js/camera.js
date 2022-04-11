//CAMERA
const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  1,
  1000
);

camera.far = 100000;
camera.updateProjectionMatrix();

gsap.registerPlugin(ScrollTrigger);

camera.position.y = 5;
camera.position.z = 7;
camera.rotation.x = 1;

let cameraZ;

const calcCameraZ = () => {
  cameraZ = 18 - window.innerWidth / 200;
  console.log("CAMERA Z: ", cameraZ);

  isMobile && camera.position.set(0, cameraZ, cameraZ);
};

calcCameraZ();

const cameraFolder = gui.addFolder("Camera");
cameraFolder.add(camera.position, "x", -10, 10);
cameraFolder.add(camera.position, "y", -10, 10);
cameraFolder.add(camera.position, "z", -10, 10);
cameraFolder.add(camera.rotation, "x", -10, 10);
cameraFolder.add(camera.rotation, "y", -10, 10);
cameraFolder.add(camera.rotation, "z", -10, 10);
