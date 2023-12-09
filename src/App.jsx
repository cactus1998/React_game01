import { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log.jsx";
import GameOver from "./components/GameOver.jsx";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";

const PLAYERS={
    X:'Player 1',
    O:'Player 2',
}

// 初始遊戲版面
const INITIAL_GAME_BOARD = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

// 助理函數: 當組件函數重新執行時，不會重新跑這個函數
function deriveActivePlayer(gameTurns) {
    let currentPlayer = 'X';
    // 如果回合數大於 0 且最後一回合的參與者是 'X'，則設置當前玩家為 'O'
    if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
        currentPlayer = 'O';
    }
    return currentPlayer;
}

function deriveGameBoard(gameTurns){
        // 創建一個遊戲版面的複本
        let gameBoard = [...INITIAL_GAME_BOARD.map(array=>[...array])];

        // 將回合資訊應用到遊戲版面
        for (const turn of gameTurns) {
            const { square, player } = turn;
            const { row, col } = square;
    
            gameBoard[row][col] = player;
        }

        return gameBoard
}

function deriveWinner(gameBoard,players){
    let winner

    for(const combination of WINNING_COMBINATIONS){
        const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
        const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
        const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];
        
        if(firstSquareSymbol && firstSquareSymbol===secondSquareSymbol && firstSquareSymbol===thirdSquareSymbol){
            winner=players[firstSquareSymbol];
        }
    }

    return winner;
}

// 狀態更新函數: 以不可變的方式更新狀態，不會合併不同狀態
function App() {
    const [players,setPlayers] = useState(PLAYERS)
    // 設定回合
    const [gameTurns, setGameTurns] = useState([]);
    // const [hasWinner, setHasWinner] = useState(false)

    // 使用 deriveActivePlayer 函數得到當前玩家
    const activePlayer = deriveActivePlayer(gameTurns);

    const gameBoard = deriveGameBoard(gameTurns)

    const winner= deriveWinner(gameBoard,players)

    const hasDraw = gameTurns.length === 9 && !winner
    

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

    function handleRestart(){
        setGameTurns([])
    }

    function handlePlayerNameChange(symbol,newName){
        setPlayers(prevPlayers=>{
            return{
                ...prevPlayers,
                [symbol]:newName
            }
        });
    }

    return (
        <main>
            <div id="game-container">
                {/* 顯示玩家資訊 */}
                <ol id="players" className="highlight-player">
                    <Player initialName={PLAYERS.X} symbol="X" isActive={activePlayer === 'X'} onChangeName={handlePlayerNameChange}></Player>
                    <Player initialName={PLAYERS.O} symbol="O" isActive={activePlayer === 'O'} onChangeName={handlePlayerNameChange}></Player>
                </ol>

                {(winner || hasDraw) && (<GameOver winner={winner} onRestart={handleRestart} ></GameOver>)}
                {/* 顯示遊戲板 */}
                <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
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