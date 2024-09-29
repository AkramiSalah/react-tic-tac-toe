import React, { useState } from 'react';
import './App.css';

function Tile({position, value, onTileClick}){
  return(
    <button className="Tile Buttons" id={position} onClick={() => onTileClick(position)}>
      {value}
    </button>
  )
}

function DrawBoard(){
  const [Board, setBoard] = useState(Array(9).fill(''));
  const [Turn, setTurn] = useState('X');
  const [TurnCount, setTurnCount] = useState(0);
  const [GameState, setGameState] = useState('ONGOING');

  const onTileClick = (position) => {
    if(GameState === 'ONGOING' && !Board[position]){
      const newBoard = [...Board];
      newBoard[position] = Turn;
      setBoard(newBoard);
      setTurnCount(prevCount => prevCount + 1);

      const won = checkWinner(newBoard);
      if(won){
          setGameState(won + " Won The Game!");
      }else if (TurnCount === 8){
          setGameState("It's a Draw");
      }else{
          setTurn(Turn === 'X' ? 'O' : 'X');
      }
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(''));
    setTurn('X');
    setTurnCount(0);
    setGameState('ONGOING');
  };

  return(
    <div className='GameContainer'>
      <div>
        <h2>{GameState === 'ONGOING' ? `Current Turn: ${Turn}` :  `Game Over: ${GameState}`}</h2>
      </div>

      <div className='Board'> 
        {Board.map((value,index) => ( 
          <Tile 
          key = {index}
          position = {index}
          value={value}
          onTileClick={onTileClick} />
        ))}
      </div>
      <div className='ButtonContainer'>
        <button className='ResetButton Buttons' onClick={resetGame}>Reset Game</button>
      </div>
      
    </div>
  );
}

function App() {
  return (
    <div>
      <DrawBoard/>
    </div>
  );
}

const checkWinner = (Board) => {
  const winningCombos= [
    // Horizontal wins
    [0,1,2],
    [3,4,5],
    [6,7,8],
    // Vertical wins
    [0,3,6],
    [1,4,7],
    [2,5,8],
    // Diagonal wins
    [0,4,8],
    [2,4,6],
  ]


  for(let combo of winningCombos){
    const [a,b,c] = combo;
    if(Board[a] && Board[b] && Board[c]){
      //check that theyre not empty, if one of them is, no need to check a win condition
      if( Board[a] === Board[b] && Board[b] === Board[c]){
        // using the transitive realtion rule of equality which is: if a = b and b = c => a=b=c (math syntax not code) 
        return Board[a];
      }
    }
  }

  return '';

}

export default App;
