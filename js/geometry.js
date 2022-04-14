//GEOMETRY
const boxWidth = 1;
const boxHeight = 1;
const boxDepth = 1;
const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

const material = new THREE.MeshToonMaterial();

const mat = new THREE.MeshPhongMaterial({ color: "#CA8" });

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

const box = new THREE.Mesh(geometry, mat);
box.position.y = 3;
box.scale.set(0.5, 0.5, 0.5);
box.castShadow = true;
box.receiveShadow = false;
//box.rotation.set(3, 2, 0);
//scene.add(box);

const plane = new THREE.Mesh(geometry, mat);
plane.position.y = 2;
plane.scale.set(2, 0.1, 2);
plane.receiveShadow = true;

const planeCylinder = new THREE.Mesh(
  new THREE.CylinderGeometry(0.2, 0.2, 0.01, 200),
  new THREE.MeshPhongMaterial({ color: "#f00" })
);
planeCylinder.position.y = 2;
//planeCylinder.scale.set(1, 0.01, 1);
planeCylinder.position.set(1, 2.5, 2);
//scene.add(planeCylinder);

/* const planeFolder = gui.addFolder("PLANE FOLDER");
planeFolder.add(planeCylinder.position, "x", -10, 10);
planeFolder.add(planeCylinder.position, "y", -10, 10);
planeFolder.add(planeCylinder.position, "z", -10, 10);
planeFolder.add(planeCylinder.rotation, "x", -10, 10);
planeFolder.add(planeCylinder.rotation, "y", -10, 10);
planeFolder.add(planeCylinder.rotation, "z", -10, 10);
planeFolder.open(); */

const cylinderTl = gsap.timeline({ repeat: -1 });

cylinderTl
  .to(
    planeCylinder.scale,
    {
      x: 1.5,
      z: 1.5,
      duation: 1,
    },
    0
  )
  .to(
    planeCylinder.scale,
    {
      x: 1,
      z: 1,
      duation: 1,
    },
    1
  );
