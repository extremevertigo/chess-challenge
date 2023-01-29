import jsxElem, { render, renderAppend } from '../third-party/jaredsartin-jsx-no-react.js';
import htm from 'https://unpkg.com/htm?module';
import ChessPieces from './pieces.js';

const html = htm.bind(jsxElem.createElement);

/**
 * A Chessboard element with clickable tiles I am also pulling in chess pieces to be
 * added to the ChessBoard element.  I am utilizing DocumentFragment to reduce the amount of 
 * browser reflow.  Each tile has its own unique id of placement on the board so we can check
 * against it during piece movements.
 */
class ChessBoard extends HTMLElement {
  tilesArray = [];
  selectedTile = null;
  connectedCallback() {
    const tiles = this.addTiles();
    const chessPieces = new ChessPieces();

    render(html`${chessPieces.pieces}`, this);
    renderAppend(html`${tiles}`, this);

    chessEvents.on('click', ({ detail }) => {
      this.checkTile(detail);
    });
  }

  /**
   * Checking Tile that was clicked and if it has a tile already selected it will then check the next tile
   * to see if there is an empty space to move the piece.
   * @param {object} detail 
   */
  checkTile(detail) {
    const tile = detail.target;
    if (this.selectedTile && this.selectedTile.id !== tile.id) {

      if (tile.dataset.currentPiece === "empty") {
        const moveData = { startTile: this.selectedTile, endTile: tile };
        chessEvents.emit('move', ({ moveData }));
      }

      this.tilesArray.forEach(t => {
        t.style.border = "";
      });
      this.selectedTile = null;
    }

    if (!this.selectedTile && tile.dataset.currentPiece !== "empty") {
      tile.style.border = "3px solid green";
      this.selectedTile = tile;
    }
  }
  /**
   * Creates a document fragment that then appends divs to build the tile board
   * @returns DocumentFragment
   */
  addTiles() {
    const fragment = new DocumentFragment();
    const board = document.createElement('div');
    board.className = 'board';
    board.addEventListener("click", this.handleTile, this);

    for (let i = 8; i > 0; i--) {
      for (let j = 0; j < 8; j++) {
        const letter = (j + 10).toString(36);
        const tile = document.createElement('div');
        tile.className = (i + j) % 2 == 0 ? 'gray' : 'black';
        tile.id = letter + i;
        tile.dataset.currentPiece = "empty";
        tile.dataset.currentColor = "empty";
        fragment.append(tile);
        this.tilesArray.push(tile);
      }
      board.append(fragment);
    }
    return board;
  }
  /**
   * Emits click from the EventBus
   * @param {event} evt 
   */
  handleTile(evt) {
    chessEvents.emit("click", evt);

  }

}

customElements.define('chess-board', ChessBoard);