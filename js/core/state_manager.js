import { createState } from './state.js';
import {
  initializeHelpers,
  updateDimensions,
  setSelectedSection,
  addInputListener,
  addChangeListener,
  addClickListener,
  updateElementValue,
  getDefaultContent,
  updateSelectedSection,
  updateSection,
  getSelectedSectionState,
} from './state_helper.js';

const state = createState();
initializeHelpers(state);

export function initialize() {
  borderEventListener();
  cardEventListener();
  contentEventListener();
  textEventListener();
}

function cardEventListener() {
  addInputListener('cardWidth', (value) => {
    updateDimensions({ width: parseInt(value) });
  });
  addInputListener('cardHeight', (value) => {
    updateDimensions({ height: parseInt(value) });
  });
  addChangeListener('contentSelector', (value) => {
    setSelectedSection(value);
  });
}

function borderEventListener() {}

function contentEventListener() {
  function toggleContentSettings() {
    const selectedSection = state.getSelectedSection();
    const contentEditor = document.getElementById('contentEditor');
    const sectionDimensions = document.getElementById('sectionDimensions');
    const isCardSelected = selectedSection === 'card';

    if (contentEditor) {
      contentEditor.style.display = isCardSelected ? 'none' : 'block';
    }
    if (sectionDimensions) {
      sectionDimensions.style.display = isCardSelected ? 'none' : 'flex';
    }

    // Update displayed values based on the selected section
    updateDisplayedValues();
  }

  function updateDisplayedValues() {
    const sectionState = getSelectedSectionState();
    if (sectionState) {
      updateElementValue('textContent', sectionState.content?.value || '');
      updateElementValue('sectionHeightSlider', sectionState.height || 50);
      updateElementValue('sectionWidthSlider', sectionState.width || 50);
      updateElementValue('backgroundColor', sectionState.style?.backgroundColor || '#ffffff');
    }
  }

  toggleContentSettings();
  document.getElementById('contentSelector').addEventListener('change', toggleContentSettings);

  addInputListener('sectionHeightSlider', (value) => {
    updateSelectedSection({ height: parseInt(value) });
  });

  addInputListener('sectionWidthSlider', (value) => {
    updateSelectedSection({ width: parseInt(value) });
  });

  addChangeListener('backgroundColor', (value) => {
    updateSelectedSection({ style: { backgroundColor: value } });
  });

  addChangeListener('textContent', (value) => {
    updateSelectedSection({ content: { type: 'text', value: value } });
  });

  addClickListener('saveContent', () => {
    const textContent = document.getElementById('textContent').value;
    updateSelectedSection({ content: { type: 'text', value: textContent } });
  });

  addClickListener('resetContent', () => {
    const selectedSection = state.getSelectedSection();
    const defaultContent = getDefaultContent(selectedSection);
    updateSection(selectedSection, { content: { type: 'text', value: defaultContent } });
    document.getElementById('textContent').value = defaultContent;
  });
}

function textEventListener() {}

export function getState() {
  return state.getState();
}
