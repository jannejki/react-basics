import React from 'react';
import Overlay from './Overlay';
import Board from './Board';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: [
            [''],
            [''],
            [''],
            [''],
            [''],
            [''],
            [''],
            [''],
            ['']
          ],
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

    if (_calculateWinner(squares)) {
      this.superSquare = false;
      return;
    } else {
      this.superSquare = _raffleSuperSquare();
    }


    squares[i][0] = current.xIsNext ? 'X' : 'O';

    const nextInLine = [{
      squares: squares,
      xIsNext: this.superSquare ? current.xIsNext : !current.xIsNext
    }]

    this.setState({
      history: this.state.history.concat(nextInLine),
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

    // create history buttons
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

    // set game status
    let status;
    if (winner) {
      status = 'Winner: ' + winner.player;

      for (let i of winner.winningRow) {
        current.squares[i][1] = 'winner';
      }

    } else if (this.state.stepNumber < 9) {
      status = 'Next player: ' + (current.xIsNext ? 'X' : 'O');
    } else {
      status = 'Tie!'
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
    if (squares[a][0] && squares[a][0] === squares[b][0] && squares[a][0] === squares[c][0]) {
      return { player: squares[a][0], winningRow: lines[i] };
    }
  }
  return null;
}

const _raffleSuperSquare = () => {
  const max = 9;
  return Math.floor(Math.random() * max) + 1 === 1;
};