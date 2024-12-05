function toggleHam(element) {
  element.classList.toggle("active");
  toggleMenu();
}
function toggleMenu() {
  let btnsWindow = document.querySelector(".btnsWindow");
  btnsWindow.classList.toggle("toggleMenuCss");
  console.log(btnsWindow);
}
