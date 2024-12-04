const addProductWithScreen = document.querySelector(".addProductWithScreen");
addProductBtnHam.addEventListener("click", (e) => {
  addProductWithScreen.classList.toggle("hidden");
  toggleHamBurgar();
});
cancelProductBtn.addEventListener("click", (e) => {
  addProductWithScreen.classList.toggle("hidden");
});
