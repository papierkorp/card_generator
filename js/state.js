const stateTemplate = {
  selectedSection: "card",
  sections: {
    card: {
      contentSettings: {
        width: "500",
        height: "500",
        backgroundColor: "#00ff00",
        content: "No text for card, use Middle instead!",
      },
      textSettings: {
        bold: false,
        italic: false,
        underline: false,
        fontsize: "16",
        fontFamily: "Arial",
        fontColor: "#000000",
        textAlign: "center",
      },
      borderSettings: {},
    },
    top: {
      contentSettings: {
        width: "500",
        height: "50",
        backgroundColor: "",
        content: "Top",
      },
      textSettings: {
        bold: false,
        italic: false,
      },
      borderSettings: {},
    },
    bottom: {
      contentSettings: {
        width: "500",
        height: "50",
        backgroundColor: "",
        content: "Bottom",
      },
      textSettings: {
        bold: false,
        italic: false,
      },
      borderSettings: {},
    },
    right: {
      contentSettings: {
        width: "50",
        height: "400",
        backgroundColor: "",
        content: "Right",
      },
      textSettings: {
        bold: false,
        italic: false,
      },
      borderSettings: {},
    },
    left: {
      contentSettings: {
        width: "50",
        height: "400",
        backgroundColor: "",
        content: "Left",
      },
      textSettings: {
        bold: false,
        italic: false,
      },
      borderSettings: {},
    },
    middle: {
      contentSettings: {
        width: "400",
        height: "400",
        backgroundColor: "",
        content: "Middle",
      },
      textSettings: {
        bold: false,
        italic: false,
      },
      borderSettings: {},
    },
  },
};

export function resetState() {
  state = JSON.parse(JSON.stringify(stateTemplate));
  updateUIElements();
  generateHTML();
}

export let state = JSON.parse(JSON.stringify(stateTemplate));
