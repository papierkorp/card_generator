import { state, resetState, addDiv } from "./state.js";
import { generateHTML } from "./generateHTML.js";
import { allElements } from "./htmlElements.js";

function updateSectionSelect() {
  const selectSection = document.getElementById("sectionSelect");
  if (!selectSection) return;

  selectSection.innerHTML = `
    <option value="card">Card</option>
    ${Object.entries(state.sections.divs || {})
      .map(([id]) => `<option value="div${id}">Div ${id}</option>`)
      .join("")}
  `;
  selectSection.value = state.selectedSection;
}

function initialize() {
  // Common handler for UI updates
  const updateUI = () => {
    generateHTML();
    updateUIElements();
  };

  // Basic button handler setup
  const buttonHandlers = {
    sectionSelect: {
      event: "change",
      handler: function () {
        state.selectedSection = this.value;
      },
    },
    addMiddleButton: {
      event: "click",
      setup: (elem) => (elem.textContent = "Add Div"),
      handler: () => addDiv(),
    },
    deleteMiddleButton: {
      event: "click",
      setup: (elem) => (elem.textContent = "Delete Div"),
      handler: () => {
        if (state.selectedSection.startsWith("div")) {
          const divId = state.selectedSection.replace("div", "");
          deleteDiv(divId);
        }
      },
    },
    resetButton: {
      event: "click",
      handler: () => resetState(),
    },
    copyButton: {
      event: "click",
      setup: (elem) => (elem.textContent = "Copy HTML"),
      handler: function () {
        const htmlOutput = document.getElementById("htmlOutputSettings");
        if (!htmlOutput) return;

        const copyText = function (text) {
          if (navigator.clipboard && window.isSecureContext) {
            return navigator.clipboard.writeText(text);
          } else {
            const textArea = document.createElement("textarea");
            textArea.value = text;
            textArea.style.position = "fixed";
            textArea.style.left = "-999999px";
            textArea.style.top = "-999999px";
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();

            try {
              document.execCommand("copy");
              textArea.remove();
              return Promise.resolve();
            } catch (error) {
              textArea.remove();
              return Promise.reject(error);
            }
          }
        };

        copyText(htmlOutput.innerText)
          .then(() => {
            const button = document.getElementById("copyButton");
            button.textContent = "Copied!";

            setTimeout(() => {
              button.textContent = "Copy HTML";
            }, 2000);
          })
          .catch((err) => console.error("Failed to copy:", err));
      },
    },
  };

  // Set up basic button handlers
  Object.entries(buttonHandlers).forEach(([id, config]) => {
    const element = document.getElementById(id);
    if (element) {
      if (config.setup) config.setup(element);
      element.addEventListener(config.event, (...args) => {
        config.handler.apply(element, args);
        updateUI();
      });
    }
  });

  // Set up element handlers from allElements
  allElements.forEach((elem) => {
    const element = document.getElementById(elem.elementID);
    if (!element) {
      console.warn(`Element with ID "${elem.elementID}" not found.`);
      return;
    }

    element.addEventListener(elem.eventType, function () {
      const newValue =
        elem.inputType === "checkbox" ? this.checked : this.value;

      // Handle state updates based on section type
      if (state.selectedSection.startsWith("div")) {
        updateStateValue(
          state.sections.divs[state.selectedSection.replace("div", "")],
          elem.stateKey,
          newValue,
        );
      } else if (state.selectedSection === "card") {
        const isCardDimension = ["widthSlider", "heightSlider"].includes(
          elem.elementID,
        );

        if (isCardDimension) {
          updateStateValue(
            state.sections[state.selectedSection],
            elem.stateKey,
            newValue,
          );
        } else {
          updateStateValue(state.sections.card, elem.stateKey, newValue);
          Object.values(state.sections.divs || {}).forEach((div) => {
            updateStateValue(div, elem.stateKey, newValue);
          });
        }
      }

      console.log("elementID: ", elem.elementID);
      console.log("eventType: ", elem.eventType);
      console.log("inputType: ", elem.inputType);
      console.log("stateKey: ", elem.stateKey);
      console.log("newValue: ", newValue);
      console.log("state: ", state);

      updateUI();
    });
  });

  updateUI();
}

function updateStateValue(target, stateKeyPath, value) {
  let current = target;
  for (let i = 0; i < stateKeyPath.length - 1; i++) {
    current = current[stateKeyPath[i]];
  }
  current[stateKeyPath[stateKeyPath.length - 1]] = value;
}

function updateUIElements() {
  let currentSection;
  if (state.selectedSection.startsWith("div")) {
    const divId = state.selectedSection.replace("div", "");
    currentSection = state.sections.divs[divId];
  } else {
    currentSection = state.sections[state.selectedSection];
  }
  const cardSection = state.sections.card;

  updateSectionSelect();

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
    } else if (elem.inputType === "radio") {
      element.checked = element.value === value;
    } else {
      element.value = value ?? "";
    }

    if (elementValue) {
      elementValue.textContent = value ?? "";
    }

    // Disable textarea for card section
    if (elem.inputType === "textarea") {
      element.disabled = state.selectedSection === "card";
    }

    // Disable position sliders for card section
    if (elem.elementID.includes("Position")) {
      element.disabled = state.selectedSection === "card";
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("init");
  initialize();
});
