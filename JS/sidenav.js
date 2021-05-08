const menuBtn = document.getElementById("menu-btn");
const closeBtn = document.getElementById("close-btn");

menuBtn.addEventListener("click", function () {
  document.getElementById("side-nav").style.width = "250px";
  document.getElementById("close-btn").style.display = "block";
});

closeBtn.addEventListener("click", function () {
  document.getElementById("side-nav").style.width = "0";
  document.getElementById("close-btn").style.display = "none";
});
