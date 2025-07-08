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
      makeOrderr.innerHTML = `
       <div class="makeOrder-svg-wrapper-1">
              <div class="makeOrder-svg-wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path
                    fill="currentColor"
                    d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                  ></path>
                </svg>
              </div>
            </div>
            <span>Send</span>
      `;
      makeOrderr.disabled = false;
      console.log("Not Save Customer");
    } else {
      //  <button class="save-btn" title="Save">
      makeOrderr.innerHTML = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40px"
    height="40px"
    viewBox="0 -0.5 25 25" 
    class="save-icon"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M18.507 19.853V6.034C18.5116 5.49905 18.3034 4.98422 17.9283 4.60277C17.5532 4.22131 17.042 4.00449 16.507 4H8.50705C7.9721 4.00449 7.46085 4.22131 7.08577 4.60277C6.7107 4.98422 6.50252 5.49905 6.50705 6.034V19.853C6.45951 20.252 6.65541 20.6407 7.00441 20.8399C7.35342 21.039 7.78773 21.0099 8.10705 20.766L11.907 17.485C12.2496 17.1758 12.7705 17.1758 13.113 17.485L16.9071 20.767C17.2265 21.0111 17.6611 21.0402 18.0102 20.8407C18.3593 20.6413 18.5551 20.2522 18.507 19.853Z"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></path>
  </svg>
  <span class="save-text">Save Customer</span>
  
  `;
      // </button>
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
  makeOrderr.innerHTML = `
  <div class="makeOrder-svg-wrapper-1">
         <div class="makeOrder-svg-wrapper">
           <svg
             xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 24 24"
             width="24"
             height="24"
           >
             <path fill="none" d="M0 0h24v24H0z"></path>
             <path
               fill="currentColor"
               d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
             ></path>
           </svg>
         </div>
       </div>
       <span>Send</span>
 `;
  makeOrderr.disabled = false;
});
// }, 100);
