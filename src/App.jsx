import { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log.jsx";

// 助理函數: 當組件函數重新執行時，不會重新跑這個函數
function deriveActivePlayer(gameTurns) {
    let currentPlayer = 'X';
    // 如果回合數大於 0 且最後一回合的參與者是 'X'，則設置當前玩家為 'O'
    if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
        currentPlayer = 'O';
    }
    return currentPlayer;
}

// 狀態更新函數: 以不可變的方式更新狀態，不會合併不同狀態
function App() {
    // 設定回合
    const [gameTurns, setGameTurns] = useState([]);

    // 使用 deriveActivePlayer 函數得到當前玩家
    const activePlayer = deriveActivePlayer(gameTurns);

    // 處理選擇方格的函數
    function handleSelectSquare(rowIndex, colIndex) {
        setGameTurns((prevTurns) => {
            // 使用 deriveActivePlayer 函數得到當前玩家
            const currentPlayer = deriveActivePlayer(prevTurns);

            // 更新回合資訊
            const updateTurns = [
                { square: { row: rowIndex, col: colIndex }, player: activePlayer },
                ...prevTurns
            ];

            return updateTurns;
        });
    }

    return (
        <main>
            <div id="game-container">
                {/* 顯示玩家資訊 */}
                <ol id="players" className="highlight-player">
                    <Player initialname="Player1" symbol="X" isActive={activePlayer === 'X'}></Player>
                    <Player initialname="Player2" symbol="O" isActive={activePlayer === 'O'}></Player>
                </ol>

                {/* 顯示遊戲板 */}
                <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns} />
            </div>

            {/* 顯示遊戲記錄 */}
            <Log turns={gameTurns} />
        </main>
    );
}

export default App;



// 1. `deriveActivePlayer` 函數：根據遊戲的回合信息來決定當前的玩家是 'X' 還是 'O'。

// 2. `App` 函數組件：主要的應用組件，包含了遊戲的主要邏輯和界面。

// 3. `useState` 鉤子：用於定義和管理組件的狀態，這裡主要是回合信息 (`gameTurns`)。

// 4. `handleSelectSquare` 函數：處理當玩家選擇一個方格時的邏輯，更新回合信息。

// 5. 界面部分：包含了玩家信息、遊戲板和遊戲記錄的呈現。