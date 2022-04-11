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
scene.background = new THREE.Color("#876b9e");



//cameraZ < 1.3 && (cameraZ = 1.3);

const timeline = gsap.timeline();

const domEvents = new THREEx.DomEvents(camera, renderer.domElement);

//ORBIT CONTROLS
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableZoom = true;
controls.minDistance = 6;
controls.maxDistance = 10;
controls.maxPolarAngle = 1.3;
controls.rotateSpeed = 0.2;
controls.zoomSpeed = 0.2;
controls.enabled = true;
controls.target.set(0, 0, 0);

let bigBoxOpened = false;
let littleBoxOpened = false;

//MODAL SHOW / HIDE FUNCTIONS
const closeModal = (modalClass = ".modal") => {
  gsap
    .timeline()
    .to(
      camera.position,
      {
        x: 0,
        y: 5,
        z: 7,
        duration: 1,
      },
      0
    )
    .to(
      camera.rotation,
      {
        x: -0.6,
        y: 0,
        z: 0,
      },
      0
    )
    .to(
      modalClass,
      isMobile
        ? {
            y: "100%",
          }
        : {
            x: "100%",
          },
      0
    )
    .from(
      ".modal",
      {
        /*  borderTopLeftRadius: 2000,
        borderBottomLeftRadius: 2000, */
      },
      0
    )
    .to(
      ".modal .modal-content",
      {
        opacity: 0,
        //x: 100,
        duration: 0.5,
        delay: 0.5,
      },
      0
    )
    .to(
      ".modal .modal-content",
      {
        opacity: 1,
        //x: 0,
      },
      1
    );

  bigBoxOpened = false;
  littleBoxOpened = false;
};

const openModal = (modalClass) => {
  gsap
    .timeline()
    .to(
      modalClass,
      {
        x: 0,
        y: 0,
      },
      0
    )
    .from(
      ".modal",
      isMobile
        ? {
            /* background:
              "radial-gradient(100% 100% at 100% 0%, #fff 100%, transparent 100%)", */
            /* borderTopLeftRadius: 2000,
            borderTopRightRadius: 2000, */
          }
        : {
            /* borderTopLeftRadius: 2000,
            borderBottomLeftRadius: 2000, */
          },
      0
    )
    .from(
      ".modal .modal-content",
      {
        opacity: 0,
        //x: 100,
        duration: 0.5,
        delay: 0.2,
      },
      0
    );
};

//closeModal();

document
  .querySelector(".modal-big-box #close-btn")
  .addEventListener("click", () => closeModal());
document
  .querySelector(".modal-little-box #close-btn")
  .addEventListener("click", () => closeModal());

//MODEL
const loader = new THREE.GLTFLoader();

const tl = gsap.timeline();

let bigBox;
let bigBoxCameraTimeline = gsap.timeline({ paused: true });

loader.crossOrigin = true;

loader.load("./assets/glb/model.glb", (glb) => {
  const base = glb.scene;

  base.scale.set(1, 1, 1);
  base.position.y = -2.8;
  base.receiveShadow = true;

  const baseFolder = gui.addFolder("BASE MODEL");
  baseFolder.add(base.position, "x", -5, 20);
  baseFolder.add(base.position, "y", -5, 20);
  baseFolder.add(base.position, "z", -5, 20);
  baseFolder.add(base.rotation, "x", -5, 20);
  baseFolder.add(base.rotation, "y", -5, 20);
  baseFolder.add(base.rotation, "z", -5, 20);
  //baseFolder.open();

  //enableShadow(base);

  base.traverse((child) => {
    console.log(child.name);

    switch (child.name) {
      /* case "Base":
        domEvents.addEventListener(child, "click", () => closeModal());
        break; */

      case "BigBox":
        domEvents.addEventListener(child, "click", () => {
          if (!bigBoxOpened) {
            littleBoxOpened && closeModal(".modal-little-box");

            bigBoxOpened = true;
            littleBoxOpened = false;

            const timeline = gsap.timeline({ paused: true });

            timeline
              .to(
                camera.position,
                {
                  x: isMobile ? -1 : 0.6,
                  y: 5,
                  z: isMobile ? 10 : 6,
                  duration: 1,
                },
                0
              )
              .to(
                camera.rotation,
                {
                  x: -0.6,
                  y: 0,
                  z: 0,
                },
                0
              );

            timeline.play();

            openModal(".modal-big-box");
          }
        });
        break;

      case "LittleBox":
        domEvents.addEventListener(child, "click", () => {
          if (!littleBoxOpened) {
            bigBoxOpened && closeModal(".modal-big-box");

            littleBoxOpened = true;
            bigBoxOpened = false;

            const timeline = gsap.timeline({ paused: true });

            timeline
              .to(
                camera.position,
                {
                  x: isMobile ? 1.6 : 3,
                  y: isMobile ? 2.5 : 3,
                  z: isMobile ? 8 : 5,
                  duration: 1,
                },
                0
              )
              .to(
                camera.rotation,
                {
                  x: -0.3,
                  y: 0,
                  z: 0,
                },
                0
              );

            timeline.play();

            openModal(".modal-little-box");
          }
        });
        break;
    }

    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  scene.add(base);
});

//addLights();

timeline.to(
  camera.rotation,
  {
    x: -0.6,
    duration: 1,
  },
  0
);


