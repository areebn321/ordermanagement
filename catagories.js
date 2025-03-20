console.log("Catagories Running...");
let catagoriesDiv = document.querySelector(".catagories");
catagoriesDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("categoriesChild")) {
    let categoriesChild = document.querySelectorAll(".categoriesChild");

    categoriesChild.forEach((element) => {
      element.classList.remove("isActiveCategory");
    });

    e.target.classList.add("isActiveCategory");

    // Get the selected category index and display only products in that category
    const selectedCatagoryIndex = Array.from(categoriesChild).indexOf(e.target);
    showProductsInCatagory(selectedCatagoryIndex);
  }
});

// let addCatagoriesWindow = document.querySelector(".addCatagoriesWindow");

function toogleAddCatagoriesWindow() {
  catagoriesInput.value = "";
  addCatagoriesWindow.classList.toggle("hidden");
}

// Event listeners for adding and canceling catagories
addCatagories.addEventListener("click", (e) => {
  console.log("addCatagories Running...");
  toggleHamBurgar();
  toogleAddCatagoriesWindow();
});

cancelCatagoriesBtn.addEventListener("click", (e) => {
  console.log("cancelCatagoriesBtn Running...");
  toogleAddCatagoriesWindow();
});

addCatagoriesBtn.addEventListener("click", (e) => {
  setCatagoriesToLS(catagoriesInput.value);
});

function getCatagoriesFromLS() {
  return JSON.parse(localStorage.getItem("catagories"));
}

function showCatagoriesFromLS() {
  let catagories = JSON.parse(localStorage.getItem("catagories")) || [];
  let catagoriesDiv = document.querySelector(".catagories");
  catagoriesDiv.innerHTML = "";

  // Display each catagory and highlight the first catagory as active
  catagories.forEach((catagory, index) => {
    const catagoryClass =
      index === 0 ? "isActiveCategory categoriesChild" : "categoriesChild";
    catagoriesDiv.innerHTML += `<div class="${catagoryClass}">${catagory}</div>`;
  });
}
function promptForFirstCategory() {
  // alert("Please add your first category to get started!");
  toogleAddCatagoriesWindow();
}

// Initialize catagories on page load
// Initialize categories on page load
if (getCatagoriesFromLS()?.length > 0) {
  showCatagoriesFromLS();
} else {
  // No categories found, prompt user to create one
  promptForFirstCategory();
}

// Function to add catagories to localStorage
function setCatagoriesToLS(catagory) {
  if (catagory.trim().length < 2) return; // Ensure category name is valid

  let catagories = getCatagoriesFromLS() || [];
  catagories.push(catagory);
  localStorage.setItem("catagories", JSON.stringify(catagories));

  toogleAddCatagoriesWindow();
  showCatagoriesFromLS();

  // Automatically select the first category if it's the first one added
  if (catagories.length === 1) {
    showProductsInCatagory(0);
  }
}
// Event listener for catagory switching
let catagories = document.querySelector(".catagories");
catagories.addEventListener("click", (e) => {
  let categoriesChild = document.querySelectorAll(".categoriesChild");

  categoriesChild.forEach((element) => {
    element.classList.remove("isActiveCategory");
  });

  e.target.classList.add("isActiveCategory");

  // Get the selected catagory index and display only products in that catagory
  const selectedCatagoryIndex = Array.from(categoriesChild).indexOf(e.target);
  localStorage.setItem("selectedCatagoryIndex", selectedCatagoryIndex);
  showProductsInCatagory(selectedCatagoryIndex);
});

// Function to display products only in the selected catagory
function showProductsInCatagory(catagoryIndex) {
  // Ensure 'products' array has space for each catagory
  if (!products[catagoryIndex]) products[catagoryIndex] = [];
  // Add your logic to display products in the selected category
}

// Retrieve the selected category index from local storage and set the active category
document.addEventListener("DOMContentLoaded", () => {
  const selectedCatagoryIndex = localStorage.getItem("selectedCatagoryIndex");
  if (selectedCatagoryIndex !== null) {
    let categoriesChild = document.querySelectorAll(".categoriesChild");
    if (categoriesChild[selectedCatagoryIndex]) {
      // Simulate click to both select and open the category properly.
      categoriesChild[selectedCatagoryIndex].click();
    }
  }
});
