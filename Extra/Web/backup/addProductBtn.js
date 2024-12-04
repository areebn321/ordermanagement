addProductBtn.addEventListener("click", () => {
  console.log("hi");
  let productName = document.getElementById("productName").value;
  let productQuantity = document.getElementById("productQuantity").value;
  if (productName.trim() == "") {
    error.innerText = "Please enter a valid product name";
  } else if (isNaN(Number(productQuantity))) {
    error.innerText = "Please enter a valid product quantity";
  } else {
    error.style.color = "#24ff78";
    error.innerHTML = "Added Successfully";
    setTimeout(() => {
      error.innerHTML = "&ensp;";
    }, 1500);
  }
  addProductToTable(productName, productQuantity);
  document.getElementById("productName").value = "";
  document.getElementById("productQuantity").value = "";
});
function addProductToTable(productName, productQuantity) {
  let signs = document.querySelectorAll(".signs");
  let pieces = document.querySelectorAll(".pieces");
  let orderQunatityPieces = document.querySelectorAll(".orderQunatityPieces");
  let productMenu = document.querySelector(".productMenu");
  let availableMenu = document.querySelector(".availableMenu");
  tookSigns();
  changePieces();
  console.log(productMenu.childElementCount);

  let firstDiv = document.createElement("div");
  firstDiv.classList.add("box");
  firstDiv.setAttribute("data-index", productMenu.childElementCount + 1);
  firstDiv.innerHTML = productName;
  productMenu.appendChild(firstDiv);

  let secondDiv = document.createElement("div");
  secondDiv.classList.add("box");
  secondDiv.setAttribute("data-index", availableMenu.childElementCount + 1);
  secondDiv.innerHTML = productQuantity;
  availableMenu.appendChild(secondDiv);
  let orderQuantity = document.querySelector(".orderQuantity");
  let thirdDiv = document.createElement("div");
  thirdDiv.classList.add("box");
  thirdDiv.classList.add("orderQuantityBox");
  let forthDiv = document.createElement("div");
  forthDiv.classList.add("signs");
  forthDiv.setAttribute("data-index", productMenu.childElementCount + 1);
  forthDiv.innerHTML = "—";
  let fifthDiv = document.createElement("div");
  fifthDiv.classList.add("orderQunatityPieces");
  fifthDiv.setAttribute("data-index", productMenu.childElementCount + 1);
  fifthDiv.innerHTML = 0;
  let sixthDiv = document.createElement("div");
  sixthDiv.classList.add("signs");
  sixthDiv.setAttribute("data-index", productMenu.childElementCount + 1);
  sixthDiv.innerHTML = "+";
  thirdDiv.appendChild(forthDiv);
  thirdDiv.appendChild(fifthDiv);
  thirdDiv.appendChild(sixthDiv);
  orderQuantity.appendChild(thirdDiv);
  tookSigns();
  changePieces();
}
