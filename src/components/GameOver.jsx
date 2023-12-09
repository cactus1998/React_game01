export default function GameOver({winner,onRestart}){
    return (
        <div id='game-over'>
            <h2>Game Over</h2>
            {winner &&<p>{winner} 贏了</p>}
            {!winner &&<p>平手</p>}
            <p><button onClick={onRestart}>重新開始遊戲</button></p>
        </div>
    )
}