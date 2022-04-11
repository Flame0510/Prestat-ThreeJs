let isMobile = false;

const checkMobile = () => (
  (isMobile = window.matchMedia("only screen and (max-width: 760px)").matches),
  console.log(isMobile)
);

checkMobile();
