import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import FenForm from './components/FenForm.js';
import Board from './components/Board.js';
  
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.handleFenSubmit = this.handleFenSubmit.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.handleSelectedPosition = this.handleSelectedPosition.bind(this);
    this.state = {
      fen: '',
      squares: Array(64).fill(null),
      selectedPosition: -1,
      history: [],
    };
  }

  handleFenSubmit(fen) {
    const squares = Array(64).fill(null);
    const history = [];

    history.push(fen);

    fillSquares(fen, squares);
  
    this.setState({
      fen: fen,
      squares: squares,
      selectedPosition: -1,
      history: history,
    });
  }

  handleSelectedPosition(i)
  {
    this.setState({selectedPosition: i});
  }

  handleMove(moveFrom, moveTo)
  {
    const squares = this.state.squares.slice();
    const history = this.state.history.slice();

    [squares[moveFrom], squares[moveTo]] = [squares[moveTo], squares[moveFrom]];

    history.push(getFenFromSquares(squares));

    this.setState({
        squares: squares,
        selectedPosition: -1,
        history: history,
      });
  }

  jumpTo(move) {
    const squares = this.state.squares.slice();
    const history = this.state.history.slice();
   
    const fen = history[move];

    history.length = move + 1;

    fillSquares(fen, squares);
  
    this.setState({
      fen: fen,
      squares: squares,
      selectedPosition: -1,
      history: history,
    });
  }

  render() {
    const history = this.state.history.slice();

    const moves = history.map((step, move) => {
      return (
        <li key={step}>
          <button onClick={() => this.jumpTo(move)}>{step}</button>
        </li>
      );
    });

    return (
      <div>
      <div className="fen-form">
        <FenForm onFenSubmit={this.handleFenSubmit} />
      </div>
      <div className="game">
        <div className="game-board">
          <Board squares={this.state.squares} handleMove={this.handleMove} handleSelectedPosition={this.handleSelectedPosition} selectedPosition={this.state.selectedPosition} />
        </div>
        <div className="game-info">
          <ol>{moves}</ol>
        </div>
      </div>
      </div>
    );
  }
}

function fillSquares(fen, squares) {
  const chessSymbols = { 'P': '&#9817;', 'N': '&#9816;', 'B': '&#9815;', 'R': '&#9814;', 'Q': '&#9813;', 'K': '&#9812;', 'p': '&#9823;', 'n': '&#9822;', 'b': '&#9821;', 'r': '&#9820;', 'q': '&#9819;', 'k': '&#9818;' };
  const fenNotation = fen.split(' ');
  const fenFields = fenNotation[0].split("/");

  let index = 0;
  let fenField = '';

  for (let i = 0; i < fenFields.length; i++)
  {
      fenField = fenFields[i];
      for (let j = 0; j < fenField.length; j++)
      {
          if (isNaN(fenField[j])) {
              squares[index] = chessSymbols[fenField[j]];
              index++;
          } else {
              for (let y = 0; y < fenField[j]; y++)
              {
                  squares[index] = '';
                  index++;
              }
          }
      }
  }

  return squares;
}

function getFenFromSquares(squares)
{
  const chessSymbols = { '&#9817;': 'P', '&#9816;': 'N', '&#9815;': 'B', '&#9814;': 'R', '&#9813;': 'Q', '&#9812;': 'K', '&#9823;': 'p', '&#9822;': 'n', '&#9821;': 'b', '&#9820;': 'r', '&#9819;': 'q', '&#9818;': 'k' };
  let emptySquare = 0;
  let rows = [];
  let row = '';
  let index = 0;

  for (let i = 0; i < 8; i++)
  {
    emptySquare = 0;
    row = '';

    for (let j = 0; j < 8; j++)
    {
      if (squares[index] === '')
      {
        emptySquare++;
        index++;
      }
      else
      {
        if (emptySquare > 0)
          row += '' + emptySquare;

        row += chessSymbols[squares[index]];

        emptySquare = 0;
        index++;
      }
    }

    if (emptySquare > 0)
        row += '' + emptySquare;

    rows.push(row);
  }

  return rows.join('/');
}
// ========================================
  
ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
  