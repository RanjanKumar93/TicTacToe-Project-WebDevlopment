import { useState } from "react";

export default function Player({
  initialName,
  symbol,
  isActive,
  onChangeName,
}) {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditingName, setIsEditingName] = useState(false);

  let editablePlayerName = <span className="player-name">{playerName}</span>;
  const handlePlayerNameChange = (event) => {
    setPlayerName(event.target.value);
  };
  if (isEditingName) {
    editablePlayerName = (
      <input
        type="text"
        required
        value={playerName}
        onChange={handlePlayerNameChange}
      />
    );
  }
  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={() => {
        setIsEditingName((x) => !x)
        if(isEditingName){
            onChangeName(symbol, playerName)
        }
        }}>
        {isEditingName ? "SAVE" : "Edit"}
      </button>
    </li>
  );
}
