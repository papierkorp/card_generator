const sectionTemplate = {
  content: {
    type: 'text',
    value: '',
  },
  style: {
    backgroundColor: '',
  },
  border: {
    top: false,
    right: false,
    bottom: false,
    left: false,
    width: 1,
    type: 'solid',
    color: '#000000',
    radius: 0,
  },
  shadow: {
    enabled: false,
    inset: false,
    right: 0,
    down: 0,
    spread: 0,
    blur: 0,
    opacity: 100,
    color: '#000000',
  },
  dimensions: {
    width: 'auto',
    height: 'auto',
  },
  text: {
    fontSize: 16,
    fontFamily: 'Arial',
    color: '#000000',
    alignment: 'left',
    bold: false,
    italic: false,
    underline: false,
    strikethrough: false,
    highlight: false,
  },
};

export function createState() {
  const state = {
    sections: {
      card: {
        ...sectionTemplate,
        content: null,
        dimensions: { width: 400, height: 600 },
      },
      top: { ...sectionTemplate, content: { ...sectionTemplate.content, value: 'Top Edge Content' } },
      right: { ...sectionTemplate, content: { ...sectionTemplate.content, value: 'Right Edge Content' } },
      bottom: { ...sectionTemplate, content: { ...sectionTemplate.content, value: 'Bottom Edge Content' } },
      left: { ...sectionTemplate, content: { ...sectionTemplate.content, value: 'Left Edge Content' } },
      middle1: {
        ...sectionTemplate,
        content: { ...sectionTemplate.content, value: 'Middle Content 1' },
        dimensions: { ...sectionTemplate.dimensions, height: 50 },
      },
    },
    selectedSection: 'card',
  };

  function setState(newState) {
    Object.assign(state, newState);
  }

  function getState() {
    return { ...state };
  }

  function getCardDimensions() {
    return { ...state.sections.card.dimensions };
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

  function updateCardDimensions(dimensions) {
    state.sections.card.dimensions = { ...state.sections.card.dimensions, ...dimensions };
  }

  function addMiddleSection() {
    const middleSections = Object.keys(state.sections).filter((key) => key.startsWith('middle'));
    const newIndex = middleSections.length + 1;
    const newSectionKey = `middle${newIndex}`;
    state.sections[newSectionKey] = {
      ...sectionTemplate,
      content: { ...sectionTemplate.content, value: `Middle Content ${newIndex}` },
      dimensions: { ...sectionTemplate.dimensions, height: 50 },
    };
    setSelectedSection(newSectionKey);
  }

  function deleteMiddleSection(sectionKey) {
    if (state.sections[sectionKey] && sectionKey.startsWith('middle')) {
      delete state.sections[sectionKey];
      state.selectedSection = 'card';
    }
  }

  return {
    setState,
    getState,
    getCardDimensions,
    getSelectedSection,
    getSection,
    getAllSections,
    updateSection,
    updateSelectedSection,
    setSelectedSection,
    updateCardDimensions,
    addMiddleSection,
    deleteMiddleSection,
  };
}
