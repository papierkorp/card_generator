import { state } from './state.js';

function createSectionElement(section, sectionName) {
  const element = document.createElement('div');
  element.style.backgroundColor = section.contentSettings.backgroundColor;
  element.style.display = 'flex';
  element.style.alignItems = 'center';
  element.style.justifyContent = 'center';
  element.style.overflow = 'hidden';
  element.style.position = 'absolute';

  // const textElement = document.createElement('p');
  element.style.margin = '0';
  element.style.padding = '5px';
  element.style.textAlign = 'center';
  element.style.wordWrap = 'break-word';
  element.style.fontWeight = section.textSettings.bold ? 'bold' : '';
  element.style.fontStyle = section.textSettings.italic ? 'italic' : '';

  if (sectionName !== 'card') {
    element.textContent = section.contentSettings.content;
  }

  // element.appendChild(textElement);
  return element;
}

export function generateHTML() {
  const preview = document.getElementById('previewSettings');
  const card = createSectionElement(state.sections.card, 'card');
  card.style.position = 'relative';
  card.style.width = state.sections.card.contentSettings.width + 'px';
  card.style.height = state.sections.card.contentSettings.height + 'px';

  if (state.sections.top.contentSettings.content) {
    const top = createSectionElement(state.sections.top, 'top');
    top.style.top = '0';
    top.style.left = '0';
    top.style.width = '100%';
    top.style.height = state.sections.contentSettings.height + 'px';
    card.appendChild(top);
  }

  if (state.sections.bottom.contentSettings.content) {
    const bottom = createSectionElement(state.sections.bottom, 'bottom');
    bottom.style.bottom = '0';
    bottom.style.left = '0';
    bottom.style.width = '100%';
    bottom.style.height = state.sections.bottom.contentSettings.height + 'px';
    card.appendChild(bottom);
  }

  if (state.sections.left.contentSettings.content) {
    const left = createSectionElement(state.sections.left, 'left');
    left.style.top = state.sections.top.contentSettings.height + 'px';
    left.style.left = '0';
    left.style.width = state.sections.left.contentSettings.width + 'px';
    left.style.height = `calc(100% - ${parseInt(state.sections.top.contentSettings.height) + parseInt(state.sections.bottom.contentSettings.height)}px)`;
    card.appendChild(left);
  }

  if (state.sections.right.contentSettings.content) {
    const right = createSectionElement(state.sections.right, 'right');
    right.style.top = state.sections.top.contentSettings.height + 'px';
    right.style.right = '0';
    right.style.width = state.sections.right.contentSettings.width + 'px';
    right.style.height = `calc(100% - ${parseInt(state.sections.top.contentSettings.height) + parseInt(state.sections.bottom.contentSettings.height)}px)`;
    card.appendChild(right);
  }

  if (state.sections.middle.contentSettings.content) {
    const middle = createSectionElement(state.sections.middle, 'middle');
    middle.style.top = state.sections.top.contentSettings.height + 'px';
    middle.style.left = state.sections.left.contentSettings.width + 'px';
    middle.style.width = `calc(100% - ${parseInt(state.sections.left.contentSettings.width) + parseInt(state.sections.right.contentSettings.width)}px)`;
    middle.style.height = `calc(100% - ${parseInt(state.sections.top.contentSettings.height) + parseInt(state.sections.bottom.contentSettings.height)}px)`;
    card.appendChild(middle);
  }

  preview.innerHTML = '';
  preview.appendChild(card);

  // scalePreview();
}

// function scalePreview() {
//   const previewContainer = document.getElementById('previewContainer');
//   const preview = document.getElementById('preview');
//   const card = preview.firstChild;

//   if (!previewContainer || !preview || !card) return;

//   const containerWidth = previewContainer.clientWidth;
//   const containerHeight = previewContainer.clientHeight;
//   const cardWidth = parseInt(state.sections.card.dimensions.width);
//   const cardHeight = parseInt(state.sections.card.dimensions.height);
//   const scaleX = containerWidth / cardWidth;
//   const scaleY = containerHeight / cardHeight;
//   const scale = Math.min(scaleX, scaleY, 1); // Don't scale up, only down if necessary

//   card.style.transform = `scale(${scale})`;
//   card.style.transformOrigin = 'top left';

//   const translateX = (containerWidth - cardWidth * scale) / 2;
//   const translateY = (containerHeight - cardHeight * scale) / 2;
//   preview.style.position = 'relative';
//   preview.style.width = `${cardWidth}px`;
//   preview.style.height = `${cardHeight}px`;
//   preview.style.transform = `translate(${translateX}px, ${translateY}px)`;
// }
