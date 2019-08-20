let tabs = document.querySelectorAll(".tablink");
let content = document.querySelectorAll(".tabcontent");
let ticker = document.getElementById("ticker");
// console.log(tabs, content);
tabs.forEach((each, index) => each.addEventListener("mouseup", (e) => openTab(e, index)));
tabs.forEach((each, index) => each.addEventListener("focus", (e) => openTab(e, index)));

function openTab(e, index) {
   e.preventDefault();
   tabs.forEach(each => each.classList.remove("active"));
   content.forEach(each => each.classList.remove("active"));
   tabs[index].classList.add("active");
   content[index].classList.add("active");

   if (index === 1) {
      ticker.classList.add("ticker");
   } else {
      ticker.classList.remove("ticker");
   }
}
