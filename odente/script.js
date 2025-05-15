/*Antonio*/
const images = [
  "pag1.jpeg",
  "pag2.jpeg",
  "pag3.jpeg",
  "pag4.jpeg",
  "pag5.jpeg",
  "pag6.jpeg",
  "pag7.jpeg"
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
