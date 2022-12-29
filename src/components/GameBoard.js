import React from "react";
import "../style/GameBoard.css";
import boardLayout from "../board"

class GameBoard extends React.Component {
  constructor(props) {
    super(props);
    this.boardLayout = boardLayout;
    this.state = {
      isRunning: false,
      boardState: this.boardLayout,
    };
  }

  componentDidMount() {
    this.interval = setInterval(
      () =>
        this.setState({
          boardState: this.generateBoardState(this.state.boardState),
        }),
      100
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  generateBoardState(gameBoardArray) {
    let newBoardState = gameBoardArray;
    for (let i = 0; i < newBoardState.length; i++) {
      for (let j = 0; j < newBoardState[i].length; j++) {
        newBoardState[i][j] = this.applyGameRules(
          this.countAround(newBoardState, i, j),
          newBoardState[i][j]
        );
      }
    }
    return newBoardState;
  }

  countAround(board, row, column) {
    let count = 0;
    for (let i = row - 1; i <= row + 1; i++) {
      if (i < 0 || i >= board.length) continue;
      for (let j = column - 1; j <= column + 1; j++) {
        if ((row === i && column === j) || j < 0 || j >= board.length) continue;
        if (board[i][j] === 1) {
          count += 1;
        }
      }
    }
    return count;
  }
  applyGameRules(count, generation) {
    let nextGeneration = 0;
    if (generation === 1) {
      if (count === 2 || count === 3) {
        nextGeneration = 1;
      }
    } else {
      if (count === 3) {
        nextGeneration = 1;
      }
    }
    return nextGeneration;
  }

  render() {
    return (
      <div className="boardWrapper">
        {this.state.boardState.map((row) => {
          return (
            <div className="boardRow">
              {row.map((value) => {
                return value === 1 ? (
                  <div className="boardBlock active"></div>
                ) : (
                  <div className="boardBlock inactive"></div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

export default GameBoard;
