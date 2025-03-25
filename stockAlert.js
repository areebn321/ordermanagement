console.log("stockAlert.js");

function updateMinStock() {
  const rawData = JSON.parse(localStorage.getItem("products")) || [];
  const normalizedData = Array.isArray(rawData[0]) ? rawData : [rawData];
  const products = normalizedData.flat();
  products.forEach((product) => {
    if (product.minStock === undefined || product.minStock === null) {
      let minStock;
      do {
        minStock = prompt(
          `Enter minimum stock for product "${product.name}" (must be 0 or more):`
        );
        if (minStock === null) continue;
        minStock = Number(minStock);
      } while (isNaN(minStock) || minStock < 0);

      product.minStock = minStock;
    }
  });

  // Save updated products back to local storage
  const updatedData = normalizedData.map((group) =>
    group.map(
      (product) => products.find((p) => p.name === product.name) || product
    )
  );
  localStorage.setItem("products", JSON.stringify(updatedData));
}

function calculateTotalBill() {
  const rawData = JSON.parse(localStorage.getItem("products")) || [];
  const normalizedData = Array.isArray(rawData[0]) ? rawData : [rawData]; // Ensure rawData is an array of arrays

  const totalBillElement = document.getElementById("totalBill");
  const totalBillCategoryElement = document.getElementById("totalBillCategory");

  let totalBill = 0;
  let totalBillCategory = 0;
  console.log(normalizedData);
  // Calculate total bill for all categories
  normalizedData.forEach((category) => {
    category.forEach((product) => {
      const difference = product.minStock - product.quantity;
      if (difference > 0) {
        totalBill += difference * product.purchasedValue;
      }
    });
  });

  const activeCategoryIndex = document
    .querySelector(".activeCategory")
    .getAttribute("data-index");
  console.log(activeCategoryIndex);
  if (activeCategoryIndex !== null && activeCategoryIndex !== undefined) {
    console.log(normalizedData[activeCategoryIndex]);
    const selectedCategory = normalizedData[activeCategoryIndex];
    selectedCategory.forEach((product) => {
      const difference = product.minStock - product.quantity;
      if (difference > 0) {
        totalBillCategory += difference * product.purchasedValue;
      }
    });
  }

  totalBillElement.textContent = totalBill.toFixed(2);
  totalBillCategoryElement.textContent = totalBillCategory.toFixed(2);
}

function showCategory() {
  const category = JSON.parse(localStorage.getItem("catagories"));
  console.log(category);
  const categoriesContainer = document.querySelector(".categories");
  categoriesContainer.innerHTML = "<h1>Categories</h1>";

  category.forEach((element, i) => {
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
  });

  const firstCategoryButton = categoriesContainer.querySelector(".design-btn");
  if (firstCategoryButton) {
    firstCategoryButton.classList.add("activeCategory");
  }

  categoriesContainer.addEventListener("click", () => {
    calculateTotalBill();
    console.log("clicked");
    if (showAllProducts.innerHTML == "Show all Products") {
      // toggleAllProducts();
    }
  });
}

function highlightLowStockCategories() {
  const rawData = JSON.parse(localStorage.getItem("products")) || [];
  const normalizedData = Array.isArray(rawData[0]) ? rawData : [rawData]; // Ensure rawData is an array of arrays

  const categoryButtons = document.querySelectorAll(".design-btn");

  normalizedData.forEach((category, index) => {
    const hasLowStock = category.some(
      (product) => product.quantity < product.minStock
    );

    const categoryButton = categoryButtons[index];
    if (categoryButton) {
      const isActive = categoryButton.classList.contains("activeCategory");

      if (hasLowStock && isActive) {
        categoryButton.classList.add("min");
        categoryButton.classList.add("activeCategory"); // Ensure both classes are applied
      } else if (hasLowStock) {
        categoryButton.classList.add("min");
        categoryButton.classList.remove("activeCategory");
      } else {
        categoryButton.classList.remove("min");
      }
    }
  });
}

function toggleAllProducts() {
  const button = document.getElementById("showAllProducts");
  const table = document.querySelector("table");
  const rawData = JSON.parse(localStorage.getItem("products")) || [];
  const normalizedData = Array.isArray(rawData[0]) ? rawData : [rawData]; // Ensure rawData is an array of arrays

  const activeCategoryIndex = document
    .querySelector(".activeCategory")
    ?.getAttribute("data-index");

  if (button.textContent === "Show all Products") {
    button.textContent = "Hide all Products";

    // Clear existing table rows
    const existingTbody = table.querySelector("tbody");
    if (existingTbody) {
      table.removeChild(existingTbody);
    }

    // Create a new tbody and populate it with all products of the selected category
    const tbody = document.createElement("tbody");
    if (activeCategoryIndex !== null && activeCategoryIndex !== undefined) {
      const category = normalizedData[activeCategoryIndex];
      category.forEach((product) => {
        const row = document.createElement("tr");

        const name = document.createElement("td");
        const availableStock = document.createElement("td");
        const minStock = document.createElement("td");
        const action = document.createElement("td");

        name.textContent = product.name;
        availableStock.textContent = product.quantity;
        minStock.textContent = product.minStock;

        const button = document.createElement("button");
        button.textContent = "Edit MinStock";
        button.addEventListener("click", () => {
          const newMinStock = prompt(
            `Enter the new minimum stock for ${product.name}:`
          );
          if (!isNaN(newMinStock) && newMinStock !== null) {
            product.minStock = parseInt(newMinStock);
            localStorage.setItem("products", JSON.stringify(rawData));
            toggleAllProducts(); // Refresh the table
          }
        });

        action.appendChild(button);

        row.appendChild(name);
        row.appendChild(availableStock);
        row.appendChild(minStock);
        row.appendChild(action);

        tbody.appendChild(row);
      });
    }

    table.appendChild(tbody);
  } else {
    button.textContent = "Show all Products";

    // Clear the table and show only products where minStock > quantity
    const existingTbody = table.querySelector("tbody");
    if (existingTbody) {
      table.removeChild(existingTbody);
    }

    const tbody = document.createElement("tbody");
    if (activeCategoryIndex !== null && activeCategoryIndex !== undefined) {
      const category = normalizedData[activeCategoryIndex];
      category.forEach((product) => {
        if (product.minStock > product.quantity) {
          const row = document.createElement("tr");

          const name = document.createElement("td");
          const availableStock = document.createElement("td");
          const minStock = document.createElement("td");
          const action = document.createElement("td");

          name.textContent = product.name;
          availableStock.textContent = product.quantity;
          minStock.textContent = product.minStock;

          const button = document.createElement("button");
          button.textContent = "Edit MinStock";
          button.addEventListener("click", () => {
            const newMinStock = prompt(
              `Enter the new minimum stock for ${product.name}:`
            );
            if (!isNaN(newMinStock) && newMinStock !== null) {
              product.minStock = parseInt(newMinStock);
              localStorage.setItem("products", JSON.stringify(rawData));
              toggleAllProducts(); // Refresh the table
            }
          });

          action.appendChild(button);

          row.appendChild(name);
          row.appendChild(availableStock);
          row.appendChild(minStock);
          row.appendChild(action);

          tbody.appendChild(row);
        }
      });
    }

    table.appendChild(tbody);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  updateMinStock();
  setTimeout(() => {
    calculateTotalBill();
    highlightLowStockCategories(); // Highlight categories with low stock
  }, 1000);

  document.querySelector(".categories").addEventListener("click", (event) => {
    if (event.target.classList.contains("design-btn")) {
      // Show only products with minStock > quantity for the selected category
      showTable(event.target.getAttribute("data-index"));
      highlightLowStockCategories(); // Recheck when a category is clicked
    }
  });

  document
    .getElementById("showAllProducts")
    .addEventListener("click", toggleAllProducts);
});
