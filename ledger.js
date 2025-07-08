// Function to render table rows
function getFormattedDateTime() {
  const now = new Date();

  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();

  const hours = now.getHours() % 12 || 12;
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const ampm = now.getHours() >= 12 ? "PM" : "AM";

  return `${day}/${month}/${year} at ${hours}:${minutes}:${seconds} ${ampm}`;
}

function renderTable() {
  const shopkeeperNamesList =
    JSON.parse(localStorage.getItem("shopkeeperNamesList")) || [];
  const searchBar = document.querySelector("#searchBar");
  const searchQuery = searchBar ? searchBar.value.toLowerCase() : "";
  const tableBody = document.querySelector("#table_body");
  tableBody.innerHTML = ""; // Clear existing rows

  shopkeeperNamesList.forEach((shopkeeper, index) => {
    // Filter rows if a search query exists
    if (searchQuery && !shopkeeper.name.toLowerCase().includes(searchQuery))
      return;

    const tr = document.createElement("tr");
    tr.setAttribute("data-index", index);

    const tdName = document.createElement("td");
    tdName.textContent = shopkeeper.name;

    const tdBalance = document.createElement("td");
    tdBalance.textContent = shopkeeper.balance;
    tdBalance.style.textAlign = "center"; // center the rate along with the button
    // Append edit button after the balance
    const btnEdit = document.createElement("button");
    btnEdit.textContent = "Edit";
    btnEdit.classList.add("edit-btn");
    // Removed margin-left and center the button
    btnEdit.style.display = "block";
    btnEdit.style.margin = "5px auto";
    btnEdit.setAttribute("data-index", index);
    btnEdit.addEventListener("click", () => handleEdit(index));
    tdBalance.appendChild(btnEdit);

    const btnReceived = document.createElement("button");
    btnReceived.textContent = "Received";
    btnReceived.classList.add("salate-theme-btn");
    btnReceived.setAttribute("data-index", index);

    btnReceived.addEventListener("click", () => handleReceived(index));

    tr.appendChild(tdName);
    tr.appendChild(tdBalance);
    tr.appendChild(btnReceived);

    tableBody.appendChild(tr);
  });
}

// Function to handle the "Received" button click
function handleReceived(index) {
  const shopkeeperNamesList =
    JSON.parse(localStorage.getItem("shopkeeperNamesList")) || [];
  const shopkeeper = shopkeeperNamesList[index];

  const receivedAmount = prompt(
    `Enter amount you received from ${shopkeeper.name}:`
  );
  if (!isNaN(receivedAmount) && receivedAmount.trim() !== "") {
    const amount = parseFloat(receivedAmount);
    if (amount > 0) {
      const oldBalance = parseFloat(shopkeeper.balance).toFixed(2);
      let newBalance = parseFloat(oldBalance) - parseFloat(amount);
      newBalance = newBalance.toFixed(2);
      shopkeeperNamesList[index].balance = parseFloat(newBalance).toFixed(2);

      let whatsAppMessage = `Received At: ${getFormattedDateTime()}
Received From *${shopkeeper.name} Electric Store*
Received: Rs: ${amount}/-
Previous Balance: Rs: ${oldBalance}/-
*Current Balance: Rs: ${newBalance}/-*`;

      navigator.clipboard.writeText(whatsAppMessage);
      whatsAppMessage = encodeURIComponent(whatsAppMessage);
      let phoneNumber = localStorage.getItem("whatsAppNo");
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${whatsAppMessage}`;

      localStorage.setItem(
        "shopkeeperNamesList",
        JSON.stringify(shopkeeperNamesList)
      );
      console.log(whatsAppMessage);
      window.open(whatsappUrl, "_blank");
      renderTable();
    } else {
      alert("Amount must be greater than zero.");
    }
  } else {
    alert(`Error! Invalid amount: ${receivedAmount}`);
  }
}

// New function for editing balance
function handleEdit(index) {
  const shopkeeperNamesList =
    JSON.parse(localStorage.getItem("shopkeeperNamesList")) || [];
  const shopkeeper = shopkeeperNamesList[index];
  const newBalance = prompt(
    `Enter new balance for ${shopkeeper.name}:`,
    shopkeeper.balance
  );
  if (newBalance !== null && newBalance.trim() !== "" && !isNaN(newBalance)) {
    shopkeeperNamesList[index].balance = parseFloat(newBalance);
    localStorage.setItem(
      "shopkeeperNamesList",
      JSON.stringify(shopkeeperNamesList)
    );
    renderTable();
  } else {
    alert("Invalid balance entered.");
  }
}

renderTable();
showBal.addEventListener("click", (e) => {
  let totalBalance = 0;
  JSON.parse(localStorage.getItem("shopkeeperNamesList")).forEach((e) => {
    totalBalance += parseFloat(e.balance);
  });
  let hamburger = document.querySelector(".hamburger");
  hamburger.classList.toggle("active");
  toggleMenu();
  alert(`Total Balance: Rs: ${totalBalance}/-`);
});

const searchBar = document.getElementById("searchBar");
if (searchBar) {
  searchBar.addEventListener("input", renderTable);
}
