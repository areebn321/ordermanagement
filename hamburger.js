const hamburger_container = document.querySelector(".hamburger_container");
const hamburger_line1 = document.querySelector(".hamburger_line1");
const hamburger_line2 = document.querySelector(".hamburger_line2");
const hamburger_line3 = document.querySelector(".hamburger_line3");
hamburger_container.addEventListener("click", () => {
  hamburger_line3.classList.toggle("display_none");
  hamburger_line1.classList.toggle("rotate45");
  hamburger_line2.classList.toggle("rotate135");
  if (hamburger_line3.classList.contains("display_none")) {
    hamburger_container.style.left = "5%";
  } else {
    hamburger_container.style.left = "1%";
  }
  hamBurgerWhenOpen.classList.toggle("hidden");
});
function toggleHamBurgar() {
  hamburger_line3.classList.toggle("display_none");
  hamburger_line1.classList.toggle("rotate45");
  hamburger_line2.classList.toggle("rotate135");
  if (hamburger_line3.classList.contains("display_none")) {
    hamburger_container.style.left = "5%";
  } else {
    hamburger_container.style.left = "1%";
  }
  hamBurgerWhenOpen.classList.toggle("hidden");
}
