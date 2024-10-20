import { createState } from './state.js';
import {
  initializeHelpers,
  updateCardDimensions,
  setSelectedSection,
  addInputListener,
  addChangeListener,
  addClickListener,
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
    updateCardDimensions({ width: parseInt(value) });
  });
  addInputListener('cardHeight', (value) => {
    updateCardDimensions({ height: parseInt(value) });
  });

  addChangeListener('contentSelector', (value) => {
    setSelectedSection(value);
    const middleSectionButtons = document.getElementById('middleSectionButtons');
    if (value.startsWith('middle')) {
      middleSectionButtons.style.display = 'flex';
      const middleSections = Object.keys(state.getState().sections).filter((key) => key.startsWith('middle'));
      const deleteButton = document.getElementById('deleteMiddleSection');
      deleteButton.disabled = middleSections.length <= 1;
      deleteButton.classList.toggle('opacity-50', middleSections.length <= 1);
    } else {
      middleSectionButtons.style.display = 'none';
    }
  });
}


function contentEventListener() {
  addInputListener('sectionHeightSlider', (value) => {
    updateSelectedSection({ dimensions: { height: parseInt(value) } });
  });

  addInputListener('sectionWidthSlider', (value) => {
    updateSelectedSection({ dimensions: { width: parseInt(value) } });
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

  addClickListener('addMiddleSection', () => {
    state.addMiddleSection();

    const contentSelector = document.getElementById('contentSelector');
    const currentState = state.getState();
    const middleSections = Object.keys(currentState.sections).filter((key) => key.startsWith('middle'));

    Array.from(contentSelector.options).forEach((option) => {
      if (option.value.startsWith('middle')) {
        contentSelector.removeChild(option);
      }
    });

    middleSections.forEach((sectionKey) => {
      const option = document.createElement('option');
      option.value = sectionKey;
      option.textContent = `Middle Section ${sectionKey.slice(6)}`;
      contentSelector.appendChild(option);
    });

    contentSelector.value = middleSections[middleSections.length - 1];

    const middleSectionButtons = document.getElementById('middleSectionButtons');
    middleSectionButtons.style.display = 'flex';
    const deleteButton = document.getElementById('deleteMiddleSection');
    deleteButton.disabled = false;
    deleteButton.classList.remove('opacity-50');
  });

  addClickListener('deleteMiddleSection', () => {
    const selectedSection = state.getSelectedSection();
    state.deleteMiddleSection(selectedSection);

    const contentSelector = document.getElementById('contentSelector');
    const currentState = state.getState();
    const middleSections = Object.keys(currentState.sections).filter((key) => key.startsWith('middle'));

    Array.from(contentSelector.options).forEach((option) => {
      if (option.value.startsWith('middle')) {
        contentSelector.removeChild(option);
      }
    });

    middleSections.forEach((sectionKey) => {
      const option = document.createElement('option');
      option.value = sectionKey;
      option.textContent = `Middle Section ${sectionKey.slice(6)}`;
      contentSelector.appendChild(option);
    });

    contentSelector.value = middleSections.length > 0 ? middleSections[0] : 'card';

    const middleSectionButtons = document.getElementById('middleSectionButtons');
    if (middleSections.length > 0) {
      middleSectionButtons.style.display = 'flex';
      const deleteButton = document.getElementById('deleteMiddleSection');
      deleteButton.disabled = middleSections.length <= 1;
      deleteButton.classList.toggle('opacity-50', middleSections.length <= 1);
    } else {
      middleSectionButtons.style.display = 'none';
    }
  });
}

function borderEventListener() {
  // Border type
  addChangeListener('borderType', (value) => {
    updateSelectedSection({ border: { type: value } });
  });

  // Border width
  addInputListener('borderWidth', (value) => {
    updateSelectedSection({ border: { width: parseInt(value) } });
  });

  // Border color
  addChangeListener('borderColor', (value) => {
    updateSelectedSection({ border: { color: value } });
  });

  // Border radius
  addInputListener('borderRadius', (value) => {
    updateSelectedSection({ border: { radius: parseInt(value) } });
  });

  // Border sides
  ['top', 'right', 'bottom', 'left'].forEach((side) => {
    addChangeListener(side, (isChecked) => {
      const currentState = getSelectedSectionState();
      const newBorderState = {
        ...currentState.border,
        [side]: isChecked,
      };
      updateSelectedSection({ border: newBorderState });
    });
  });

  // Shadow settings
  addClickListener('shadowEnabled', () => {
    const currentState = getSelectedSectionState();
    const newShadowState = {
      ...currentState.shadow,
      enabled: currentState.shadow?.enabled === undefined ? true : !currentState.shadow.enabled,
    };
    updateSelectedSection({ shadow: newShadowState });
  });

  addClickListener('shadowInset', () => {
    const currentState = getSelectedSectionState();
    const newShadowState = {
      ...currentState.shadow,
      inset: currentState.shadow?.inset === undefined ? true : !currentState.shadow.inset,
    };
    updateSelectedSection({ shadow: newShadowState });
  });

  addInputListener('shadowRight', (value) => {
    updateSelectedSection({ shadow: { right: parseInt(value) } });
  });

  addInputListener('shadowDown', (value) => {
    updateSelectedSection({ shadow: { down: parseInt(value) } });
  });

  addInputListener('shadowSpread', (value) => {
    updateSelectedSection({ shadow: { spread: parseInt(value) } });
  });

  addInputListener('shadowBlur', (value) => {
    updateSelectedSection({ shadow: { blur: parseInt(value) } });
  });

  addInputListener('shadowOpacity', (value) => {
    updateSelectedSection({ shadow: { opacity: parseInt(value) } });
  });

  addChangeListener('shadowColor', (value) => {
    updateSelectedSection({ shadow: { color: value } });
  });
}

function textEventListener() {
  // Add text-related event listeners here if needed
}

export function getState() {
  return state.getState();
}
