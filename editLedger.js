editLedger.addEventListener("click", (e) => {
  let fprom = prompt("Enter Shopkeeper Number (For Change Balance): ");
  fprom.placeholder = "Enter Shopkeeper Number (For Change Balance): ";
  if (typeof parseInt(fprom) == "number") {
    let pprice = prompt("Enter Balance");

    if (typeof parseInt(pprice) == "number") {
      let numnum = parseInt(fprom) - 1;
      let savdata = JSON.parse(localStorage.getItem("shopkeeperNamesList"));
      let ddata = JSON.parse(localStorage.getItem("shopkeeperNamesList"));
      ddata[numnum].balance = parseInt(pprice);
      localStorage.setItem("shopkeeperNamesList", JSON.stringify(ddata));
      window.location.reload();
    }
  } else {
    console.log("Nikalll");
  }
});
