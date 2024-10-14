import { generateHTML } from './modules/generate_html.js';
import { initialize, getState } from './core/state_manager.js';

function updatePreview() {
  const currentState = getState();
  const generatedHTML = generateHTML(currentState);
  document.getElementById('cardPreview').innerHTML = generatedHTML;
  document.getElementById('htmlOutput').textContent = generatedHTML;
}

function initializeApp() {
  initialize();
  updatePreview();

  document.addEventListener('stateChange', updatePreview);
}

document.addEventListener('DOMContentLoaded', initializeApp);
