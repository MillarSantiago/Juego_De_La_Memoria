//seleccionamos los lemetentos con la etiqueta GetelementById
const board = document.getElementById("game-board");

const attemptsdisplay = document.getElementById("attempts");

const resetbutton = document.getElementById("reset-button");

const scoreDisplay = document.getElementById("score");

const cleanScoreButton = document.getElementById("clean-score-button");

let attepts = 0;
let score = 0;
let flippedCard = [];
let matchedCard = [];

//reverso de la carta
const cardBack = "./assets/how-would-the-back-design-of-the-tarot-cards-look-v0-bedw3kn0ezof1.webp";

//imagenes de las cartas
const icons = [
    "./assets/di6gy0at4wg61.jpg",
    "./assets/Oryctolagus_cuniculus_Tasmania_2.jpg",
    "./assets/perro.jpg",
    "./assets/27abe2cfc2551d45bff9b736fa6cee23.jpg",
    "./assets/images.jpg",

];

//funcion para duplicar los elemntos en parejas
let cardArray = [...icons, ...icons];

//funcion para crear las cartas
function createboard(){
    shuffle(cardArray);
    cardArray.forEach( (img) => {
        const card = document.createElement('div')
        card.classList.add("card");
        card.dataset.img = img;
        card.innerHTML = `<img src="${cardBack}" alt="reverso">`;
        card.addEventListener("click", flipCard);
            board.appendChild(card);
    });
}

//funcion para mesclar las cartas

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

//funcion para voltear la carta

function flipCard() {
    if (flippedCard.length < 2 && !this.classList.contains("flipped")) {
        this.classList.add("flipped");
        this.innerHTML = `<img src="${this.dataset.img}" alt="card">`;
        flippedCard.push(this);

        if (flippedCard.length == 2) {
            checkForMatch();
        }
    }
}

//funcion para que verifique que coincidan 
function checkForMatch() {
    const [firstCard, secondCard] = flippedCard;

    if (firstCard.dataset.img === secondCard.dataset.img) {
        matchedCard.push(firstCard, secondCard);
        flippedCard = [];

        score+= 15;
        scoreDisplay.textContent = score;

        if (matchedCard.length === cardArray.length) {
            setTimeout(() => alert("Lo Haz Conseguido!, lograste ganar"), 500);
        }
    } else {
        setTimeout(() => {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            firstCard.innerHTML = `<img src="${cardBack}" alt="reverso">`;
            secondCard.innerHTML = `<img src="${cardBack}" alt="reverso">`;
            flippedCard = [];
        }, 1000);
    }
    attepts++;
    attemptsdisplay.textContent = attepts;
}

//funcion de reiniciar el juego

resetbutton.addEventListener("click", resetGame);

function resetGame () {
    const allCards = document.querySelectorAll(".card");
    allCards.forEach(card => {
        card.classList.remove("flipped");
    });

    board.innerHTML = "";
    attepts = 0;
    attemptsdisplay.textContent = attepts;
    flippedCard = [];
    matchedCard = [];
    createboard();
}

cleanScoreButton.addEventListener("click", cleanScore);

function cleanScore() {
    score = 0;
    scoreDisplay.textContent = score;
}

createboard();