// 初始遊戲版面
const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

// GameBoard 組件，用於呈現遊戲的棋盤
export default function GameBoard({ onSelectSquare, turns }) {
  // 創建一個遊戲版面的複本
  let gameBoard = initialGameBoard;

  // 將回合資訊應用到遊戲版面
  for (const turn of turns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  // 渲染 JSX，呈現遊戲版面
  return (
    <ol id="game-board">
      {/* 遍歷每一行 */}
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          {/* 在每一行中遍歷每一列 */}
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                {/* 使用按鈕來代表每一個方格，並設置點擊事件 */}
                <button onClick={() => onSelectSquare(rowIndex, colIndex)}>
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}

// 1. **initialGameBoard：** 初始遊戲版面，是一個包含三個子陣列的陣列，每個子陣列代表一行，初始值為 `null`。

// 2. **gameBoard 變數：** 用來存儲遊戲版面的複本。在每個回合中，根據回合資訊更新這個複本。

// 3. **for 迴圈：** 遍歷每個回合，並根據回合資訊將玩家的動作應用到遊戲版面。

// 4. **JSX 渲染：** 使用 `<ol>` 和 `<li>` 元素來呈現遊戲版面。在每一行中，使用按鈕來代表每一個方格，並設置點擊事件。

// 5. **`onSelectSquare` 函數：** 這個函數是由父組件傳遞過來的，用來處理當玩家點擊方格時的邏輯。在按鈕的點擊事件中調用，傳遞方格的座標。