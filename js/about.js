const closeAbout = () =>
  gsap.timeline().to(
    ".about",
    {
      display: "none",
      opacity: 0,
    },
    0
  );

closeAbout();

document.querySelector("#info").addEventListener("click", () =>
  gsap
    .timeline()
    .to(
      ".about",
      {
        display: "flex",
        opacity: 1,
        duration: 0.3,
      },
      0
    )
    .from(
      ".about-element",
      {
        opacity: 0,
        y: 20,
        //x: 100,
        duration: 0.5,
        stagger: 0.1,
      },
      0
    )
);

document
  .querySelector("#about-close-btn")
  .addEventListener("click", () => closeAbout());

//loader.style.display = "none";

document.querySelector(".about").style.display = "none";

//document.addEventListener("load", () => (loader.style.display = "flex"));

/* const manager = new THREE.LoadingManager();
    manager.onStart = () => loader.style.display = "flex";
    manager.onLoad = () => loader.style.display = "none"; */

/* document.addEventListener(
      "DOMContentLoaded",
      () => ((loader.style.display = "none"), console.log("LOADED"))
    ); */
