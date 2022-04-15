let bigBoxOpened = false;
let littleBoxOpened = false;

let bigBoxModalCompleteOpened = false;
let littleBoxModalCompleteOpened = false;

let openModalTl = null;

let modalOpened = false;
let objectSelected = false;

//MODAL SHOW / HIDE FUNCTIONS
const closeModal = (modalClass = ".modal") => {
  controls.enabled = false;

  modalOpened = false;

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

        objectSelected = false;

        bigBoxModalCompleteOpened = false;
        littleBoxModalCompleteOpened = false;

        controls.enabled = true;

        openModalTl.kill();
        openModalTl = null;
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
    )
    .to(
      ".tap-indicator",
      {
        display: "flex",
        opacity: 1,
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
  openModalTl = gsap
    .timeline({
      paused: true,
      onComplete: () => {
        modalOpened = true;
        modalCompleteOpened = false;
      },
    })
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
    .to(
      ".modal",
      isMobile
        ? {
            /* background:
              "radial-gradient(100% 50% at 50% 100%, #fff 100%, transparent 100%)", */
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
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
      ".modal .modal-content-container",
      isMobile
        ? {
            overflow: "hidden",
          }
        : {},
      0
    )
    .to(
      ".modal .purchase-btn",
      {
        opacity: 1,
        duration: 1,
      },
      0
    )
    .to(
      ".tap-indicator",
      {
        display: "none",
        opacity: 0,
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

    window.open("https://prestat.com", "_blank");
  })
);

const canvas = document.querySelector("canvas");

"mousedown touchstart".split(" ").forEach((event) => {
  canvas.addEventListener(
    event,
    (e) => (touchstart = event.includes("mouse") ? e : e.changedTouches[0])
  );
});

"mouseup touchend".split(" ").forEach((event) => {
  canvas.addEventListener(event, (e) => {
    touchend = event.includes("mouse") ? e : e.changedTouches[0];
    handleGesture() === "click" && modalOpened && closeModal();
  });
});

const handleGesture = () => {
  return touchstart.screenX === touchend.screenX &&
    touchstart.screenY === touchend.screenY
    ? "click"
    : "swipe";
};

if (isMobile) {
  const openModalComplete = (modalClass) => {
    openModalTl
      .to(
        modalClass,
        {
          borderRadius: 0,
          top: 0,
          duration: 0.5,
        },
        1
      )
      .to(
        ".modal .modal-content-container",
        {
          overflowY: "scroll",
        },
        1
      );

    openModalTl.resume();
  };

  const swipe = (modalClass, modalCompleteOpened) => {
    const target = document.querySelector(modalClass);

    const targetScrollContainer = document.querySelector(
      ".modal-content-container"
    );

    console.log(targetScrollContainer.scrollTop);

    const handleGesture = () => {
      if (touchendY < touchstartY) return "up";
      if (touchendY > touchstartY) return "down";
    };

    target.addEventListener("touchstart", (e) => {
      touchstartY = e.changedTouches[0].screenY;
    });

    target.addEventListener("touchend", (e) => {
      touchendY = e.changedTouches[0].screenY;
      if (handleGesture() === "down") {
        modalOpened &&
          targetScrollContainer.scrollTop === 0 &&
          (closeModal(), (modalCompleteOpened = false));
      } else {
        modalCompleteOpened === false &&
          ((modalCompleteOpened = true), openModalComplete(modalClass));
      }
    });
  };

  swipe(".modal-big-box", bigBoxModalCompleteOpened);
  swipe(".modal-little-box", littleBoxModalCompleteOpened);
}
