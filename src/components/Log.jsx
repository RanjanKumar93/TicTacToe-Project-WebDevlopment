export default function Log({ gameLog }) {
  return (
    <ol id="log">
      {gameLog.map((x) => (
        <li
          key={`${x.square.row}${x.square.col}`}
        >{`${x.square.row} rowIndex and ${x.square.col} colIndex pressed by ${x.player}`}</li>
      ))}
    </ol>
  );
}
