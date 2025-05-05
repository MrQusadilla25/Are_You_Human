const wordList = ["apple", "grape", "stone", "train", "flame", "plaza", "pearl"];
let secretWord;
let currentRow = 0;

function createBoard() {
  const gameBoard = document.getElementById("gameBoard");
  gameBoard.innerHTML = "";

  for (let i = 0; i < 6; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    row.id = `row${i}`;
    gameBoard.appendChild(row);

    for (let j = 0; j < 5; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      row.appendChild(cell);
    }
  }
}

function startNewGame() {
  secretWord = wordList[Math.floor(Math.random() * wordList.length)];
  currentRow = 0;
  createBoard();

  document.getElementById("debugWord").textContent = `Debug Word: ${secretWord}`;
}

function submitGuess() {
  const input = document.getElementById("inputWord");
  const guess = input.value.toLowerCase();

  if (guess.length !== 5) {
    alert("Please enter a 5-letter word!");
    return;
  }

  const row = document.getElementById(`row${currentRow}`);
  if (!row) return;

  const secretLetters = secretWord.split("");
  const feedback = Array(5).fill("red");

  // First pass: green
  for (let i = 0; i < 5; i++) {
    if (guess[i] === secretLetters[i]) {
      feedback[i] = "green";
      secretLetters[i] = null;
    }
  }

  // Second pass: yellow
  for (let i = 0; i < 5; i++) {
    if (feedback[i] === "green") continue;
    const index = secretLetters.indexOf(guess[i]);
    if (index !== -1) {
      feedback[i] = "yellow";
      secretLetters[index] = null;
    }
  }

  for (let i = 0; i < 5; i++) {
    const cell = row.children[i];
    cell.textContent = guess[i].toUpperCase();
    cell.classList.add(feedback[i]);
  }

  currentRow++;

  if (guess === secretWord) {
    setTimeout(() => {
      alert("You got it! Starting a new game.");
      startNewGame();
    }, 100);
  } else if (currentRow === 6) {
    setTimeout(() => {
      alert("Out of guesses! The word was: " + secretWord);
      startNewGame();
    }, 100);
  }

  input.value = "";
}

startNewGame();