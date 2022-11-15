let maj = document.getElementById("maj");
let annuler = document.getElementById("maj");
let d1 = document.getElementById("d1");
let d2 = document.getElementById("d2");

maj.addEventListener("click", () => {
  if(getComputedStyle(d1).display != "none"){
    d1.style.display = "none";
    d2.style.display = "block";
  } else {
    d1.style.display = "block";
    d2.style.display = "none";
  }
});

