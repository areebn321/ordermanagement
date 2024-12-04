function saveShopkeeperName() {
  const shopkeeperNameInput = document.getElementById("shopKeeperName");
  const enteredShopkeeperName = shopkeeperNameInput.value.trim();

  if (enteredShopkeeperName.length > 0) {
    // Retrieve existing list of shopkeeper names from localStorage or initialize as an empty array
    let shopkeeperNamesList = JSON.parse(
      localStorage.getItem("shopkeeperNamesList")
    );
    if (!shopkeeperNamesList || !Array.isArray(shopkeeperNamesList)) {
      shopkeeperNamesList = []; // Initialize array if data is missing or incorrect
    }

    // Check if the name already exists in the list to prevent duplicates
    if (shopkeeperNamesList.includes(enteredShopkeeperName)) {
      console.log("This shopkeeper name already exists.");
    } else {
      // Add the new name to the array and save the updated list to localStorage
      shopkeeperNamesList.push(enteredShopkeeperName);
      localStorage.setItem(
        "shopkeeperNamesList",
        JSON.stringify(shopkeeperNamesList)
      );

      // Clear the input field and update the displayed list of names
      shopkeeperNameInput.value = "";
      displaySavedShopkeeperNames();
    }
  } else {
    alert("Please enter a shopkeeper name.");
  }
}

// Function to display all saved shopkeeper names beneath the input field as a dropdown
function displaySavedShopkeeperNames() {
  const shopkeeperNamesList =
    JSON.parse(localStorage.getItem("shopkeeperNamesList")) || [];
  const savedNamesDisplayArea = document.getElementById(
    "savedNamesDisplayArea"
  );

  // Clear existing content in the display area
  savedNamesDisplayArea.innerHTML = "";

  // Create and display each shopkeeper name as a clickable element with a delete cross
  shopkeeperNamesList.forEach((name) => {
    const nameContainer = document.createElement("div");
    nameContainer.classList.add("shopkeeper-name-item-container");

    const nameElement = document.createElement("div");
    nameElement.textContent = name;
    nameElement.classList.add("shopkeeper-name-item");

    const deleteCross = document.createElement("span");
    deleteCross.textContent = "×";
    deleteCross.classList.add("delete-cross");

    // Add click event to set the clicked name as the input's value
    nameElement.addEventListener("click", function () {
      document.getElementById("shopKeeperName").value = name;
      savedNamesDisplayArea.innerHTML = ""; // Hide the list after selection
    });

    // Add click event to delete the name with confirmation
    deleteCross.addEventListener("click", function (event) {
      event.stopPropagation(); // Prevent triggering the name selection event
      const confirmDelete = confirm(
        `Are you sure you want to delete "${name}"?`
      );
      if (confirmDelete) {
        deleteShopkeeperName(name); // Call delete function
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
    (name) => name !== nameToDelete
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

// Event listener to show shopkeeper names when input is clicked
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

clearLS.addEventListener("click", function () {
  // Clear the localStorage data and reload the page to ensure the dropdown is updated
  confirm("Are you sure you want to clear all data?");
  if (confirm) {
    let a = prompt("Enter Key: ");
    if (a == "omhx1hr4xgg") {
      localStorage.clear();
      location.reload();
    }
  }
});
