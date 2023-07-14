import { useState } from 'react';
import styles from './index.module.css';
const nomalBoard: number[][] = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 2, 0, 0, 0],
  [0, 0, 0, 2, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];
// [
//   [0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 1],
//   [0, 0, 0, 0, 0, 0, 2, 1],
//   [0, 0, 0, 0, 0, 1, 2, 1],
//   [0, 0, 0, 0, 2, 1, 2, 1],
//   [0, 0, 0, 1, 2, 1, 2, 1],
//   [0, 0, 2, 1, 2, 1, 2, 1],
//   [0, 2, 1, 2, 1, 2, 1, 2],
// ];
// [
//   [0, 0, 0, 0, 0, 0, 0, 0],
//   [2, 2, 1, 2, 1, 2, 1, 0],
//   [1, 1, 2, 1, 2, 1, 2, 0],
//   [2, 2, 1, 2, 1, 2, 1, 0],
//   [1, 1, 2, 1, 2, 1, 2, 0],
//   [2, 2, 1, 2, 1, 2, 1, 0],
//   [1, 1, 2, 1, 2, 1, 2, 0],
//   [2, 1, 2, 1, 2, 1, 2, 0],
// ];
//[
// [0, 0, 0, 0, 0, 0, 0, 0],
// [1, 1, 1, 1, 1, 1, 1, 0],
// [1, 2, 2, 2, 2, 2, 1, 0],
// [1, 2, 2, 2, 2, 2, 1, 0],
// [1, 2, 2, 0, 2, 2, 1, 0],
// [1, 2, 2, 2, 2, 2, 1, 0],
// [1, 2, 2, 2, 2, 2, 1, 0],
// [1, 1, 1, 1, 1, 1, 1, 0],
//];
const directions = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
  [-1, 0],
];
const Home = () => {
  const [board, setBoard] = useState(nomalBoard);
  const newBoard: number[][] = JSON.parse(JSON.stringify(board));
  const [turn, setTurn] = useState(1);
  const clickCell = (x: number, y: number) => {
    let isPassOnAnotherColor = false;
    for (const direction of directions) {
      for (let distance = 1; distance < 8; distance++) {
        if (
          newBoard[y + distance * direction[0]] === undefined ||
          newBoard[y + distance * direction[0]][x + distance * direction[1]] === undefined
        ) {
          break;
        } else if (newBoard[y][x] === turn) {
          break;
        } else if (newBoard[y][x] === 3 - turn) {
          break;
        } else if (newBoard[y + distance * direction[0]][x + distance * direction[1]] === 0) {
          break;
        } else if (
          newBoard[y + distance * direction[0]][x + distance * direction[1]] ===
          3 - turn
        ) {
          isPassOnAnotherColor = true;
          continue;
        } else if (newBoard[y + distance * direction[0]][x + distance * direction[1]] === turn) {
          if (isPassOnAnotherColor) {
            for (let back = 1; back <= distance; back++) {
              newBoard[y + (distance - back) * direction[0]][x + (distance - back) * direction[1]] =
                turn;
              newBoard[y][x] = turn;
              setTurn(3 - turn);
              break;
            }
          } else {
            break;
          }
        }
      }
    }
    console.log(turn);
    setBoard(newBoard);
  };
  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {board.map((row, y) =>
          row.map((color, x) => (
            <div className={styles.cell} key={`${y}-${x}`} onClick={() => clickCell(x, y)}>
              {color !== 0 && (
                <div
                  className={styles.stone}
                  style={{ backgroundColor: color === 1 ? '#000' : '#fff' }}
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
