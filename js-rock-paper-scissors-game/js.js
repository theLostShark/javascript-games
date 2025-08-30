//variables
const choose = ["rock", "paper", "scissors"];
let actualPlay = 0;
let playerPlay = null;
let computerPlay = null;
let userScoresCount = 0;
let computerScoresCount = 0;

// DOM
const buttonPlay = document.getElementById("buttonPlay");
const buttonReset = document.getElementById("buttonReset");
const divPlayer = document.getElementById("player");
const divComputer = document.getElementById("computer");
const ulResults = document.getElementById("results");
const userScores = document.getElementById("userScores");
const computerScores = document.getElementById("computerScores");

// IMG player
const PlayerImages = [
    { name: "rock", url: "img/playerRock.png" },
    { name: "paper", url: "img/playerPaper.png" },
    { name: "scissors", url: "img/playerScissors.png" }
];

// Buttons
buttonPlay.addEventListener("click", play);
buttonReset.addEventListener("click", reset);

// PLAYER IMG
divPlayer.innerHTML = PlayerImages.map((opcion, index) => `
        <img src="${opcion.url}" 
             alt="${opcion.name}" 
             class="noSelected" 
             onclick="playerOption(${index})">
        `).join("");

// PLAYER SELECTION
function playerOption(index) {
    const imgs = divPlayer.querySelectorAll("img");
    imgs.forEach((img, i) => {
        img.classList.toggle("selected", i === index);
        img.classList.toggle("noSelected", i !== index);
    });
    playerPlay = PlayerImages[index].name;
}

// PLAY
function play() {
    if (playerPlay === null) {
        alert("You must select an option to play!");
        return;
    }
    computerPlay = choose[Math.floor(Math.random() * choose.length)];
    divComputer.innerHTML = `<img src="img/computer${computerPlay}.png" alt="${computerPlay}">`;

    let resultado;
    if (playerPlay === computerPlay) {
        resultado = "draw";
    } else if (
        (playerPlay === "rock" && computerPlay === "scissors") ||
        (playerPlay === "paper" && computerPlay === "rock") ||
        (playerPlay === "scissors" && computerPlay === "paper")
    ) {
        resultado =  '<span class="win">You win!</span>';
        userScoresCount++;
        userScores.textContent = userScoresCount;

    } else {
        resultado = '<span class="lose">computer wins</span>';
        computerScoresCount++;
        computerScores.textContent = computerScoresCount;
    }

    ulResults.innerHTML += `<li>play ${actualPlay + 1}: ${resultado}</li>`;
    actualPlay++;
}

// RESET
function reset() {
    actualPlay = 0;
    userScoresCount = 0;
    computerScoresCount = 0;

    userScores.textContent = "0";
    computerScores.textContent = "0";
    ulResults.innerHTML = "";
    divComputer.innerHTML = "";
}
