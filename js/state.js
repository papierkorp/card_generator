const divTemplate = {
  contentSettings: {
    width: '20',
    height: '20',
    leftPosition: '0',
    topPosition: '0',
    backgroundColor: '#FFFFFF',
    content: '',
  },
  textSettings: {
    bold: false,
    italic: false,
    underline: false,
    fontsize: '16',
    fontFamily: 'Arial',
    fontColor: '#000000',
    textAlign: 'left',
    writingMode: 'horizontal-tb',
    wordSpacing: '0',
    lineHeight: '1.2',
  },
  borderSettings: {
    topBorder: false,
    rightBorder: false,
    bottomBorder: false,
    leftBorder: false,
    borderType: 'solid',
    borderSize: '1',
    borderColor: '#000000',
    borderRadius: '0',
    shadow: false,
    insetShadow: false,
    shadowShiftRight: '1',
    shadowShiftDown: '1',
    shadowSpread: '0',
    shadowBlur: '0',
    shadowOpacity: '50',
    shadowColor: '#000000',
  },
};

const stateTemplate = {
  selectedSection: 'card',
  sections: {
    card: {
      contentSettings: {
        width: '500',
        height: '500',
        backgroundColor: '#ffffff',
        content: '',
      },
      textSettings: { ...divTemplate.textSettings },
      borderSettings: { ...divTemplate.borderSettings },
    },
    divs: {},
    divCounter: 0,
  },
};

const defaultDivs = [
  {
    name: 'Top',
    contentSettings: {
      width: '100',
      height: '10',
      leftPosition: '0',
      topPosition: '0',
      backgroundColor: '#ADD8E6',
      content: 'Top',
    },
  },
  {
    name: 'Left',
    contentSettings: {
      width: '10',
      height: '80',
      leftPosition: '0',
      topPosition: '10',
      backgroundColor: '#90EE90',
      content: 'Left',
    },
  },
  {
    name: 'Right',
    contentSettings: {
      width: '10',
      height: '80',
      leftPosition: '90',
      topPosition: '10',
      backgroundColor: '#dddd5a',
      content: 'Right',
    },
  },
  {
    name: 'Bottom',
    contentSettings: {
      width: '100',
      height: '10',
      leftPosition: '0',
      topPosition: '90',
      backgroundColor: '#FFB6C1',
      content: 'Bottom',
    },
  },
  {
    name: 'Middle',
    contentSettings: {
      width: '80',
      height: '80',
      leftPosition: '10',
      topPosition: '10',
      backgroundColor: '#ff7afb',
      content: 'Middle',
    },
  },
];

function createDiv(settings = {}) {
  return {
    contentSettings: {
      ...divTemplate.contentSettings,
      ...settings.contentSettings,
    },
    textSettings: {
      ...divTemplate.textSettings,
      ...settings.textSettings,
    },
    borderSettings: {
      ...divTemplate.borderSettings,
      ...settings.borderSettings,
    },
  };
}

function createDefaultDivs() {
  defaultDivs.forEach((divSettings) => {
    state.sections.divs[state.sections.divCounter++] = createDiv(divSettings);
  });
}

export function addDiv() {
  const newId = state.sections.divCounter++;
  const newSettings = {
    contentSettings: {
      width: '20',
      height: '20',
      leftPosition: String(10 + ((newId * 5) % 80)),
      topPosition: String(10 + ((newId * 5) % 80)),
      backgroundColor: '#FFE4B5', // Moccasin
      content: `Div ${newId}`,
    },
  };

  if (!state.sections.divs) {
    state.sections.divs = {};
  }

  state.sections.divs[newId] = createDiv(newSettings);
}

export function deleteDiv(divId) {
  if (state.sections.divs && state.sections.divs[divId]) {
    delete state.sections.divs[divId];
    state.selectedSection = 'card';
  }
}

export function resetToEmpty() {
  state = JSON.parse(JSON.stringify(stateTemplate));
  console.log('reset to empty');
  return state;
}

export function resetToTemplate() {
  state = JSON.parse(JSON.stringify(stateTemplate));
  state.sections.divs = {};
  state.sections.divCounter = 0;
  createDefaultDivs();
  console.log('reset to Template');
  return state;
}

// Initialize state with template and add default divs
export let state = JSON.parse(JSON.stringify(stateTemplate));
createDefaultDivs();
