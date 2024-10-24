const stateTemplate = {
  selectedSection: 'card',
  sections: {
    card: {
      contentSettings: {
        width: '500',
        height: '500',
        backgroundColor: '#00ff00',
      },
      textSettings: {
        content: 'No text for card, use Middle instead!',
        bold: false,
        italic: false,
      },
      borderSettings: {

      },
    },
    top: {
      dimensions: { width: '500', height: '50' },
      style: {
        backgroundColor: '',
        textStyle: {
          content: 'Top',
          bold: false,
          italic: false,
        },
      },
    },
    bottom: {
      dimensions: { width: '500', height: '50' },
      style: {
        backgroundColor: '',
        textStyle: {
          content: 'Bottom',
          bold: false,
          italic: false,
        },
      },
    },
    right: {
      dimensions: { width: '50', height: '400' },
      style: {
        backgroundColor: '',
        textStyle: {
          content: 'Right',
          bold: false,
          italic: false,
        },
      },
    },
    left: {
      dimensions: { width: '50', height: '400' },
      style: {
        backgroundColor: '',
        textStyle: {
          content: 'Left',
          bold: false,
          italic: false,
        },
      },
    },
    middle: {
      dimensions: { width: '400', height: '400' },
      style: {
        backgroundColor: '',
        textStyle: {
          content: 'Middle',
          bold: false,
          italic: false,
        },
      },
    },
  },
};

export function resetState() {
  state = JSON.parse(JSON.stringify(stateTemplate));
  updateUIElements();
  generateHTML();
}

export let state = JSON.parse(JSON.stringify(stateTemplate));