let bigBoxOpened = false;
let littleBoxOpened = false;

let bigBoxModalCompleteOpened = false;
let littleBoxModalCompleteOpened = false;

let openModalTl = null;

let modelOpened = false;

//MODAL SHOW / HIDE FUNCTIONS
const closeModal = (modalClass = ".modal") => {
  controls.enabled = false;

  openModalTl.kill();
  openModalTl = null;

  gsap
    .timeline({
      //onUpdate: () => camera.lookAt(modelCenter),
      onComplete: () => {
        camera.lookAt(modelCenter);
        controls.target = modelCenter;

        setDefaultPolarAngle();

        controls.minAzimuthAngle = -4;
        controls.maxAzimuthAngle = 0.8;

        bigBoxOpened = false;
        littleBoxOpened = false;

        modelOpened = false;

        bigBoxModalCompleteOpened = false;
        littleBoxModalCompleteOpened = false;

        controls.enabled = true;
      },
    })
    .to(
      camera.position,
      {
        x: modelCenter.x,
        y: modelCenter.y + 5,
        z: modelCenter.z + isMobile ? 12 : 8,
        /* x: 0,
        y: 6,
        z: 7, */
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
    )
    .to(
      ".header",
      {
        display: "flex",
        opacity: 1,
      },
      0
    )
    .to(
      modalClass,
      isMobile
        ? {
            top: "100%",
            duration: 1,
          }
        : {
            right: "-100%",
            duration: 1,
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
    /* .to(
      ".modal .modal-content",
      {
        opacity: 0,
        duration: 0.5,
        stagger: 0.2,
      },
      0
    ) */
    // .from(
    //   /* modalClass === ".modal-big-box"
    //     ? ".modal-big-box .modal-element"
    //     : modalClass === ".modal-little-box" &&
    //         ".modal-little-box .modal-element", */
    //   ".modal .modal-element",
    //   {
    //     opacity: 0,
    //     x: isMobile ? 0 : 100,
    //     y: isMobile ? 200 : 0,
    //     stagger: 0.2,
    //   },
    //   0
    // )
    .to(
      ".modal .purchase-btn",
      {
        opacity: 0,
        duration: 0.5,
      },
      0
    );
  /* .to(
      ".modal .modal-content",
      {
        opacity: 1,
        x: 0,
        y: 0,
      },
      1
    ); */

  controls.update();
};

const openModal = (modalClass) => {
  openModalTl = null;
  openModalTl = gsap.timeline({ paused: true });

  console.log(modalClass);

  openModalTl
    .to(
      modalClass,
      isMobile
        ? {
            //height: isMobile ? "50%" : "100%",
            top: "50%",
            //y: isMobile ? "100%" : 0,
          }
        : {
            right: 0,
          },
      0
    )
    .to(
      ".header",
      {
        display: "none",
        opacity: 0,
      },
      0
    )
    .from(
      ".modal",
      isMobile
        ? {
            /* background:
              "radial-gradient(100% 50% at 50% 100%, #fff 100%, transparent 100%)", */
            /* borderTopLeftRadius: 2000,
            borderTopRightRadius: 2000, */
          }
        : {
            /* borderTopLeftRadius: 2000,
            borderBottomLeftRadius: 2000, */
          },
      0
    )
    /* .from(
      ".modal .modal-content",
      {
        opacity: 0,
        //x: 100,
        duration: 0.5,
        stagger: 0.5,
      },
      0
    ) */
    .from(
      modalClass === ".modal-big-box"
        ? ".modal-big-box .modal-element"
        : modalClass === ".modal-little-box" &&
            ".modal-little-box .modal-element",
      {
        opacity: 0,
        x: isMobile ? 0 : 100,
        y: isMobile ? 200 : 0,
        stagger: 0.05,
      },
      0
    )
    .to(
      ".modal .purchase-btn",
      {
        opacity: 1,
        duration: 1,
      },
      0
    );

  openModalTl.restart();
};

//closeModal();
document.querySelectorAll(".modal .close-btn").forEach((modal) =>
  modal.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    closeModal();
  })
);

document.querySelectorAll(".modal .purchase-btn").forEach((modal) =>
  modal.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    window.open('https://prestat.com', '_blank');
  })
);

if (isMobile) {
  const openModalComplete = (modalClass) => {
    openModalTl.to(modalClass, {
      top: 0,
      duration: 1,
    });

    openModalTl.resume();
  };

  document
    .querySelector(".modal-big-box")
    .addEventListener(
      "click",
      () =>
        bigBoxModalCompleteOpened === false &&
        ((bigBoxModalCompleteOpened = true),
        openModalComplete(".modal-big-box"))
    );

  document
    .querySelector(".modal-little-box")
    .addEventListener(
      "click",
      () =>
        littleBoxModalCompleteOpened === false &&
        ((littleBoxModalCompleteOpened = true),
        openModalComplete(".modal-little-box"))
    );
}
