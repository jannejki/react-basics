import React from 'react';
import Overlay from './Overlay';
import Board from './Board';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          xIsNext: true
        }
      ],
      stepNumber: 0,
      superSquare: false,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    this.superSquare = _raffleSuperSquare();

    if (_calculateWinner(squares) || squares[i]) {
      this.superSquare = false;
      return;
    }

    squares[i] = current.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares,
          xIsNext: this.superSquare ? current.xIsNext : !current.xIsNext
        }
      ]),
      stepNumber: history.length,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = _calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (current.xIsNext ? "X" : "O");
    }

    return (
      <div>
        <Overlay visible={this.superSquare} player={current.xIsNext ? 'X' : 'O'} />
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={i => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      </div>
    );
  }
}

export default Game;

/*===========================================================*/
const _calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

const _raffleSuperSquare = () => {
  const max = 9;
  return Math.floor(Math.random() * max) + 1 === 1;
};