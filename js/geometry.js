//GEOMETRY
const geometry = new THREE.BoxGeometry();

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
