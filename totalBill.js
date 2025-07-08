let totalBill = document.querySelector("#totalBill");
let totalBillSpan = document.querySelector("#totalBillSpan");

document.body.addEventListener("click", function () {
  let local = JSON.parse(localStorage.getItem("products"));

  let total = local.reduce((acc, items) => {
    console.log("Processing items array:", items);
    // Filter items with order > 0
    const filteredItems = items.filter((item) => item.order > 0);

    const itemTotal = filteredItems.reduce((sum, item) => {
      return sum + item.price * item.order;
    }, 0);

    return acc + itemTotal;
  }, 0);

  totalBillSpan.innerHTML = total;
});
