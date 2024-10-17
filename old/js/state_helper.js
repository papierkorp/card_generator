let state;

export function initializeHelpers(stateObject) {
  state = stateObject;
}

function dispatchStateChangeEvent() {
  const event = new CustomEvent('stateChange', { detail: state.getState() });
  document.dispatchEvent(event);
}

// Helper functions for state updates
export function updateCardDimensions(updates) {
  state.updateCardDimensions(updates);
}

export function setSelectedSection(sectionName) {
  state.setSelectedSection(sectionName);
}

export function updateSelectedSection(updates) {
  const selectedSection = state.getSelectedSection();
  state.updateSection(selectedSection, updates);
}

export function updateSection(sectionName, updates) {
  state.updateSection(sectionName, updates);
}

// Helper functions for event listeners
export function addInputListener(elementId, updateFn) {
  const element = document.getElementById(elementId);
  if (element) {
    element.addEventListener('input', () => {
      const newValue = element.value;
      updateFn(newValue);
      updateElementValue(elementId + 'Value', newValue);
      dispatchStateChangeEvent();
    });
  }
}

export function addChangeListener(elementId, updateFn) {
  const element = document.getElementById(elementId);
  if (element) {
    element.addEventListener('change', () => {
      const newValue = element.value;
      updateFn(newValue);
      updateElementValue(elementId, newValue);
      dispatchStateChangeEvent();
    });
  }
}

export function addClickListener(elementId, updateFn) {
  const element = document.getElementById(elementId);
  if (element) {
    element.addEventListener('click', () => {
      updateFn();
      dispatchStateChangeEvent();
    });
  }
}

export function addCheckboxListener(name, updateFn) {
  const checkboxes = document.querySelectorAll(`input[type="checkbox"][name="${name}"]`);
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
      const value = checkbox.value;
      const isChecked = checkbox.checked;
      updateFn(value, isChecked);
      dispatchStateChangeEvent();
    });
  });
}

function updateElementValue(elementId, value) {
  const element = document.getElementById(elementId);
  if (element) {
    if (element.tagName === 'INPUT' || element.tagName === 'SELECT' || element.tagName === 'TEXTAREA') {
      element.value = value;
    } else {
      element.textContent = value;
    }
  } else {
    consol;
    e.warn(`Element with id '${elementId}' not found.`);
  }
}

// Helper function to get default content for each section
export function getDefaultContent(section) {
  const defaultContents = {
    top: 'Top Edge Content',
    right: 'Right Edge Content',
    bottom: 'Bottom Edge Content',
    left: 'Left Edge Content',
    middle1: 'Middle Content 1',
  };
  return defaultContents[section] || '';
}

export function getSelectedSectionState() {
  const selectedSection = state.getSelectedSection();
  return state.getSection(selectedSection);
}
