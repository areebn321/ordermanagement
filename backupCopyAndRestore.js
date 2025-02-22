backup.addEventListener("click", (e) => {
  console.log(localStorage.valueOf());
  navigator.clipboard
    .writeText(JSON.stringify(localStorage))
    .then(() => {
      toggleHamBurgar();
      showPopup("Copied!");
    })
    .catch(() => {
      showNotification("Failed to copy backup");
    });
});

backupRestore.addEventListener("click", async (e) => {
  let confirmation = confirm("Do you sure to restore backup?");

  if (!confirmation) return;

  let confirmation2 = confirm("Do you Really want to restore backup❓");
  if (!confirmation2) return;
  try {
    let text = await navigator.clipboard.readText();
    console.log("Clipboard content:", text);

    let data = JSON.parse(text);
    console.log("Parsed data:", data);

    if (typeof data === "object" && data !== null) {
      for (const key in data) {
        localStorage.setItem(key, data[key]);
      }
      showPopup("Backup restored successfully!", "success");
      window.location.reload();
    } else {
      throw new Error("Invalid data");
    }
  } catch (error) {
    showPopup("Failed to restore backup: Invalid data", "error");
  }

  toggleHamBurgar();
});
