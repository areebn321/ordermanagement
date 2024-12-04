function showError(message) {
  const errorDiv = document.getElementById("error");
  let errorDiv2 = document.getElementById("error2");
  errorDiv.innerHTML = message;
  errorDiv2.innerHTML = message;
  errorDiv.style.color = "#f21f1f";
  errorDiv2.style.color = "#f21f1f";
  setTimeout(() => {
    showError("&ensp;");
  }, 1500);
}

function showSuccess(message) {
  const errorDiv = document.getElementById("error");
  errorDiv.innerHTML = message;
  errorDiv.style.color = "#fff";
}
