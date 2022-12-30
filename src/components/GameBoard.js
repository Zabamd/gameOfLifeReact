import React from "react";
import "../style/GameBoard.css";
import boardLayout from "../board";

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
    this.interval = setInterval(() => {
      if (this.state.isRunning === true) {
        this.setState({
          boardState: this.generateBoardState(this.state.boardState),
        });
      }
    }, 100);
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

  onBlockClick(row, column) {
    if (this.state.isRunning === false) {
      let newBoard = this.state.boardState;
      newBoard[row][column] = newBoard[row][column] === 1 ? 0 : 1;
      this.setState({ boardState: newBoard });
    }
  }
  onStartButtonClick() {
    this.setState({ isRunning: !this.state.isRunning });
  }
  onResetButtonClick() {
    let newBoard = this.state.boardState;
    for (let i = 0; i < newBoard.length; i++) {
      for (let j = 0; j < newBoard[i].length; j++) {
        newBoard[i][j] = 0;
      }
    }
    this.setState({ boardState: newBoard, isRunning: false });
  }
  render() {
    return (
      <>
        <div className="preGameMenu">
          <h3 className="menuHeading">Welcome to the game of life!</h3>
          <p className="menuText">
            While the game is stopped you can choose which block shall be alive
          </p>
          <div className="controlsWrapper">
            <button
              className="startButton"
              onClick={() => {
                this.onStartButtonClick();
              }}
            >
              {this.state.isRunning === false && "Start The Game"}
              {this.state.isRunning === true && "Stop The Game"}
            </button>
            <button
              className="resetButton"
              onClick={() => {
                this.onResetButtonClick();
              }}
            >
              Reset board
            </button>
          </div>
        </div>
        <div className="boardWrapper">
          {this.state.boardState.map((row, rowIndex) => {
            return (
              <div className="boardRow">
                {row.map((value, columnIndex) => {
                  return value === 1 ? (
                    <div
                      className="boardBlock active"
                      onClick={() => {
                        this.onBlockClick(rowIndex, columnIndex);
                      }}
                    ></div>
                  ) : (
                    <div
                      className="boardBlock inactive"
                      onClick={() => {
                        this.onBlockClick(rowIndex, columnIndex);
                      }}
                    ></div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

export default GameBoard;
