// core/state.js

export function createState() {
  const state = {
    dimensions: { width: '400px', height: '600px' },
    sections: {
      card: { content: null, style: {}, border: {} },
      top: { content: { type: 'text', value: 'Top Edge Content' }, style: {}, border: {} },
      right: { content: { type: 'text', value: 'Right Edge Content' }, style: {}, border: {} },
      bottom: { content: { type: 'text', value: 'Bottom Edge Content' }, style: {}, border: {} },
      left: { content: { type: 'text', value: 'Left Edge Content' }, style: {}, border: {} },
      middle1: { content: { type: 'text', value: 'Middle Content 1' }, style: {}, border: {}, height: 50 },
      middle2: { content: { type: 'text', value: 'Middle Content 2' }, style: {}, border: {}, height: 50 },
      middle3: { content: { type: 'text', value: 'Middle Content 3' }, style: {}, border: {}, height: 50 },
      middle4: { content: { type: 'text', value: 'Middle Content 4' }, style: {}, border: {}, height: 50 },
      middle5: { content: { type: 'text', value: 'Middle Content 5' }, style: {}, border: {}, height: 50 },
      middle6: { content: { type: 'text', value: 'Middle Content 6' }, style: {}, border: {}, height: 50 },
      middle7: { content: { type: 'text', value: 'Middle Content 7' }, style: {}, border: {}, height: 50 },
    },
    selectedSection: 'card',
  };

  function setState(newState) {
    Object.assign(state, newState);
  }

  function getState() {
    return { ...state };
  }

  function getDimensions() {
    return { ...state.dimensions };
  }

  function getSelectedSection() {
    return state.selectedSection;
  }

  function getSection(sectionName) {
    return state.sections[sectionName] ? { ...state.sections[sectionName] } : null;
  }

  function getAllSections() {
    return { ...state.sections };
  }

  function updateSection(sectionName, updates) {
    if (state.sections[sectionName]) {
      state.sections[sectionName] = {
        ...state.sections[sectionName],
        ...updates,
      };
    }
  }

  function updateSelectedSection(updates) {
    updateSection(state.selectedSection, updates);
  }

  function setSelectedSection(sectionName) {
    if (state.sections[sectionName]) {
      state.selectedSection = sectionName;
    }
  }

  function updateDimensions(dimensions) {
    state.dimensions = { ...state.dimensions, ...dimensions };
  }

  return {
    setState,
    getState,
    getDimensions,
    getSelectedSection,
    getSection,
    getAllSections,
    updateSection,
    updateSelectedSection,
    setSelectedSection,
    updateDimensions,
  };
}
