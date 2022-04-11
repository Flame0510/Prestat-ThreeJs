const light = new THREE.DirectionalLight(0xffffff, 1.2);
light.position.set(3.5, 8, -2);
light.target.position.set(0, 0, 0);
light.castShadow = true;
light.shadow.bias = -0.001;
light.shadow.mapSize.width = 2048;
light.shadow.mapSize.height = 2048;
scene.add(light.target);
scene.add(light);

const lightHelper = new THREE.CameraHelper(light.shadow.camera);
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

//TOP LIGHT
const topLight = new THREE.PointLight(0xffffff, 0.5);
topLight.position.y = 5;
scene.add(topLight);

//BOTTOM LIGHT
const bottomLight = new THREE.PointLight(0xffffff, 1);
bottomLight.position.y = -5;
//scene.add(bottomLight);

//OVER LIGHT
const overLight = new THREE.PointLight(0xffffff, 1);
overLight.position.z = -10;
scene.add(overLight);

//BEHIND LIGHT
const behindLight = new THREE.PointLight(0xffffff, 0.6);
behindLight.position.set(0, 4, 6);
//behindLight.castShadow = true;
//behindLight.target.position.set(0, 0, 0);
scene.add(behindLight);

const behindLightFolder = gui.addFolder("BEHIND LIGHT");
behindLightFolder.add(behindLight, "intensity", 0, 5);
behindLightFolder.add(behindLight.position, "x", -10, 10);
behindLightFolder.add(behindLight.position, "y", -10, 10);
behindLightFolder.add(behindLight.position, "z", -10, 10);
//behindLightFolder.open();

scene.add(new THREE.PointLightHelper(behindLight, 1));

//LEFT LIGHT
const leftLight = new THREE.PointLight(0xffffff, 1);
leftLight.position.x = -5;
scene.add(leftLight);

//RIGHT LIGHT
const rightLight = new THREE.PointLight(0xffffff, 1);
rightLight.position.x = 5;
//scene.add(rightLight);

const rectLight = new THREE.RectAreaLight(0xffff, 5);
rectLight.scale.set(2, 2, 2);
rectLight.position.y = 2;
//scene.add(rectLight);

//const helperRect = new THREE.RectAreaLightHelper(rectLight);
//light.add(helperRect);
