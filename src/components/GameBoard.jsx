
const initialGameBoard=[
    [null,null,null],
    [null,null,null],
    [null,null,null],
]

export default function GameBoard({onSelectSquare,turns}){
    let gameBoard = initialGameBoard

    // 導出狀態
    for (const turn of turns){
        const {square,player} =turn;
        const { row , col } = square;

        gameBoard[row][col] = player;
    }

    // const [gameBoard,setGameBoard] = useState(initialGameBoard)

    // function handleSelectSquare(rowIndex,colIndex){
    //     setGameBoard((prevGameBoard)=>{
    //         const updateBoard=[...prevGameBoard.map(innerArray=>[...innerArray])]
    //         updateBoard[rowIndex][colIndex]=activePlayerSymbol;
    //         return updateBoard;
    //     })
    //     onSelectSquare();
    // }

    return <ol id="game-board">
        {gameBoard.map((row,rowIndex)=>(<li key={rowIndex}>
            <ol>
                {row.map((playerSymbol,colIndex)=>(
                    <li key={colIndex}>
                        {/* 84 6.10s */}
                        <button onClick={()=>onSelectSquare(rowIndex,colIndex)}>{playerSymbol}</button>
                    </li>
                ))}
            </ol>
        </li>))}
    </ol>
}