
import pieceData from '../../config/config.json' assert { type: 'json' };
import { globalSettings } from '../arrays.js';

/**
 * A ChessPiece Class that returns a Document Fragment of divs elements with Unicode text of the 
 * assigned chess pieces.  
 */
export default class ChessPieces {
    constructor(){
      this.pieces = this.addPieces();
    }

    addPieces() {
        console.log("adding pieces");
        const fragment = new DocumentFragment();
        const pieceBoard = document.createElement('div');
        pieceBoard.className = 'piece-board';
        
        const pieceArray = globalSettings.boardArray.flatMap(row => row.filter(tile => tile.startPiece !== null));
        let rightSide = 1100;
        let leftSide = 50;
        let topRight = 20;
        let topLeft = 20;
        pieceArray.forEach(tile => {
            let data = pieceData.pieces.find(setting => setting.type == tile.startPiece && setting.color == tile.color);

            const piece = document.createElement('div');
            piece.innerHTML = data.hex;
            piece.dataset.startPos = tile.id;
            piece.dataset.color = data.color;
            piece.dataset.pieceType = data.type;
            piece.id = 'chess-piece';
            piece.style.pointerEvents = "none";
            console.log(data.color);
            if (data.color === 'white') {
                piece.style.left = rightSide + 'px';
                piece.style.top = topRight + 'px';
                piece.dataset.resetX = rightSide, topRight;
                piece.dataset.resetY = topRight;
                topRight += 50;
                if(topRight> 400){
                    topRight = 20;
                    rightSide -= 50;
                }
            } else {
                piece.style.left = leftSide + 'px';
                piece.style.top = topLeft + 'px';
                piece.dataset.resetX = leftSide;
                piece.dataset.resetY = topLeft;
                topLeft += 50;
                if(topLeft> 400){
                    topLeft = 20;
                    leftSide -= 50;
                }
            }
            fragment.append(piece);

        });
        pieceBoard.append(fragment)
        return pieceBoard;
    }
}