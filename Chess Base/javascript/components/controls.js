import jsxElem, { render, renderAppend } from '../third-party/jaredsartin-jsx-no-react.js';
import htm from 'https://unpkg.com/htm?module'
const html = htm.bind(jsxElem.createElement);

/**
 * Sets up reset button and uses the EventBus to emit a reset event to reset the game
 */
class ChessControls extends HTMLElement {
  connectedCallback() {
    // Replace contents with this render
    render(html`<h1>Chess Controls</h1>`, this);

    // Example events for moves
    // Render append will append the elements to the container
    renderAppend(html`<button onClick=${() => chessEvents.emit('reset', {from: 'e7', to: 'e5'})}>Reset Game</button>`, this);
  }
}

customElements.define('chess-controls', ChessControls);