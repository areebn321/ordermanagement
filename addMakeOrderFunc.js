let shopKeeperNameIn = document.querySelector("#shopKeeperName");
let makeOrderr = document.querySelector("#makeOrder");
makeOrderr.innerHTML = "Nothing to order";
makeOrderr.disabled = true; // Initially disable the button

shopKeeperNameIn.addEventListener("input", (e) => {
  const inputValue = e.target.value.trim();
  const shopkeeperNamesList =
    JSON.parse(localStorage.getItem("shopkeeperNamesList")) || [];

  if (inputValue.length > 1) {
    let isExistingCustomer = shopkeeperNamesList.some(
      (shopkeeper) => shopkeeper.name.toLowerCase() === inputValue.toLowerCase()
    );

    if (isExistingCustomer) {
      makeOrderr.innerHTML = "Make Order";
      makeOrderr.disabled = false;
      console.log("Not Save Customer");
    } else {
      makeOrderr.innerHTML = "Save Customer";
      makeOrderr.disabled = false;
      console.log("Save Customer");
    }
  } else {
    makeOrderr.innerHTML = "Nothing to order";
    makeOrderr.disabled = true;
  }
});
// setTimeout(() => {
savedNamesDisplayArea.addEventListener("click", (e) => {
  console.log(e.target.innerText);
  makeOrderr.innerHTML = "Make Order";
  makeOrderr.disabled = false;
});
// }, 100);
