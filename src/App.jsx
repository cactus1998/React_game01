import { useState } from "react"

import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import Log from "./components/Log.jsx"

// 助理函數 當組件函數重新執行時 不會重新跑這
function deriveActivePlayer(gameTurns){
    let currentPlayer='X'
    // 回和數>0+最後一回合的參與者=X 
    if(gameTurns.length>0 && gameTurns[0].player==='X'){
        currentPlayer="O"
    }
    return currentPlayer;
}

// 狀態更新函數 已不可變的方式更新狀態 並且不會合併不同狀態
function App() {
    // 設定回合
    const [gameTurns,setGameTurns]=useState([])
    // const [activePlayer,setActivePlayer]=useState('X') // 不要管理額外狀態

    const activePlayer = deriveActivePlayer(gameTurns);

    function handleSelectSquare(rowIndex,colIndex){
        // setActivePlayer((curActivePlayer)=>curActivePlayer==='X'?'O':'X')
        setGameTurns((prevTurns)=>{
            const currentPlayer = deriveActivePlayer(prevTurns)

            const updateTurns=[
                {square:{row:rowIndex,col:colIndex},player:activePlayer}
                ,...prevTurns];

                return updateTurns;
        })
    }

  return (
    // <h1>React Tic-Tac-Toe</h1>
    <main>
        <div id="game-container">
            <ol id="players" className="highlight-player">
                <Player initialname="Player1" symbol="X" isActive={activePlayer==='X'}></Player>
                <Player initialname="Player2" symbol="O" isActive={activePlayer==='O'}></Player>
            </ol>

            <GameBoard 
            onSelectSquare={handleSelectSquare} 
            turns={gameTurns}/>
        </div>

        <Log turns={gameTurns} />
    </main>
  )
}

export default App
