const allElements = [
  { elementID: 'sliderHeight', eventType: 'input', inputType: 'range', stateKey: ['dimensions', 'height'] },
  { elementID: 'sliderWidth', eventType: 'input', inputType: 'range', stateKey: ['dimensions', 'width'] },
  { elementID: 'colorPicker', eventType: 'input', inputType: 'color', stateKey: ['style', 'backgroundColor'] },
  {
    elementID: 'textArea',
    eventType: 'input',
    inputType: 'textarea',
    stateKey: ['style', 'textStyle', 'content'],
  },
  {
    elementID: 'boldCheckbox',
    eventType: 'change',
    inputType: 'checkbox',
    stateKey: ['style', 'textStyle', 'bold'],
  },
];

function initialize() {
  const selectSection = document.getElementById('selectSection');
  selectSection.addEventListener('change', function () {
    state.selectedSection = this.value;
    console.log('changed selectSection to: ', this.value);
    generateHTML();
    updateUIElements();
  });

  const resetButton = document.getElementById('resetButton');
  if (resetButton) {
    resetButton.addEventListener('click', resetState);
  }

  for (const elem of allElements) {
    const element = document.getElementById(elem.elementID);
    if (element) {
      element.addEventListener(elem.eventType, function () {
        let newValue = elem.inputType === 'checkbox' ? this.checked : this.value;

        let target = state.sections[state.selectedSection];
        for (let i = 0; i < elem.stateKey.length - 1; i++) {
          target = target[elem.stateKey[i]];
        }
        target[elem.stateKey[elem.stateKey.length - 1]] = newValue;

        generateHTML();
        updateUIElements();

        console.log('elementID: ', elem.elementID);
        console.log('eventType: ', elem.eventType);
        console.log('inputType: ', elem.inputType);
        console.log('stateKey: ', elem.stateKey);
        console.log('newValue: ', newValue);
        console.log('state: ', state);
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

  for (const elem of allElements) {
    const element = document.getElementById(elem.elementID);
    const elementValue = document.getElementById(elem.elementID + 'Value');
    if (!element) continue;

    let value = currentSection;
    for (const key of elem.stateKey) {
      value = value[key];
    }

    if (elem.inputType === 'checkbox') {
      element.checked = value;
    } else {
      element.value = value;
    }

    if (elementValue) {
      elementValue.textContent = value;
    }

    if (elem.elementID === 'textArea') {
      element.disabled = state.selectedSection === 'card';
    }
  }
}

initialize();
