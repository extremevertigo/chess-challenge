import EventBus from './third-party/simple-event-bus.js';
import jsxElem, { render } from './third-party/jaredsartin-jsx-no-react.js';
import htm from 'https://unpkg.com/htm?module'
import { globalSettings } from './arrays.js';
import GameEvents from './gameevents.js';
const html = htm.bind(jsxElem.createElement);
const gameevents = new GameEvents();

/**
 * Loads Game and sets up EventBus events
 */
function loadGame(){
  render(html`
  <div id='viewport'>
  <chess-board />
  <chess-controls />
  </div>`, document.body);
  window.chessEvents = new EventBus('Chess Events');
  window.chessEvents.on('reset', ()=>{ gameevents.resetGame();});
  window.chessEvents.on('move', (detail)=>{ gameevents.movePiece(detail.detail);});
  window.onload = ()=>{
    gameevents.setupPieces();
  }

}

/**
 * Calling local storage to check the board positions of pieces before we load anything
 */
function checkLocalStorage() {
  let storedSettings = localStorage.getItem("boardArray");
  globalSettings.boardArray = storedSettings ? JSON.parse(storedSettings) : gameevents.setupBoardArray();
  localStorage.setItem("boardArray", JSON.stringify(globalSettings.boardArray));
  loadGame();
}

checkLocalStorage();
