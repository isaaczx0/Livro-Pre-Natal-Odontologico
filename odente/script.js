const images = [
  "pag1.jpeg",
  "pag2.jpeg",
  "pagina3.jpg",
  "pagina4.jpg",
  "pagina5.jpg",
  "pagina6.jpg",
  "pagina7.jpg"
];

let currentIndex = 0;
const bookPage = document.getElementById("bookPage");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

function updatePage() {
  bookPage.src = images[currentIndex];
}

prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    updatePage();
  }
});

nextBtn.addEventListener("click", () => {
  if (currentIndex < images.length - 1) {
    currentIndex++;
    updatePage();
  }
});
