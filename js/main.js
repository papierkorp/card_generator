import { generateHTML, scalePreview } from './generate_html.js';
import { initialize, getState } from './state_manager.js';

function updatePreview() {
  const currentState = getState();
  const generatedHTML = generateHTML(currentState);
  document.getElementById('cardPreview').innerHTML = generatedHTML;
  document.getElementById('htmlOutput').textContent = generatedHTML;
  scalePreview();
}

function initializeApp() {
  initialize();
  updatePreview();

  document.addEventListener('stateChange', updatePreview);
  window.addEventListener('resize', scalePreview);
}

document.addEventListener('DOMContentLoaded', initializeApp);
