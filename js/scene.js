//THREEJS SCENE
const scene = new THREE.Scene();

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
//texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

//CONTAINER
const container = document.querySelector(".threejsContainer");
container.append(renderer.domElement);

//GUI
const gui = new dat.GUI();