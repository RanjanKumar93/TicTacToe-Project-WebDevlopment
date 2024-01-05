import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import Player from "./components/Player";
import { useState } from "react";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";
import GameOver from "./components/GameOver.jsx";

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const deriveActivePlayer = (info) => {
  let currentPlayer = "X";
  if (info.length > 0 && info[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
};

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

function deriveGameBoard(gameName) {
  let updatedBoard = [
    ...INITIAL_GAME_BOARD.map((innerArray) => [...innerArray]),
  ];
  for (const gName of gameName) {
    const { square, player } = gName;
    const { row, col } = square;

    updatedBoard[row][col] = player;
  }
  return updatedBoard;
}

function deriveWinner(gameName, players) {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameName[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameName[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameName[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }

  return winner;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameName, setGameName] = useState([]);
  const updatedBoard = deriveGameBoard(gameName);
  const currentPlayer = deriveActivePlayer(gameName);
  const winner = deriveWinner(updatedBoard, players);
  const hasDraw = gameName.length === 9 && !winner;
  const handleSquareClick = (rowIndex, colIndex) => {
    setGameName((prevGameState) => {
      const currentPlayer = deriveActivePlayer(prevGameState);

      let newArray = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevGameState,
      ];
      return newArray;
    });
  };

  const handleNameChange = (symbol, newName) => {
    setPlayers((initial) => {
      return {
        ...initial,
        [symbol]: newName,
      };
    });
  };

  const handleRestart = () => {
    setGameName([]);
  };

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={currentPlayer === "X"}
            onChangeName={handleNameChange}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            onChangeName={handleNameChange}
            isActive={currentPlayer === "O"}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard
          gameBoard={updatedBoard}
          handleSquareClick={handleSquareClick}
        />
      </div>
      <Log gameLog={gameName} />
    </main>
  );
}

export default App;
