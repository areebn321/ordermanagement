const passwordOverlay = document.getElementById("passwordOverlay");
const passwordInput = document.getElementById("passwordInput");
const passwordSettings = {
  zah2nv2fydclcmb: 3, // 3 days
  zh98wvtk90q86uy: 5, // 5 days
  vvci24769v8xa6q: 30, // 1 month (30 days)
  p1e20y5c4k4k4ui: 60, // 2 months (60 days)
  dpc7grblkuj3xpv: Infinity, // Lifetime
  epgchy869bcsfy0: 5 / (24 * 60), // 5 minutes
  adclzg6x0xkz2t7: 1 / (24 * 60 * 60), // 60 seconds
  hcsdbqvqit5ffrf: 0.5 / (24 * 60), // 30 sec
};
// reply by password
const passArr = [
  "3 Days",
  "5 Days",
  "1 Month",
  "2 Months",
  "Lifetime",
  "5 Minutes",
  "1 Minute",
  "30 Seconds",
];

function calculateTimeInMs(timestampString, days) {
  const baseTime = parseInt(timestampString, 10); // Parse the timestamp string to an integer
  const daysInMs = days * 24 * 60 * 60 * 1000; // Convert days to milliseconds
  return baseTime + daysInMs; // Add the days to the base timestamp
}

function hasReachedLimit(currentTimeMs, timeLimitMs) {
  return currentTimeMs >= timeLimitMs;
}
if (hasReachedLimit(localStorage.getItem("expireDate"), Date.now())) {
  console.log("Abhi Mazy Kroo");
  passwordOverlay.style.display = "none";
} else {
  console.log("Mazy Khatam ____");
  passwordOverlay.style.display = "flex";
}
console.log(hasReachedLimit(localStorage.getItem("expireDate"), Date.now()));
const submitButton = document.getElementById("submitButton");
submitButton.addEventListener("click", (e) => {
  // console.log(passwordInput.value);
  checkPassword(passwordInput.value);
});
function checkPassword(password) {
  let daysToActive = passwordSettings[password];
  if (!localStorage.getItem(password) && daysToActive) {
    const keys = Object.keys(passwordSettings);
    // console.log();
    const index = keys.indexOf(password);
    alert(`Congragulations! You Have Access For ${passArr[index]}`);
    localStorage.setItem(password, Date.now());
    localStorage.setItem("dateNow", Date.now());
    passwordOverlay.style.display = "none";
    localStorage.setItem(
      "expireDate",
      calculateTimeInMs(Date.now(), passwordSettings[password])
    );
  } else {
    if (localStorage.getItem(password)) {
      alert("Password Is Already Used");
    } else {
      alert("Please enter a valid password");
    }
  }
}
// function getTimeRemaining(password) {
//   const entryTime = localStorage.getItem(password); // Get the time when the password was entered
//   if (entryTime) {
//     const timeElapsed = (Date.now() - entryTime) / (1000 * 60 * 60 * 24); // Time difference in days
//     return passwordSettings[password] - timeElapsed;
//   }
//   return passwordSettings[password]; // If no time stored, assume full validity
// }

// function checkPassword() {
//   const enteredPassword = passwordInput.value.trim();

//   if (passwordSettings[enteredPassword]) {
//     const remainingTime = getTimeRemaining(enteredPassword);

//     if (remainingTime > 0) {
//       alert(`Access granted! You have ${Math.round(remainingTime)} days left.`);
//       localStorage.setItem(enteredPassword, Date.now()); // Store the password entry time
//       passwordOverlay.style.display = "none"; // Hide the overlay
//     } else {
//       alert("Your access has expired.");
//       passwordOverlay.style.display = "flex"; // Keep showing overlay until valid
//     }
//   } else {
//     alert("Incorrect password.");
//   }
// }

// submitButton.addEventListener("click", checkPassword);

// // Check if the user has previously entered a password and if it has expired
// const enteredPassword = localStorage.getItem("password");
// if (enteredPassword) {
//   const remainingTime = getTimeRemaining(enteredPassword);
//   if (remainingTime <= 0) {
//     passwordOverlay.style.display = "flex"; // Show overlay if expired
//   } else {
//     passwordOverlay.style.display = "none"; // Hide overlay if time is still valid
//   }
// } else {
//   passwordOverlay.style.display = "flex"; // Show overlay if no password is set
// }
