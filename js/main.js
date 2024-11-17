import { state, resetState } from "./state.js";
import { generateHTML } from "./generateHTML.js";

const allElements = [
  {
    elementID: "heightSlider",
    eventType: "input",
    inputType: "range",
    stateKey: ["contentSettings", "height"],
  },
  {
    elementID: "widthSlider",
    eventType: "input",
    inputType: "range",
    stateKey: ["contentSettings", "width"],
  },
  {
    elementID: "bgColor",
    eventType: "input",
    inputType: "color",
    stateKey: ["contentSettings", "backgroundColor"],
  },
  {
    elementID: "textArea",
    eventType: "input",
    inputType: "textarea",
    stateKey: ["contentSettings", "content"],
  },
  {
    elementID: "fontSizeSlider",
    eventType: "input",
    inputType: "range",
    stateKey: ["textSettings", "fontsize"],
  },
  {
    elementID: "boldCheckbox",
    eventType: "change",
    inputType: "checkbox",
    stateKey: ["textSettings", "bold"],
  },
  {
    elementID: "italicCheckbox",
    eventType: "change",
    inputType: "checkbox",
    stateKey: ["textSettings", "italic"],
  },
  {
    elementID: "underlineCheckbox",
    eventType: "change",
    inputType: "checkbox",
    stateKey: ["textSettings", "underline"],
  },
  {
    elementID: "strikethroughCheckbox",
    eventType: "change",
    inputType: "checkbox",
    stateKey: ["textSettings", "strikethrough"],
  },
  {
    elementID: "fontFamilySelect",
    eventType: "change",
    inputType: "select",
    stateKey: ["textSettings", "fontFamily"],
  },
  {
    elementID: "fontColor",
    eventType: "input",
    inputType: "color",
    stateKey: ["textSettings", "fontColor"],
  },
  {
    elementID: "textAlignLeft",
    eventType: "change",
    inputType: "radio",
    stateKey: ["textSettings", "textAlign"],
  },
  {
    elementID: "textAlignCenter",
    eventType: "change",
    inputType: "radio",
    stateKey: ["textSettings", "textAlign"],
  },
  {
    elementID: "textAlignRight",
    eventType: "change",
    inputType: "radio",
    stateKey: ["textSettings", "textAlign"],
  },
];

function initialize() {
  const selectSection = document.getElementById("sectionSelect");
  selectSection.addEventListener("change", function () {
    state.selectedSection = this.value;
    console.log("changed selectSection to: ", this.value);
    generateHTML();
    updateUIElements();
  });

  const resetButton = document.getElementById("resetButton");
  if (resetButton) {
    resetButton.addEventListener("click", resetState);
  }

  for (const elem of allElements) {
    const element = document.getElementById(elem.elementID);
    if (element) {
      element.addEventListener(elem.eventType, function () {
        console.log("ELEMENTELEMENTELEMENTELEMENT: ", element);
        let newValue;
        if (elem.inputType === "radio") {
          newValue = this.value;
        } else if (elem.inputType === "checkbox") {
          newValue = this.checked;
        } else {
          newValue = this.value;
        }

        if (
          (state.selectedSection === "card" && element.id == !"widthSlider") ||
          element.id == !"heightSlider"
        ) {
          Object.keys(state.sections).forEach((sectionKey) => {
            let target = state.sections[sectionKey];
            for (let i = 0; i < elem.stateKey.length - 1; i++) {
              target = target[elem.stateKey[i]];
            }
            target[elem.stateKey[elem.stateKey.length - 1]] = newValue;
          });
        } else {
          let target = state.sections[state.selectedSection];
          for (let i = 0; i < elem.stateKey.length - 1; i++) {
            target = target[elem.stateKey[i]];
          }
          target[elem.stateKey[elem.stateKey.length - 1]] = newValue;
        }

        generateHTML();
        updateUIElements();

        console.log("elementID: ", elem.elementID);
        console.log("eventType: ", elem.eventType);
        console.log("inputType: ", elem.inputType);
        console.log("stateKey: ", elem.stateKey);
        console.log("newValue: ", newValue);
        console.log("state: ", state);
      });
    } else {
      console.warn(`Element with ID "${elem.elementID}" not found.`);
    }
  }

  generateHTML();
  updateUIElements();
}

function updateUIElements() {
  const currentSection = state.sections[state.selectedSection];
  const cardSection = state.sections.card;

  for (const elem of allElements) {
    const element = document.getElementById(elem.elementID);
    const elementValue = document.getElementById(elem.elementID + "Value");
    if (!element) continue;

    let sectionValue = currentSection;
    for (const key of elem.stateKey) {
      sectionValue = sectionValue?.[key];
    }

    let value = sectionValue;
    if (
      (sectionValue === undefined || sectionValue === "") &&
      state.selectedSection !== "card"
    ) {
      let cardValue = cardSection;
      for (const key of elem.stateKey) {
        cardValue = cardValue?.[key];
      }
      value = cardValue;
    }

    if (elem.inputType === "checkbox") {
      element.checked = value ?? false;
    } else {
      element.value = value ?? "";
    }

    if (elementValue) {
      elementValue.textContent = value ?? "";
    }

    if (elem.inputType === "textarea") {
      element.disabled = state.selectedSection === "card";
    }
  }
}

console.log("init");
initialize();

document.addEventListener("DOMContentLoaded", () => {
  console.log("init");
  initialize();
});
