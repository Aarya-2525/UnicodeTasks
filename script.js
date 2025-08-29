const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("player");
const restartBtn = document.getElementById("restart");

let currentPlayer = "X";
let board = Array(9).fill("");
let running = true;

const body = document.body;
body.classList.add("bg-red-500");

// Add click listeners to each cell
cells.forEach((cell, index) => {
  cell.addEventListener("click", () => handleClick(index));
});

// Add listener to restart button
restartBtn.addEventListener("click", restartGame);

// Handle a move
function handleClick(index) {
  if (board[index] !== "" || !running) return;

  board[index] = currentPlayer;

  // Set text + color based on player
  cells[index].textContent = currentPlayer;
  if (currentPlayer === "X") {
    cells[index].classList.add("text-red-600");
  } else {
    cells[index].classList.add("text-blue-600");
  }

  if (checkWinner()) {
    statusText.textContent = `Player ${currentPlayer} Wins!`;
    running = false;
  } else if (!board.includes("")) {
    statusText.textContent = "It's a Draw";
    running = false;
  } else {
    // Switch player
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s Turn`;

    // Update background color depending on player
    if (currentPlayer === "X") {
      body.classList.remove("bg-blue-500");
      body.classList.add("bg-red-500");
    } else {
      body.classList.remove("bg-red-500");
      body.classList.add("bg-blue-500");
    }
  }
}

// Check winning combinations
function checkWinner() {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];
  return winPatterns.some(pattern =>
    pattern.every(i => board[i] === currentPlayer)
  );
}

// Restart the game
function restartGame() {
  currentPlayer = "X";
  board = Array(9).fill("");
  running = true;
  statusText.textContent = "Player X's Turn";

  // Reset background to red (X starts)
  body.classList.remove("bg-blue-500");
  body.classList.add("bg-red-500");

  // Clear cells + remove old colors
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("text-red-600", "text-blue-600");
  });
}
