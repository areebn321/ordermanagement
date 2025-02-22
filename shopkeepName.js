function createShopkeeperManager() {
  const shopkeeperNamesList =
    JSON.parse(localStorage.getItem("shopkeeperNamesList")) || [];

  function saveShopkeeperName() {
    const shopkeeperNameInput = document.getElementById("shopKeeperName");
    const enteredShopkeeperName = shopkeeperNameInput.value.trim();

    if (enteredShopkeeperName.length > 0) {
      // Check if the name already exists in the list to prevent duplicates
      if (
        shopkeeperNamesList.some(
          (shopkeeper) => shopkeeper.name === enteredShopkeeperName
        )
      ) {
        console.log("This shopkeeper name already exists.");
      } else {
        // Add the new name with a default balance of "0"
        shopkeeperNamesList.push({ name: enteredShopkeeperName, balance: "0" });
        localStorage.setItem(
          "shopkeeperNamesList",
          JSON.stringify(shopkeeperNamesList)
        );

        shopkeeperNameInput.value = ""; // Clear the input field
        displaySavedShopkeeperNames(); // Update the displayed list
      }
    } else {
      alert("Please enter a shopkeeper name.");
    }
  }

  function displaySavedShopkeeperNames(filter = "") {
    const shopkeeperListElement = document.getElementById("shopkeeperList");
    shopkeeperListElement.innerHTML = ""; // Clear existing list
    shopkeeperNamesList
      .filter((shopkeeper) =>
        shopkeeper.name.toLowerCase().startsWith(filter.toLowerCase())
      )
      .forEach((shopkeeper) => {
        const listItem = document.createElement("li");
        listItem.textContent = shopkeeper.name; // Show only the name
        shopkeeperListElement.appendChild(listItem);
      });
  }

  return { saveShopkeeperName, displaySavedShopkeeperNames };
}

const shopkeeperManager = createShopkeeperManager();

/////////////////////////////////////

function displaySavedShopkeeperNames(filter = "") {
  const shopkeeperNamesList =
    JSON.parse(localStorage.getItem("shopkeeperNamesList")) || [];
  const savedNamesDisplayArea = document.getElementById(
    "savedNamesDisplayArea"
  );

  // Clear existing content in the display area
  savedNamesDisplayArea.innerHTML = "";

  // Create and display each shopkeeper's details
  shopkeeperNamesList
    .filter((shopkeeper) =>
      shopkeeper.name.toLowerCase().startsWith(filter.toLowerCase())
    )
    .forEach((shopkeeper) => {
      const nameContainer = document.createElement("div");
      nameContainer.classList.add("shopkeeper-name-item-container");

      const nameElement = document.createElement("div");
      nameElement.textContent = `${shopkeeper.name}`;
      nameElement.classList.add("shopkeeper-name-item");

      const deleteCross = document.createElement("span");
      deleteCross.textContent = "×";
      deleteCross.classList.add("delete-cross");

      // Add click event to set the clicked name as the input's value
      nameElement.addEventListener("click", function () {
        document.getElementById("shopKeeperName").value = shopkeeper.name;
        savedNamesDisplayArea.innerHTML = ""; // Hide the list after selection
      });

      // Add click event to delete the name with confirmation
      deleteCross.addEventListener("click", function (event) {
        event.stopPropagation(); // Prevent triggering the name selection event
        const confirmDelete = confirm(
          `Are you sure you want to delete "${shopkeeper.name}"?`
        );
        if (confirmDelete) {
          deleteShopkeeperName(shopkeeper.name); // Call delete function
        }
      });

      nameContainer.appendChild(nameElement);
      nameContainer.appendChild(deleteCross);
      savedNamesDisplayArea.appendChild(nameContainer);
    });
}

// Function to delete a shopkeeper name from localStorage
function deleteShopkeeperName(nameToDelete) {
  let shopkeeperNamesList =
    JSON.parse(localStorage.getItem("shopkeeperNamesList")) || [];

  // Filter out the name to delete
  shopkeeperNamesList = shopkeeperNamesList.filter(
    (shopkeeper) => shopkeeper.name !== nameToDelete
  );

  // Save the updated list back to localStorage
  localStorage.setItem(
    "shopkeeperNamesList",
    JSON.stringify(shopkeeperNamesList)
  );

  // Update the displayed list
  displaySavedShopkeeperNames();
}

// Ensure the display area exists and place it directly below the input field
const shopkeeperNameInput = document.getElementById("shopKeeperName");
const savedNamesDisplayArea = document.createElement("div");
savedNamesDisplayArea.id = "savedNamesDisplayArea";
savedNamesDisplayArea.classList.add("saved-names-list");
shopkeeperNameInput.parentNode.insertBefore(
  savedNamesDisplayArea,
  shopkeeperNameInput.nextSibling
);

// Initially hide the dropdown (this ensures it's only shown when needed)
savedNamesDisplayArea.style.display = "none";

// Event listener to show shopkeeper names when input is clicked or typed
shopkeeperNameInput.addEventListener("input", function () {
  const filter = shopkeeperNameInput.value.trim();
  displaySavedShopkeeperNames(filter);
  savedNamesDisplayArea.style.display = "block"; // Show the dropdown
});

// Event listener to show all shopkeeper names when input is clicked
shopkeeperNameInput.addEventListener("click", function () {
  displaySavedShopkeeperNames();
  savedNamesDisplayArea.style.display = "block"; // Show the dropdown
});

// Event listener to hide the dropdown if clicked outside of input
document.addEventListener("click", function (event) {
  const shopkeeperNameInput = document.getElementById("shopKeeperName");
  const savedNamesDisplayArea = document.getElementById(
    "savedNamesDisplayArea"
  );
  // Check if the click is outside of the input or dropdown
  if (
    !shopkeeperNameInput.contains(event.target) &&
    !savedNamesDisplayArea.contains(event.target)
  ) {
    savedNamesDisplayArea.style.display = "none"; // Hide the dropdown if clicked outside
  }
});

// Initial display of shopkeeper names on page load
displaySavedShopkeeperNames();

// Add clear button functionality
clearLS.addEventListener("click", function () {
  const confirmClear = confirm("Are you sure you want to clear all data?");
  if (confirmClear) {
    const key = prompt("Enter Key: ");
    if (key === "omhx1hr4xgg") {
      localStorage.clear();
      location.reload();
    }
  }
});
