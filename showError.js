console.log("working");
function checkStockForError() {
  const rawData = JSON.parse(localStorage.getItem("products")) || [];
  // console.log(rawData);
  let length = 0;
  rawData.forEach((e) => {
    // console.log(e);
    e.forEach((product) => {
      product.minStock == null ? length++ : null;
      if (
        Number(product.quantity) <= Number(product.minStock) &&
        Number(product.quantity) != Number(product.minStock)
      ) {
        // console.log(product.name, product.quantity, product.minStock);
        length++;
      } else if (!product.hasOwnProperty("minStock")) {
        length++;
      }
    });
  });

  return length;
}
checkStockForError();

// console.log(checkStockForError());
if (checkStockForError() > 0) {
  showToast(
    "Insufficient Stock <a style='color:#FFFD00 ;text-decoration:underline' href='./stockAlert.html'>Go To Stock Alert</a>",
    "error"
  );
  let insufficientStock = document.querySelector(".insufficientStock");
  insufficientStock.style.display = "flex";
}
let insufficientStock = document.querySelector(".insufficientStock");
insufficientStock.addEventListener("click", () => {
  showToast(
    "Insufficient Stock <a style='color:#FFFD00 ;text-decoration:underline' href='./stockAlert.html'>Go To Stock Alert</a>",
    "error"
  );
});
