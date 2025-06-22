/*Antonio*/
// Referências a DOM Elements
const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const book = document.querySelector("#book");

const paper1 = document.querySelector("#p1");
const paper2 = document.querySelector("#p2");
const paper3 = document.querySelector("#p3");
const paper4 = document.querySelector("#p4"); // Adicionado paper4

// Event Listener
prevBtn.addEventListener("click", goPrevPage);
nextBtn.addEventListener("click", goNextPage);

// Lógica de Negócios
// currentLocation representa a "posição" no livro.
// 1 = livro fechado na capa
// 2 = livro aberto na página 1 e 2
// 3 = livro aberto na página 3 e 4
// 4 = livro aberto na página 5 e 6
// 5 = livro fechado na contracapa (chegou ao fim)
let currentLocation = 1;
const numOfPapers = 4; // Há 4 div.paper no HTML
const maxLocation = numOfPapers + 1; // Máximo de 5 "localizações" (1 fechado + 4 abertos)

function openBook() {
    book.style.transform = "translateX(50%)"; // Move o livro para a direita para centralizar quando aberto
    // Mova os botões para as laterais do livro aberto
    prevBtn.style.transform = "translateX(-280px) translateY(-50%)"; // Ajuste se precisar
    nextBtn.style.transform = "translateX(280px) translateY(-50%)"; // Ajuste se precisar
}

function closeBook(isAtBeginning) {
    if(isAtBeginning) {
        book.style.transform = "translateX(0%)"; // Livro de volta para a esquerda (fechado na capa)
    } else {
        book.style.transform = "translateX(100%)"; // Livro para a direita (fechado na contracapa)
    }
    // Botões voltam para a posição centralizada padrão
    prevBtn.style.transform = "translateX(0px) translateY(-50%)";
    nextBtn.style.transform = "translateX(0px) translateY(-50%)";
}

function goNextPage() {
    if(currentLocation < maxLocation) {
        switch(currentLocation) {
            case 1: // Virando a capa (p1)
                openBook();
                paper1.classList.add("flipped");
                paper1.style.zIndex = 1; // z-index da página virada deve ser baixo para ir para trás
                break;
            case 2: // Virando a p2 (mostrando p3/p4)
                paper2.classList.add("flipped");
                paper2.style.zIndex = 2; // z-index da página virada
                break;
            case 3: // Virando a p3 (mostrando p5/p6)
                paper3.classList.add("flipped");
                paper3.style.zIndex = 3; // z-index da página virada
                break;
            case 4: // Virando a p4 (mostrando p7 e a contracapa)
                paper4.classList.add("flipped");
                paper4.style.zIndex = 4; // z-index da página virada
                closeBook(false); // Fecha o livro quando chega na última página de conteúdo
                break;
            default:
                throw new Error("Estado desconhecido ao ir para a próxima página.");
        }
        currentLocation++;
        updateButtonVisibility(); // Atualiza a visibilidade dos botões após o movimento
    }
}

function goPrevPage() {
    if(currentLocation > 1) {
        switch(currentLocation) {
            case 2: // Voltando da p1 (voltando para a capa)
                closeBook(true); // Fecha o livro para o início
                paper1.classList.remove("flipped");
                paper1.style.zIndex = 4; // Volta ao z-index original (alto)
                break;
            case 3: // Voltando da p2 (voltando para p1/p2)
                paper2.classList.remove("flipped");
                paper2.style.zIndex = 3; // Volta ao z-index original
                break;
            case 4: // Voltando da p3 (voltando para p3/p4)
                paper3.classList.remove("flipped");
                paper3.style.zIndex = 2; // Volta ao z-index original
                break;
            case 5: // Voltando da p4 (reabrindo o livro)
                openBook(); // Abre o livro para o lado inicial
                paper4.classList.remove("flipped");
                paper4.style.zIndex = 1; // Volta ao z-index original
                break;
            default:
                throw new Error("Estado desconhecido ao ir para a página anterior.");
        }
        currentLocation--;
        updateButtonVisibility(); // Atualiza a visibilidade dos botões após o movimento
    }
}

// Função para controlar a visibilidade dos botões
function updateButtonVisibility() {
    if (currentLocation === 1) {
        prevBtn.classList.add('hidden'); // Esconde "Anterior" na capa
    } else {
        prevBtn.classList.remove('hidden');
    }

    if (currentLocation === maxLocation) {
        nextBtn.classList.add('hidden'); // Esconde "Próximo" na última página (contracapa)
    } else {
        nextBtn.classList.remove('hidden');
    }
}

// Inicializa a visibilidade dos botões ao carregar a página
document.addEventListener('DOMContentLoaded', updateButtonVisibility);