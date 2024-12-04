editCatagories.addEventListener("click", (e) => {
  if (
    localStorage.getItem("catagories") != undefined ||
    localStorage.getItem("catagories") != null
  ) {
    toggleHamBurgar();

    let selectedCategory = Number(prompt("Enter Category Number")); //Taking category NUmber //1
    let catagoriesAvailable = JSON.parse(localStorage.getItem("catagories")); //Getting Array of Categories ["Faster FF","2nd"]
    console.log(catagoriesAvailable, selectedCategory);
    let changeCatagoryName = prompt("Enter Category Name"); //Taking Category changing name
    console.log(changeCatagoryName);
    catagoriesAvailable[selectedCategory - 1] = changeCatagoryName; //Doing Category Change
    console.log(catagoriesAvailable);
    console.log(changeCatagoryName);
    localStorage.setItem("catagories", JSON.stringify(catagoriesAvailable)); //Setting To LS
    window.location.reload();
  }
});
