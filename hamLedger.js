function toggleHam(element) {
  element.classList.toggle("active");
  // let hamburger = document.querySelector(".hamburger");
  // hamburger.classList.toggle("active");
  toggleMenu();
}
function toggleMenu() {
  let btnsWindow = document.querySelector(".btnsWindow");
  btnsWindow.classList.toggle("toggleMenuCss");
  console.log(btnsWindow);
}
