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

  return `${month}/${day}/${year} at ${hours}:${minutes}:${seconds} ${ampm}`;
}

function renderTable() {
  const shopkeeperNamesList =
    JSON.parse(localStorage.getItem("shopkeeperNamesList")) || [];
  const tableBody = document.querySelector("#table_body");
  tableBody.innerHTML = ""; // Clear existing rows

  shopkeeperNamesList.forEach((shopkeeper, index) => {
    const tr = document.createElement("tr");
    tr.setAttribute("data-index", index);

    const tdName = document.createElement("td");
    tdName.textContent = shopkeeper.name;

    const tdBalance = document.createElement("td");
    tdBalance.textContent = shopkeeper.balance;

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
    const amount = parseInt(receivedAmount);

    if (amount > 0) {
      shopkeeperNamesList[index].balance = Math.max(
        0,
        parseInt(shopkeeper.balance) - amount
      );
      //write a code which send these datailed message to whats app num 923009635061
      let whatsAppMessage = `Received At: ${getFormattedDateTime()}
Received From *${shopkeeper.name}*
Received: Rs: ${amount}/-
Previous Balance: Rs: ${shopkeeper.balance + amount}/-
Current Balance: ${shopkeeper.balance + amount}-${amount}=*Rs: ${
        shopkeeper.balance
      }/-*`;

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

renderTable();
showBal.addEventListener("click", (e) => {
  let totalBalance = 0;
  JSON.parse(localStorage.getItem("shopkeeperNamesList")).forEach((e) => {
    totalBalance += parseInt(e.balance);
  });
  let hamburger = document.querySelector(".hamburger");
  hamburger.classList.toggle("active");
  toggleMenu();
  alert(`Total Balance: Rs: ${totalBalance}/-`);
});
