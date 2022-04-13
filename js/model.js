const timeline = gsap.timeline();

const domEvents = new THREEx.DomEvents(camera, renderer.domElement);

//MODEL
const loader = new THREE.GLTFLoader();

const tl = gsap.timeline();

let base;
let bigBox;
let bigBoxCameraTimeline = gsap.timeline({ paused: true });

loader.crossOrigin = true;

loader.load("./assets/glb/model.glb", (glb) => {
  hideLoader();

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
        const bigBoxOpen = (child) => {
          //if (!bigBoxOpened) {
          if (!modelOpened) {
            littleBoxOpened && closeModal(".modal-little-box");

            bigBoxOpened = true;
            littleBoxOpened = false;
            modelOpened = true;

            const childReference = new THREE.Box3().setFromObject(child);
            let childCenter = childReference.getCenter(new THREE.Vector3());

            isMobile && (childCenter.y = -0.8);

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
                  y: childCenter.y + isMobile ? 6 : 4,
                  z: childCenter.z + isMobile ? 6 : 4,
                  duration: 1,
                },
                0
              )
              .to(
                camera.rotation,
                {
                  x: isMobile ? -0.925 : -0.727,
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
        const littleBoxOpen = () => {
          //if (!littleBoxOpened) {
          if (!modelOpened) {
            bigBoxOpened && closeModal(".modal-big-box");

            littleBoxOpened = true;
            bigBoxOpened = false;
            modelOpened = true;

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

//addLights();
