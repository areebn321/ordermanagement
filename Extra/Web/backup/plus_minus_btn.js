let signs = document.querySelectorAll(".signs");
let pieces = document.querySelectorAll(".pieces");
let orderQunatityPieces = document.querySelectorAll(".orderQunatityPieces");
function tookSigns(params) {
  signs.forEach((e) => {
    e.addEventListener("click", (e) => {
      changePieces(e.target.getAttribute("data-index"), e.target.innerHTML);
      // }
    });
  });
}
tookSigns();
function changePieces(a, b) {
  pieces.forEach((e) => {
    orderQunatityPieces.forEach((e) => {
      if (Number(e.getAttribute("data-index")) === Number(a)) {
        minus = e.innerHTML;
      }
    });
    if (b === "—") {
      if (Number(e.getAttribute("data-index")) === Number(a)) {
        if (e.innerHTML >= 0 && minus > 0) {
          e.innerHTML = Number(e.innerHTML) + 1;
          orderQunatityPieces.forEach((e) => {
            if (Number(e.getAttribute("data-index")) === Number(a)) {
              if (e.innerHTML > 0) {
                e.innerHTML = Number(e.innerHTML) - 1;
              }
            }
          });
        }
      }
    } else if (b === "+") {
      if (Number(e.getAttribute("data-index")) === Number(a)) {
        if (e.innerHTML > 0) {
          e.innerHTML = Number(e.innerHTML) - 1;
          orderQunatityPieces.forEach((e) => {
            if (Number(e.getAttribute("data-index")) === Number(a)) {
              if (e.innerHTML >= 0) {
                e.innerHTML = Number(e.innerHTML) + 1;
              }
            }
          });
        }
      }
    }
  });
}
