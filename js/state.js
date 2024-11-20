const stateTemplate = {
  selectedSection: 'card',
  sections: {
    card: {
      contentSettings: {
        width: '500',
        height: '500',
        leftPosition: '0',
        topPosition: '0',
        rightPosition: '0',
        bottomPosition: '0',
        backgroundColor: '#00ff00',
        content: 'No text for card, use Middle instead!',
      },
      textSettings: {
        bold: false,
        italic: false,
        underline: false,
        fontsize: '16',
        fontFamily: 'Arial',
        fontColor: '#000000',
        textAlign: 'center',
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
        shadowShiftRight: '0',
        shadowShiftDown: '0',
        shadowSpread: '0',
        shadowBlur: '0',
        shadowOpacity: '50',
        shadowColor: '#000000',
      },
    },
    top: {
      contentSettings: {
        width: '100',
        height: '10',
        leftPosition: '0',
        topPosition: '0',
        rightPosition: '0',
        bottomPosition: '90',
        backgroundColor: '',
        content: 'Top',
      },
      textSettings: {
        bold: false,
        italic: false,
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
        shadowShiftRight: '0',
        shadowShiftDown: '0',
        shadowSpread: '0',
        shadowBlur: '0',
        shadowOpacity: '50',
        shadowColor: '#000000',
      },
    },
    bottom: {
      contentSettings: {
        width: '100',
        height: '10',
        leftPosition: '0',
        topPosition: '90',
        rightPosition: '0',
        bottomPosition: '0',
        backgroundColor: '',
        content: 'Bottom',
      },
      textSettings: {
        bold: false,
        italic: false,
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
        shadowShiftRight: '0',
        shadowShiftDown: '0',
        shadowSpread: '0',
        shadowBlur: '0',
        shadowOpacity: '50',
        shadowColor: '#000000',
      },
    },
    right: {
      contentSettings: {
        width: '10',
        height: '80',
        leftPosition: '80',
        topPosition: '0',
        rightPosition: '0',
        bottomPosition: '0',
        backgroundColor: '',
        content: 'Right',
      },
      textSettings: {
        bold: false,
        italic: false,
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
        shadowShiftRight: '0',
        shadowShiftDown: '0',
        shadowSpread: '0',
        shadowBlur: '0',
        shadowOpacity: '50',
        shadowColor: '#000000',
      },
    },
    left: {
      contentSettings: {
        width: '10',
        height: '80',
        leftPosition: '0',
        topPosition: '0',
        rightPosition: '0',
        bottomPosition: '0',
        backgroundColor: '',
        content: 'Left',
      },
      textSettings: {
        bold: false,
        italic: false,
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
        shadowShiftRight: '0',
        shadowShiftDown: '0',
        shadowSpread: '0',
        shadowBlur: '0',
        shadowOpacity: '50',
        shadowColor: '#000000',
      },
    },
    middle: {
      contentSettings: {
        width: '80',
        height: '80',
        leftPosition: '0',
        topPosition: '0',
        rightPosition: '0',
        bottomPosition: '0',
        backgroundColor: '',
        content: 'Middle',
      },
      textSettings: {
        bold: false,
        italic: false,
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
        shadowShiftRight: '0',
        shadowShiftDown: '0',
        shadowSpread: '0',
        shadowBlur: '0',
        shadowOpacity: '50',
        shadowColor: '#000000',
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
