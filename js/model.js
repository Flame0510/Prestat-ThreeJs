const timeline = gsap.timeline();

const domEvents = new THREEx.DomEvents(camera, renderer.domElement);

const labelContainerElem = document.querySelector("#labels");

const instances = [];

const makeInstance = (obj, x, y) => {
  const tapIndicator = document.createElement("div");
  tapIndicator.classList.add("tap-indicator");

  const tapIndicatorElement1 = document.createElement("div");
  tapIndicatorElement1.classList.add("tap-indicator-element");
  tapIndicator.appendChild(tapIndicatorElement1);

  const tapIndicatorElement2 = document.createElement("div");
  tapIndicatorElement2.classList.add("tap-indicator-element");
  tapIndicator.appendChild(tapIndicatorElement2);

  const tapIndicatorElement3 = document.createElement("div");
  tapIndicatorElement3.classList.add("tap-indicator-element");
  tapIndicator.appendChild(tapIndicatorElement3);

  labelContainerElem.appendChild(tapIndicator);

  instances.push({ obj, tapIndicator, x, y });

  return { obj, tapIndicator };
};

const addTapIndicatorAnimation = () => {
  const size = isMobile ? 20 : 50;

  gsap
    .timeline({ repeat: -1 })
    .from(
      ".tap-indicator-element",
      {
        width: size,
        height: size,
        duration: 1,
        stagger: 0.1,
      },
      0
    )
    .to(
      ".tap-indicator-element",
      {
        width: size,
        height: size,
        duration: 1,
        stagger: 0.1,
      },
      1
    );
};

//LOADER MANAGER
const manager = new THREE.LoadingManager();
const progressBar = document.querySelector(".progress-bar");

manager.onStart = function (url, itemsLoaded, itemsTotal) {
  progressBar.style.width = "10%";
};

manager.onLoad = function () {
  progressBar.style.width = "100%";

  setTimeout(() => hideLoader(), 1000);
};

manager.onProgress = function (url, itemsLoaded, itemsTotal) {
  progressBar.style.width = `${((itemsLoaded * 100) / itemsTotal).toFixed(0)}%`;
};

//MODEL
const loader = new THREE.GLTFLoader(manager);

const tl = gsap.timeline();

let base;
let bigBox;
let bigBoxCameraTimeline = gsap.timeline({ paused: true });

loader.crossOrigin = true;

loader.load("./assets/glb/model.glb", (glb) => {
  base = glb.scene;

  base.scale.set(1, 1, 1);
  base.position.set(0, -3, 0);
  base.receiveShadow = true;

  //domEvents.addEventListener(base, "touchstart", () => alert("CLICCATO"));

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
    //console.log(child.name);

    switch (child.name) {
      case "Base":
        //domEvents.addEventListener(child, "click", () => closeModal());
        //child.THREE.MeshPhongMaterial({ color: 0xc0b7cd, flatShading: true });
        break;

      //BIG BOX
      case "box001":
        makeInstance(child, -100, 100);

        const bigBoxOpen = (child) => {
          //if (!bigBoxOpened) {

          if (!objectSelected) {
            littleBoxOpened && closeModal(".modal-little-box");

            bigBoxOpened = true;
            littleBoxOpened = false;
            objectSelected = true;

            const childReference = new THREE.Box3().setFromObject(child);
            let childCenter = childReference.getCenter(new THREE.Vector3());

            isMobile && (childCenter.y = -0.8);
            !isMobile && (childCenter.x += 0.8);

            console.log("CHILDCENTERE: ", childCenter);

            const timeline = gsap.timeline({
              paused: true,
              //onUpdate: () => camera.lookAt(childCenter),
              onStart: () => (controls.enabled = false),
              onComplete: () => {
                camera.lookAt(childCenter);
                controls.target = childCenter;

                controls.enabled = true;

                const polarAngle = isMobile ? 0.65 : 0.84;
                controls.minPolarAngle = polarAngle;
                controls.maxPolarAngle = polarAngle;

                controls.minAzimuthAngle = -4;
                controls.maxAzimuthAngle = 0.8;
              },
            });

            timeline
              .to(
                camera.position,
                {
                  x: childCenter.x,
                  y: isMobile ? 6 : 5,
                  z: isMobile ? 6 : 5,
                  duration: 1,
                },
                0
              )
              .to(
                camera.rotation,
                {
                  x: isMobile ? -0.925 : -0.712,
                  y: 0,
                  z: 0,
                  duration: 1,
                },
                0
              );

            timeline.play();

            controls.update();

            openModal(".modal-big-box");
          }
        };

        domEvents.addEventListener(child, "click", () => bigBoxOpen(child));
        domEvents.addEventListener(child, "touchstart", () =>
          bigBoxOpen(child)
        );
        break;

      //LittleBox
      case "thins023":
        makeInstance(child, 100, 0);

        addTapIndicatorAnimation();

        const littleBoxOpen = () => {
          //if (!littleBoxOpened) {
          if (!objectSelected) {
            bigBoxOpened && closeModal(".modal-big-box");

            littleBoxOpened = true;
            bigBoxOpened = false;
            objectSelected = true;

            const childReference = new THREE.Box3().setFromObject(child);
            let childCenter = childReference.getCenter(new THREE.Vector3());

            //childCenter.y += isMobile ? -0.5 : 1;

            /* childCenter.x += 
            childCenter.y += 
            childCenter.z += 5; */

            isMobile && (childCenter.y = 0.2);

            const timeline = gsap.timeline({
              paused: true,
              onStart: () => (controls.enabled = false),
              onComplete: () => {
                camera.lookAt(childCenter);
                controls.target = childCenter;

                controls.enabled = true;

                const polarAngle = isMobile ? 1.05 : 1.3;
                controls.minPolarAngle = polarAngle;
                controls.maxPolarAngle = polarAngle;

                controls.minAzimuthAngle = -1;
                controls.maxAzimuthAngle = 3.5;
              },
            });

            console.log("CHILDCENTERE: ", childCenter);

            timeline
              .to(
                camera.position,
                {
                  x: childCenter.x - 2,
                  y: childCenter.y + isMobile ? 3 : 2,
                  z: childCenter.z + isMobile ? 6 : 4,
                  duration: 1,
                },
                0
              )
              .to(
                camera.rotation,
                {
                  x: isMobile ? -0.553 : -0.285,
                  y: isMobile ? -0.359 : -0.4,
                  z: isMobile ? -0.213 : -0.114,
                  duration: 1,
                },
                0
              );

            timeline.play();

            controls.update();

            openModal(".modal-little-box");
          }
        };

        domEvents.addEventListener(child, "click", () => littleBoxOpen(child));
        domEvents.addEventListener(child, "touchstart", () =>
          littleBoxOpen(child)
        );
        break;
    }

    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  scene.add(base);
});
