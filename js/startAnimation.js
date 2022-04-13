const startAnimation = () => {
  gsap.from("nav", {
    opacity: 0,
    duration: 1,
  });

  gsap.from(".header", {
    opacity: 0,
    scale: "0.8",
    duration: 1,
  });
};
