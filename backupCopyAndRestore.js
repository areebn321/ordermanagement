backup.addEventListener("click", (e) => {
  navigator.clipboard.writeText(localStorage.getItem("products"));
  toggleHamBurgar();
  showPopup("Copied!");
});
backupRestore.addEventListener("click", (e) => {
  let confirmation = confirm("Are you sure you want to restore backup?");

  if (confirmation === true) {
    navigator.clipboard
      .readText()
      .then(function (text) {
        try {
          let copiedData = JSON.parse(text); // Validate if it's a valid JSON

          // Check if the parsed data matches the expected structure
          if (
            Array.isArray(copiedData) &&
            copiedData.every(
              (item) =>
                typeof item.name === "string" &&
                typeof item.quantity === "number" &&
                typeof item.order === "number"
            )
          ) {
            // If valid, store it in localStorage
            localStorage.setItem("products", JSON.stringify(copiedData));
            showNotification("Backup Restored");
            setTimeout(() => {
              window.location.reload(); // Reload to apply the restored data
            }, 1000);
          } else {
            throw new Error("Invalid product structure");
          }
        } catch (error) {
          // console.error("Error restoring backup: ", error);
          showNotification("Failed to restore backup: Invalid data");
        }
      })
      .catch(function (err) {
        // console.error("Failed to read clipboard contents: ", err);
        showNotification("Failed to read clipboard contents");
      });
  }
});
