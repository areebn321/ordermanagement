function showMakeOrderError(error) {
  const makeOrderError = document.getElementById("makeOrderError");
  makeOrderError.textContent = error;
  setTimeout(() => {
    makeOrderError.innerHTML = "&nbsp;";
  }, 1500);
}
function formatWithCommas(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function updateTotal() {
  const nestedProducts = JSON.parse(localStorage.getItem("products")) || [];
  const products = nestedProducts.flat();
  const productsToPurchase = products.filter(
    (product) => product.purchasedCount > 0
  );
  let total = 0;
  productsToPurchase.forEach((product) => {
    total += product.purchasedValue * product.purchasedCount;
  });
  totalBill.textContent = formatWithCommas(Number(total).toFixed(2));
}

function addPurchaseValue() {
  if (!localStorage.getItem("products")) {
    alert("No products found");
    return;
  }
  const products = JSON.parse(localStorage.getItem("products"));
  products.forEach((ee) => {
    ee.forEach((e) => {
      if (!e.purchasedValue) {
        let val;
        while (true) {
          val = prompt("Enter the value of " + e.name);
          if (parseFloat(val)) {
            e.purchasedValue = parseFloat(val);
            e.purchasedCount = 0;
            localStorage.setItem("products", JSON.stringify(products));
            break;
          } else {
            alert("Please enter a valid number");
          }
        }
      }
    });
  });
}

let activeCategory = 0;

function showTable(selectIndex = 0) {
  const tbody = document.querySelector("tbody");
  tbody.innerHTML = "";
  const products = JSON.parse(localStorage.getItem("products"));
  const foundCategory = products[selectIndex];

  let i = 0;
  for (const element of foundCategory) {
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    let td5 = document.createElement("td");
    let editBtn = document.createElement("button");
    td1.classList.add("table-cell");
    td2.classList.add("table-cell");
    td3.classList.add("table-cell");
    td3.classList.add("quantity");
    td4.classList.add("table-cell");
    td5.classList.add("table-cell");
    editBtn.textContent = "Edit";
    editBtn.classList.add("edit-btn");
    editBtn.setAttribute("data-index", i);

    editBtn.addEventListener("click", (e) => {
      let a = products[selectIndex][e.target.getAttribute("data-index")];
      let pr = prompt("Enter the new value of " + a.name);
      if (parseFloat(pr)) {
        a.purchasedValue = parseFloat(pr);
        products[selectIndex][e.target.getAttribute("data-index")] = a;
        localStorage.setItem("products", JSON.stringify(products));
        showTable(selectIndex);
      } else {
        alert("Please enter a valid number");
      }
      updateTotal();
    });

    let btn1 = document.createElement("button");
    let btn2 = document.createElement("button");
    let btn3 = document.createElement("button");
    let btn4 = document.createElement("button");
    let btn5 = document.createElement("button");
    btn1.setAttribute("data-index", i);
    btn2.setAttribute("data-index", i);
    btn3.setAttribute("data-index", i);
    btn4.setAttribute("data-index", i);
    btn5.setAttribute("data-index", i);
    i++;
    td1.innerText = element.name;
    td2.innerText = element.purchasedValue;
    td3.innerText = element.purchasedCount;
    btn1.innerText = "+";
    btn2.innerText = "-";
    btn3.innerText = "+12";
    btn4.innerText = "-12";
    btn5.innerText = "Zero";
    btn1.classList.add("btn");
    btn2.classList.add("btn");
    btn3.classList.add("btn");
    btn4.classList.add("btn");
    btn5.classList.add("btn");

    btn1.addEventListener("click", (e) => {
      element.purchasedCount++;
      td3.innerText = element.purchasedCount;
      // console.log(products);
      products[selectIndex][Number(e.target.getAttribute("data-index"))] =
        element;
      // console.log(products);
      localStorage.setItem("products", JSON.stringify(products));
      updateTotal();
    });
    btn2.addEventListener("click", (e) => {
      if (element.purchasedCount > 0) {
        element.purchasedCount--;
        td3.innerText = element.purchasedCount;
        products[selectIndex][Number(e.target.getAttribute("data-index"))] =
          element;
        localStorage.setItem("products", JSON.stringify(products));
        updateTotal();
      }
    });
    btn3.addEventListener("click", (e) => {
      element.purchasedCount += 12;
      td3.innerText = element.purchasedCount;
      products[selectIndex][Number(e.target.getAttribute("data-index"))] =
        element;
      localStorage.setItem("products", JSON.stringify(products));
      updateTotal();
    });
    btn4.addEventListener("click", (e) => {
      if (element.purchasedCount >= 12) {
        element.purchasedCount -= 12;
        td3.innerText = element.purchasedCount;
        products[selectIndex][Number(e.target.getAttribute("data-index"))] =
          element;
        localStorage.setItem("products", JSON.stringify(products));
        updateTotal();
      }
    });
    btn5.addEventListener("click", (e) => {
      element.purchasedCount = 0;
      td3.innerText = element.purchasedCount;
      products[selectIndex][Number(e.target.getAttribute("data-index"))] =
        element;
      localStorage.setItem("products", JSON.stringify(products));
      updateTotal();
    });
    td4.appendChild(btn1);
    td4.appendChild(btn2);
    td4.appendChild(btn3);
    td4.appendChild(btn4);
    td4.appendChild(btn5);
    td5.appendChild(editBtn);

    tr.append(td1, td2, td3, td4, td5);
    tbody.append(tr);
  }
}
let selectedCategory = 0;
function showCategory() {
  const category = JSON.parse(localStorage.getItem("catagories"));

  const categoriesContainer = document.querySelector(".categories");
  categoriesContainer.innerHTML = "<h1>Categories</h1>";

  category.forEach((element, i) => {
    if (i <= JSON.parse(localStorage.getItem("products")).length - 1) {
      const button = document.createElement("button");
      button.classList.add("design-btn");
      button.textContent = element;
      button.setAttribute("data-index", i);
      button.addEventListener("click", () => {
        document
          .querySelectorAll(".design-btn")
          .forEach((btn) => btn.classList.remove("activeCategory"));
        button.classList.add("activeCategory");
        showTable(i);
      });
      categoriesContainer.appendChild(button);
    }
  });

  // Activate the first category by default
  const firstCategoryButton = categoriesContainer.querySelector(".design-btn");
  if (firstCategoryButton) {
    firstCategoryButton.classList.add("activeCategory");
    showTable(0);
  }
}

makeOrder.addEventListener("click", (e) => {
  const nestedProducts = JSON.parse(localStorage.getItem("products")) || [];
  const products = nestedProducts.flat();
  const productsToPurchase = products.filter(
    (product) => product.purchasedCount > 0
  );

  if (productsToPurchase.length > 0) {
    console.log("Order Summary:");
    let summaryForSeller = "";
    let summaryForCustomer = "";
    productsToPurchase.forEach((product) => {
      const purchasePrice = product.purchasedValue * product.purchasedCount;

      summaryForSeller += `${product.name}: ${product.purchasedCount} pcs \n`;

      summaryForCustomer += `${product.name}: ${
        product.purchasedCount
      } pcs @ Rs:${product.purchasedValue}/- each = Rs:${purchasePrice.toFixed(
        2
      )}/- \n`;
      product.purchasedCount = 0;
    });
    navigator.clipboard.writeText(summaryForCustomer);

    const phoneNumber = Number(localStorage.getItem("whatsAppNo"));
    const encodedMessage = encodeURIComponent(summaryForSeller);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");

    console.log(summaryForSeller);
    console.log(summaryForCustomer);
    localStorage.setItem("products", JSON.stringify(nestedProducts));
    showTable();
  } else {
    console.log("No products with purchasedCount greater than one.");
    showMakeOrderError("Not a single product with quantity greater than one.");
  }
  updateTotal();
});

console.log(selectedCategory);
