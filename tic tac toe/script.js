const boardElement = document.getElementById("board");
const statusElement = document.getElementById("status");

let board = ["", "", "", "", "", "", "", "", ""];
let human = "X";
let ai = "O";
let gameOver = false;

function renderBoard() {
  boardElement.innerHTML = "";
  board.forEach((cell, i) => {
    const div = document.createElement("div");
    div.className = "cell" + (cell ? " disabled" : "");
    div.textContent = cell;
    div.onclick = () => handleClick(i);
    boardElement.appendChild(div);
  });
}

function handleClick(index) {
  if (gameOver || board[index]) return;
  board[index] = human;
  renderBoard();
  if (checkWin(human)) {
    statusElement.textContent = "Je wint!";
    gameOver = true;
    return;
  }
  if (board.every(c => c)) {
    statusElement.textContent = "Gelijkspel!";
    gameOver = true;
    return;
  }
  statusElement.textContent = "AI denkt...";
  setTimeout(() => {
    const bestMove = getBestMove();
    board[bestMove] = ai;
    renderBoard();
    if (checkWin(ai)) {
      statusElement.textContent = "AI wint!";
      gameOver = true;
    } else if (board.every(c => c)) {
      statusElement.textContent = "Gelijkspel!";
      gameOver = true;
    } else {
      statusElement.textContent = "Jij bent: X";
    }
  }, 500);
}

function checkWin(player) {
  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  return winPatterns.some(pattern =>
    pattern.every(i => board[i] === player)
  );
}

function getBestMove() {
  let bestScore = -Infinity;
  let move;
  for (let i = 0; i < board.length; i++) {
    if (!board[i]) {
      board[i] = ai;
      let score = minimax(board, 0, false);
      board[i] = "";
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  return move;
}

function minimax(newBoard, depth, isMaximizing) {
  if (checkWin(ai)) return 10 - depth;
  if (checkWin(human)) return depth - 10;
  if (newBoard.every(c => c)) return 0;

  if (isMaximizing) {
    let best = -Infinity;
    for (let i = 0; i < newBoard.length; i++) {
      if (!newBoard[i]) {
        newBoard[i] = ai;
        best = Math.max(best, minimax(newBoard, depth + 1, false));
        newBoard[i] = "";
      }
    }
    return best;
  } else {
    let best = Infinity;
    for (let i = 0; i < newBoard.length; i++) {
      if (!newBoard[i]) {
        newBoard[i] = human;
        best = Math.min(best, minimax(newBoard, depth + 1, true));
        newBoard[i] = "";
      }
    }
    return best;
  }
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  gameOver = false;
  statusElement.textContent = "Jij bent: X";
  renderBoard();
}

renderBoard();
