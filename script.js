let activeDukanDar;
setTimeout(() => {
  // let sss = document.querySelectorAll(".shopkeeper-name-item-container");
  // console.log(sss);
  // sss.forEach((e) => {
  //   console.log(e);
  //   e.addEventListener("click", (ee) => {
  //     console.log(ee.target);
  //   });
  // });
  let savedNamesDisplayArea = document.getElementById("savedNamesDisplayArea");
  savedNamesDisplayArea.addEventListener("click", (e) => {
    activeDukanDar = e.target.innerText;
  });
}, 2000);
function showWhatsAppWindow() {
  let whatsAppNoParent = document.querySelector(".whatsAppNoParent");
  let whatsAppNoInput = document.querySelector("#whatsAppNoInput");
  let submitWhatsAppNo = document.querySelector("#submitWhatsAppNo");
  let whatsAppNoError = document.querySelector(".whatsAppNoError");
  whatsAppNoInput.value = 92;
  whatsAppNoParent.classList.remove("none");
  submitWhatsAppNo.addEventListener("click", (e) => {
    if (whatsAppNoInput.value.length === 12) {
      whatsAppNoParent.classList.add("none");
      localStorage.setItem("whatsAppNo", whatsAppNoInput.value);
    } else {
      whatsAppNoError.innerHTML = "Please enter a valid WhatsApp number";
      setTimeout(() => {
        whatsAppNoError.innerHTML = "";
      }, 1500);
    }
  });
}
if (!localStorage.getItem("whatsAppNo")) {
  showWhatsAppWindow();
}
function getCurrentDateTime() {
  const now = new Date();
  const hours24 = now.getHours(); // 24-hour format
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Month is 0-based
  const year = now.getFullYear();

  // Convert 24-hour time to 12-hour time with AM/PM
  let hours = hours24 % 12; // Convert to 12-hour format
  hours = hours ? String(hours).padStart(2, "0") : "12"; // 0 should be displayed as 12
  const ampm = hours24 >= 12 ? "PM" : "AM";

  const time = `${hours}:${minutes}:${seconds} ${ampm}`;
  const date = `${day}/${month}/${year}`;

  return { time, date };
}

function showNotification(message) {
  const notification = document.createElement("div");
  notification.className = "notification";
  notification.innerText = message;

  // Add the notification to the body
  document.body.appendChild(notification);

  // Set a timeout to remove the notification after 3 seconds
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

let addCatagoriesWindow = document.querySelector(".addCatagoriesWindow");
let selectedCategoryIndex = 0; // Track the currently selected category

// Initialize products with multiple categories (or load from localStorage)
const products = JSON.parse(localStorage.getItem("products")) || [[]];

// Event listener for adding a product to the currently selected category
document.getElementById("addProductBtn").addEventListener("click", () => {
  addProduct(selectedCategoryIndex);
});

document.getElementById("makeOrder").addEventListener("click", () => {
  if (!localStorage.getItem("whatsAppNo")) {
    showWhatsAppWindow();
  }
  if (shopKeeperName.value.trim().length > 0) {
    makeOrder();
    shopkeeperManager.saveShopkeeperName();

    shopKeeperName.value = "";
  } else {
    showError("Please enter a shopkeeper name");
    // setTimeout(() => {
    //   showError("&ensp;");
    // }, 1000);
  }
});

// Display products from the first category on page load
window.onload = () => {
  renderTables();
};

// When adding a product, store it in the correct category:
function addProduct(categoryIndex = 0) {
  const productName = document.getElementById("productName").value.trim();
  const productQuantity = document.getElementById("productQuantity").value;
  const productPrice = document.getElementById("productPrice").value;

  if (!productName || isNaN(Number(productQuantity)) || !productPrice) {
    showError("Please enter valid product details");
    // setTimeout(() => {
    //   showError("&ensp;");
    // }, 1000);
    return;
  }

  showSuccess("Added Successfully");
  setTimeout(() => {
    showSuccess("&ensp;");
  }, 1000);

  const newProduct = {
    name: productName,
    quantity: Number(productQuantity),
    order: 0,
    price: Number(productPrice),
  };

  // Ensure the category exists or create a new one
  if (!products[categoryIndex]) {
    products[categoryIndex] = [];
  }

  // Add product to the specified category
  products[categoryIndex].push(newProduct);
  localStorage.setItem("products", JSON.stringify(products));
  renderTables();
  resetInputs();
}

// Event listener to switch categories
document.querySelector(".catagories").addEventListener("click", (e) => {
  if (e.target.classList.contains("categoriesChild")) {
    selectedCategoryIndex = Array.from(e.target.parentNode.children).indexOf(
      e.target
    );
    renderTables(); // Display products for the selected category
  }
});

function renderTables() {
  const productMenu = document.getElementById("productMenu");
  const availableMenu = document.getElementById("availableMenu");
  const orderQuantityMenu = document.getElementById("orderQuantity");
  const prodPrice = document.getElementById("prodPrice");

  productMenu.innerHTML = "";
  availableMenu.innerHTML = "";
  orderQuantityMenu.innerHTML = "";
  prodPrice.innerHTML = "";

  const selectedCategoryProducts = products[selectedCategoryIndex] || [];
  selectedCategoryProducts.forEach((product, index) => {
    addProductToTable(
      product.name,
      product.quantity,
      product.order,
      index + 1, // Correct product index
      product.price
    );
  });
}

function addProductToTable(name, quantity, order, index, price) {
  const productMenu = document.getElementById("productMenu");
  const availableMenu = document.getElementById("availableMenu");
  const orderQuantityMenu = document.getElementById("orderQuantity");
  const prodPrice = document.getElementById("prodPrice");

  addRow(prodPrice, "box", price, index, "price", selectedCategoryIndex);
  addRow(productMenu, "box", name, index);
  addRow(availableMenu, "box pieces", quantity, index);
  addOrderQuantityRow(orderQuantityMenu, order, index);
}

// (Rest of your code remains the same...)

function addRow(parent, className, content, index, type = "", categoryIndex) {
  const div = document.createElement("div");
  div.className = className;
  div.dataset.index = index;
  div.innerText = content;

  if (type === "price") {
    div.innerText = "";
    let newDiv = document.createElement("div");
    newDiv.className = "priceCont";
    div.appendChild(newDiv);
    newDiv.innerText = content;

    // Pass categoryIndex to the edit button
    const editBtn = createEditPriceButton(categoryIndex, index);
    div.appendChild(editBtn);
  }

  parent.appendChild(div);
}

function addOrderQuantityRow(parent, order, index) {
  const row = document.createElement("div");
  row.classList.add("box", "orderQuantityBox");

  const minusBtn = createButton("—", index);
  const quantityDiv = createDiv("orderQunatityPieces", order, index);
  const plusBtn = createButton("+", index);
  const plusTenBtn = createButton("+10", index, 10); // +10 button

  const nDiv = document.createElement("div");
  nDiv.appendChild(minusBtn);
  nDiv.appendChild(quantityDiv);
  nDiv.appendChild(plusBtn);
  nDiv.style.display = "flex";
  nDiv.style.alignItems = "center";
  nDiv.style.justifyContent = "center";
  nDiv.classList.add("signsParent");

  const actionContainer = document.createElement("div");
  actionContainer.style.display = "flex";
  actionContainer.style.flexDirection = "column";
  actionContainer.classList.add("flex-centre");

  // Create a new div to contain edit and delete buttons
  const editDeleteContainer = document.createElement("div");
  editDeleteContainer.style.display = "flex";
  // editDeleteContainer.style.gap = "5px"; // Add some space between buttons if needed
  editDeleteContainer.style.flexDirection = "column"; // Add some space between buttons if needed

  const editBtn = createEditButton(index);
  const deleteBtn = createDeleteButton(index);

  editDeleteContainer.append(editBtn, deleteBtn); // Append edit and delete buttons to the new div
  actionContainer.append(editDeleteContainer, plusTenBtn); // Append editDeleteContainer and +10 button to actionContainer

  row.append(nDiv, actionContainer);
  parent.appendChild(row);
}

function createButton(sign, index, increment = 1) {
  const btn = document.createElement("div");
  btn.className = "signs";
  btn.innerText = sign;
  btn.dataset.index = index;

  btn.addEventListener("click", () => {
    const quantityDiv = document.querySelector(
      `.orderQunatityPieces[data-index='${index}']`
    );
    const availableDiv = document.querySelector(
      `.pieces[data-index='${index}']`
    );

    let orderQuantity = Number(quantityDiv.innerText);
    let availableQuantity = Number(availableDiv.innerText);

    if (sign === "—" && orderQuantity > 0) {
      orderQuantity--;
      availableQuantity++;
    } else if (
      (sign === "+" || sign === "+10") &&
      availableQuantity >= increment
    ) {
      orderQuantity += increment;
      availableQuantity -= increment;
    }

    quantityDiv.innerText = orderQuantity;
    availableDiv.innerText = availableQuantity;

    // Update the correct category
    const categoryProducts = products[selectedCategoryIndex];
    categoryProducts[index - 1].order = orderQuantity;
    categoryProducts[index - 1].quantity = availableQuantity;

    // Save to localStorage
    localStorage.setItem("products", JSON.stringify(products));
  });

  return btn;
}

function createDiv(className, content, index) {
  const div = document.createElement("div");
  div.className = className;
  div.dataset.index = index;
  div.innerText = content;
  return div;
}

function createEditButton(index) {
  const btn = document.createElement("div");
  btn.className = "editQuantity";
  btn.innerText = "Edit";
  btn.dataset.index = index;

  btn.addEventListener("click", () => {
    const availableDiv = document.querySelector(
      `.pieces[data-index='${index}']`
    );
    const currentAvailableQuantity = Number(availableDiv.innerText);
    const userInput = prompt(
      "Enter a positive or negative number to adjust the available quantity:"
    );
    const changeInQuantity = Number(userInput);

    if (isNaN(changeInQuantity)) {
      showError("Please enter a valid number.");
      return;
    }

    const newAvailableQuantity = currentAvailableQuantity + changeInQuantity;

    if (newAvailableQuantity >= 0) {
      availableDiv.innerText = newAvailableQuantity;
      products[selectedCategoryIndex][index - 1].quantity =
        newAvailableQuantity;
      localStorage.setItem("products", JSON.stringify(products));
      showSuccess("Quantity updated successfully!");
      setTimeout(() => {
        showSuccess("&ensp;");
      }, 1000);
      renderTables();
    } else {
      showError("Available quantity cannot be negative.");
    }
  });

  return btn;
}

function createDeleteButton(index) {
  const btn = document.createElement("div");
  btn.className = "editQuantity";
  btn.innerText = "Delete";
  btn.style.color = "#ff4500";
  btn.dataset.index = index;

  btn.addEventListener("click", () => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmDelete) {
      const confirmAgain = confirm("Please confirm again to delete.");
      if (confirmAgain) {
        // Adjust the index by subtracting 1 to match the correct product index in the array
        deleteProduct(selectedCategoryIndex, index - 1);
      }
    }
  });

  return btn;
}

function deleteProduct(categoryIndex, productIndex) {
  // Ensure you are modifying the correct category and product index
  if (products[categoryIndex] && products[categoryIndex][productIndex]) {
    products[categoryIndex].splice(productIndex, 1); // Remove the product from the selected category

    // Save the updated products to localStorage
    localStorage.setItem("products", JSON.stringify(products));

    // Re-render the table to reflect the updated products in the selected category
    renderTables();
  }
}

function resetInputs() {
  document.getElementById("productName").value = "";
  document.getElementById("productQuantity").value = "";
  document.getElementById("productPrice").value = "";
}

function makeOrder() {
  let orderDetails = []; // Array to store order details
  let totalAmount = 0;

  // Hardcoded shopkeeper's name
  const shopKeperName = shopKeeperName.value; // Replace with the actual shopkeeper name

  // Get current date and time
  const { time, date } = getCurrentDateTime();

  // Loop through all categories
  products.forEach((categoryProducts) => {
    categoryProducts.forEach((product) => {
      if (product.order > 0) {
        // Include only products with an order quantity greater than 0
        const productTotal = product.order * product.price;
        totalAmount += productTotal; // Add to total amount

        // Add product details to the order summary
        orderDetails.push(
          `${product.name}: ${product.order} pcs @ Rs: ${product.price}/- each = Rs: ${productTotal}/-`
        );

        // After the order, reset only the order quantity to 0
        product.order = 0;
      }
    });
  });

  // Save the updated products with only order quantities reset
  localStorage.setItem("products", JSON.stringify(products));

  if (orderDetails.length === 0) {
    showError("No items in the order.");
    return;
  }

  const orderSummary = orderDetails.join("\n");
  let shopKeeperCityI = shopKeeperCity.value;
  if (shopKeeperCityI.trim() == "") {
    shopKeeperCityI = "Multan";
  } else if (shopKeeperCityI.trim() == "M") {
    shopKeeperCityI = "Muzaffargarh";
  } else if (shopKeeperCityI.trim() == "R") {
    shopKeeperCityI = "Rahim Yar Khan";
  }
  let discount = prompt("Enter Discount in %");
  if (isNaN(Number(discount))) {
    discount = null;
  } else {
    discount = Number(discount);
  }
  let orderMessage;
  console.log(activeDukanDar);

  let orderDukan = JSON.parse(localStorage.getItem("shopkeeperNamesList")).find(
    (item) => item.name === activeDukanDar
  );
  let ch = JSON.parse(localStorage.getItem("shopkeeperNamesList"));
  let num = ch;
  const DukanIndex = ch.findIndex((item) => item.name === activeDukanDar);

  if (Number(discount)) {
    totalAmountWithDiscount = totalAmount - (totalAmount * discount) / 100;

    orderMessage = `${date} at ${time}
*${shopKeperName} Electric Store ${shopKeeperCityI}*
${orderSummary}
Bill: Rs: ${totalAmount}-${discount}%/-
*Total Bill: Rs: ${totalAmountWithDiscount}/-*
*Previous Balance: Rs: ${num[DukanIndex].balance}/-*
*Grand Total: Rs: ${
      parseInt(num[DukanIndex].balance) + totalAmountWithDiscount
    }/-*
`;
    let prvBal = num[DukanIndex].balance;
    num[DukanIndex].balance =
      parseInt(prvBal) + parseInt(totalAmountWithDiscount);

    localStorage.setItem("shopkeeperNamesList", JSON.stringify(num));
  } else {
    // Order message format including both shopkeeper name and a fixed store name
    orderMessage = `${date} at ${time}
*${shopKeperName} Electric Store ${shopKeeperCityI}*
${orderSummary}
*Total Bill: Rs: ${totalAmount}/-*
*Previous Balance: Rs: ${num[DukanIndex].balance}/-*
*Grand Total: Rs: ${parseInt(num[DukanIndex].balance) + totalAmount}/-*
`;
    let prvBal = num[DukanIndex].balance;
    num[DukanIndex].balance = parseInt(prvBal) + parseInt(totalAmount);

    localStorage.setItem("shopkeeperNamesList", JSON.stringify(num));
  }

  // Show notification with order details and total amount
  showNotification(orderMessage);
  console.log(`Order created:\n${orderMessage}`);

  // Copy the order summary to clipboard
  navigator.clipboard
    .writeText(orderMessage)
    .then(() => {
      console.log("Order details copied to clipboard.");
    })
    .catch((err) => {
      console.error("Failed to copy order details to clipboard:", err);
    });

  // Send order via WhatsApp (your phone number added here)
  const phoneNumber = Number(localStorage.getItem("whatsAppNo")); // Your phone number
  const encodedMessage = encodeURIComponent(orderMessage);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  window.open(whatsappUrl, "_blank");

  // Refresh the UI to reflect changes
  shopKeeperCity.value = "";
  renderTables();
}

function createEditPriceButton(categoryIndex, productIndex) {
  const btn = document.createElement("div");
  btn.className = "editPrice";
  btn.innerText = "Edit Price";
  btn.style.color = "#00bfff";
  btn.style.cursor = "pointer";
  btn.dataset.index = productIndex;

  btn.addEventListener("click", () => {
    const newPrice = prompt("Enter the new price for this product:");

    // Validate the new price
    if (newPrice !== null && !isNaN(newPrice) && Number(newPrice) > 0) {
      // Update the product price for the correct category and product index
      products[categoryIndex][productIndex - 1].price = Number(newPrice);

      // Save the updated product list to localStorage
      localStorage.setItem("products", JSON.stringify(products));

      showSuccess("Price updated successfully!");
      setTimeout(() => {
        showSuccess("&ensp;");
      }, 1000);

      // Re-render the tables to reflect the updated price
      renderTables();
    } else {
      showError("Please enter a valid price.");
    }
  });

  return btn;
}

function showSuccess(message) {
  const success = document.getElementById("success");
  success.innerHTML = message;
  success.style.display = "block";
  setTimeout(() => {
    success.style.display = "none";
  }, 1000);
}
function calculateTotalPrice(items) {
  let total = 0;

  // Loop through all item groups
  items.forEach((item) => {
    // Loop through each item in the group
    // itemGroup.forEach((item) => {
    if (item.quantity && item.price) {
      // Ensure the item has valid quantity and price
      total += item.quantity * item.price;
    }
    // });
  });

  return total;
}

showBalance.addEventListener("click", () => {
  let approve = window.confirm("Are you sure you want to show balance?");
  if (approve) {
    let calculateSpecificPrice = prompt("Of Which Category (In Number)");
    calculateSpecificPrice = Number(calculateSpecificPrice) - 1;
    let ll = JSON.parse(localStorage.getItem("products"))[
      calculateSpecificPrice
    ];
    let totalCost = calculateTotalPrice(ll);

    let rsShowP = document.querySelector("#rsShowP");
    rsShowP.innerHTML = "Rs: " + totalCost + "/-";
    rsShow.classList.toggle("none");
    // hamBurgerWhenOpen.classList.toggle("none");
    toggleHamBurgar();
  }
});
let rsShow_btn = document.querySelector(".rsShow_btn");
rsShow_btn.addEventListener("click", () => {
  rsShow.classList.toggle("none");
});
// Function to restore backup from clipboard
async function restoreFromClipboard() {
  toggleHamBurgar();

  try {
    const clipboardText = await navigator.clipboard.readText();

    // Check if the clipboard contains valid JSON
    let parsedData;
    try {
      parsedData = JSON.parse(clipboardText);
    } catch (e) {
      showPopup("Clipboard data is not valid JSON.", "error");
      return;
    }

    // Check if the structure is valid (e.g., products is an array of arrays)
    if (
      Array.isArray(parsedData) &&
      parsedData.every((category) => Array.isArray(category))
    ) {
      products.length = 0; // Clear current products
      products.push(...parsedData); // Restore from clipboard
      localStorage.setItem("products", JSON.stringify(products)); // Save to localStorage
      showPopup("Backup restored successfully.", "success");
      renderTables(); // Re-render the UI
    } else {
      showPopup("Invalid backup structure.", "error");
    }
  } catch (err) {
    showPopup("Failed to access clipboard.", "error");
    console.error(err);
  }
}

// Function to show a popup message (success or error)
function showPopup(message, type) {
  const popup = document.createElement("div");
  popup.className = "popup";
  popup.innerText = message;
  popup.style.backgroundColor = "black";
  // Style the popup based on the message type
  if (type === "error") {
    popup.style.backgroundColor = "rgba(255, 0, 0, 0.8)";
  } else if (type === "success") {
    popup.style.backgroundColor = "rgba(0, 128, 0, 0.8)"; // Green for success
  }

  // Common styles for both types
  popup.style.position = "fixed";
  popup.style.top = "50%";
  popup.style.left = "50%";
  popup.style.transform = "translate(-50%, -50%)";
  popup.style.padding = "20px";
  popup.style.color = "#fff";
  popup.style.fontSize = "16px";
  popup.style.borderRadius = "5px";
  popup.style.zIndex = "9999";

  // Add to the document body
  document.body.appendChild(popup);

  // Automatically remove the popup after 3 seconds
  setTimeout(() => {
    popup.remove();
  }, 3000);
}
changeWhatsAppNo.addEventListener("click", (e) => {
  toggleHamBurgar();
  showWhatsAppWindow();
});

// Button listener for restoring from clipboard
document
  .getElementById("backupRestore")
  .addEventListener("click", restoreFromClipboard);
