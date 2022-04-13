//THREEJS SCENE
const scene = new THREE.Scene();
scene.background = null; /* new THREE.Color("#876b9e"); */

//RENDERER
const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.VSMShadowMap;
renderer.gammaFactor = 2.2;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.physicallyCorrectLights = true;
renderer.toneMapping = THREE.CineonToneMapping;
renderer.toneMappingExposure = 3;
renderer.setPixelRatio(devicePixelRatio < 2 ? 2 : devicePixelRatio);

//texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

renderer.domElement.style.touchAction = "auto";

//CONTAINER
const container = document.querySelector(".threejsContainer");
container.append(renderer.domElement);

//GUI
const gui = new dat.GUI();

//SCROLLTRIGGER
gsap.registerPlugin(ScrollTrigger);
