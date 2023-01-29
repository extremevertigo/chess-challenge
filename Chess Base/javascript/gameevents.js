import { globalSettings } from "./arrays.js";
/**
 * Handles the events of building a global array, add to localstorage
 * for saved game setup, sets up pieces to be on the board and animate their movement.
 */
export default class GameEvents {
    /**setting pieces to their begining places */
    setupPieces() {
        const chessPieces = document.getElementsByClassName("piece-board")[0];
        const pieces = chessPieces.querySelectorAll("div");
        pieces.forEach(p => {
            const tile = document.getElementById(p.dataset.startPos);
            const tileRect = tile.getBoundingClientRect();
            tile.dataset.currentPiece = p.dataset.pieceType;
            tile.dataset.currentColor = p.dataset.color;
            this.animateToPosition(p, tileRect.left, tileRect.top);
    
        });
    }

    movePiece(detail) {
        const startTile = detail.moveData.startTile;
        const endTile = detail.moveData.endTile;
        const chessPieces = document.getElementsByClassName("piece-board")[0];
        const pieces = chessPieces.querySelectorAll("div");
        pieces.forEach(p => {
            if(p.dataset.startPos === startTile.id){
                const endTileRect = endTile.getBoundingClientRect();
                this.animateToPosition(p, endTileRect.left, endTileRect.top);
            }
        });
    }

    animateToPosition(piece, x, y) {
        console.log(x);
        const startX = parseFloat(getComputedStyle(piece).left);
        const startY = parseFloat(getComputedStyle(piece).top);
        const endX = x;
        const endY = y;

        const duration = 2000; // 1 second
        const startTime = Date.now();


        const animateDiv = () => {
            const elapsed = Date.now() - startTime;
            const progress = elapsed / duration;

            const easedProgress = this.easeInOutCubic(progress);

            piece.style.left = startX + (endX - startX) * easedProgress + 'px';
            piece.style.top = startY + (endY - startY) * easedProgress + 'px';
            if (elapsed < duration) {
                requestAnimationFrame(animateDiv);
            }
        };
        requestAnimationFrame(animateDiv);
    }

    easeInOutCubic(x) {
        return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
    }

    resetGame()
    {
        const chessPieces = document.getElementsByClassName("piece-board")[0];
        const pieces = chessPieces.querySelectorAll("div");
        pieces.forEach(p => {
            this.animateToPosition(p, p.dataset.resetX, p.dataset.resetY);
        });
        this.setupBoardArray();
        this.updateLocalStorage();
        setTimeout(() => {
            this.setupPieces();
        }, 3000);
    }

    updateLocalStorage(){
        localStorage.setItem("boardArray", JSON.stringify(globalSettings.boardArray));
    }

    setupBoardArray() {
        const newArray = [];
        const startingPieceRow = ["rook", "knight", "bishop", "queen", "king", "bishop", "knight", "rook"];
        for (let i = 8; i > 0; i--) {
          const newRow = [];
          for (let j = 0; j < 8; j++) {
            const letter = (j + 10).toString(36);
            let pieceName = null;
            let color = null;
            if (i === 8 || i === 1) {
              pieceName = startingPieceRow[j];
              color = i == 8 ? 'black' : 'white';
            }
            if (i === 7 || i === 2) {
              pieceName = "pawn";
              color = i == 7 ? 'black' : 'white';
            }
            newRow.push({ id: letter + i, startPiece: pieceName, color: color });
          }
          newArray.push(newRow);
        }
        return newArray;
      }
    }
