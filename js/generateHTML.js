import { state } from "./state.js";

function createSectionElement(section, sectionName) {
  const element = document.createElement("div");
  element.id = sectionName;
  element.style.backgroundColor = section.contentSettings.backgroundColor;
  element.style.display = "flex";
  element.style.alignItems = "center";
  element.style.justifyContent = "center";
  element.style.overflow = "hidden";
  element.style.position = "absolute";
  element.style.margin = "0";
  element.style.padding = "5px";
  element.style.textAlign = "center";
  element.style.wordWrap = "break-word";

  if (sectionName !== "card") {
    const cardSettings = state.sections.card.textSettings;

    element.style.fontWeight =
      section.textSettings.bold !== undefined
        ? section.textSettings.bold
          ? "bold"
          : "normal"
        : cardSettings.bold
          ? "bold"
          : "normal";

    element.style.fontStyle =
      section.textSettings.italic !== undefined
        ? section.textSettings.italic
          ? "italic"
          : "normal"
        : cardSettings.italic
          ? "italic"
          : "normal";

    let textDecoration = [];
    if (
      section.textSettings.underline !== undefined
        ? section.textSettings.underline
        : cardSettings.underline
    ) {
      textDecoration.push("underline");
    }
    if (
      section.textSettings.strikethrough !== undefined
        ? section.textSettings.strikethrough
        : cardSettings.strikethrough
    ) {
      textDecoration.push("line-through");
    }
    element.style.textDecoration = textDecoration.join(" ");

    element.style.fontSize =
      (section.textSettings.fontsize || cardSettings.fontsize) + "px";
    element.style.fontFamily =
      section.textSettings.fontFamily || cardSettings.fontFamily;
    element.style.color =
      section.textSettings.fontColor || cardSettings.fontColor;
    element.style.textAlign =
      section.textSettings.textAlign || cardSettings.textAlign;
  } else {
    element.style.fontWeight = section.textSettings.bold ? "bold" : "normal";
    element.style.fontStyle = section.textSettings.italic ? "italic" : "normal";
    let textDecoration = [];
    if (section.textSettings.underline) textDecoration.push("underline");
    if (section.textSettings.strikethrough) textDecoration.push("line-through");
    element.style.textDecoration = textDecoration.join(" ");
    element.style.fontSize = section.textSettings.fontsize + "px";
    element.style.fontFamily = section.textSettings.fontFamily;
    element.style.color = section.textSettings.fontColor;
    element.style.textAlign = section.textSettings.textAlign;
  }

  if (sectionName !== "card") {
    element.textContent = section.contentSettings.content;
  }

  return element;
}

export function generateHTML() {
  console.log("state: ", state);
  const preview = document.getElementById("previewSettings");
  const card = createSectionElement(state.sections.card, "card");
  card.style.position = "relative";
  card.style.width = state.sections.card.contentSettings.width + "px";
  card.style.height = state.sections.card.contentSettings.height + "px";

  if (state.sections.top.contentSettings.content) {
    const top = createSectionElement(state.sections.top, "top");
    top.style.top = "0";
    top.style.left = "0";
    top.style.width = "100%";
    top.style.height = state.sections.top.contentSettings.height + "px";
    card.appendChild(top);
  }

  if (state.sections.bottom.contentSettings.content) {
    const bottom = createSectionElement(state.sections.bottom, "bottom");
    bottom.style.bottom = "0";
    bottom.style.left = "0";
    bottom.style.width = "100%";
    bottom.style.height = state.sections.bottom.contentSettings.height + "px";
    card.appendChild(bottom);
  }

  if (state.sections.left.contentSettings.content) {
    const left = createSectionElement(state.sections.left, "left");
    left.style.top = state.sections.top.contentSettings.height + "px";
    left.style.left = "0";
    left.style.width = state.sections.left.contentSettings.width + "px";
    left.style.height = `calc(100% - ${parseInt(state.sections.top.contentSettings.height) + parseInt(state.sections.bottom.contentSettings.height)}px)`;
    card.appendChild(left);
  }

  if (state.sections.right.contentSettings.content) {
    const right = createSectionElement(state.sections.right, "right");
    right.style.top = state.sections.top.contentSettings.height + "px";
    right.style.right = "0";
    right.style.width = state.sections.right.contentSettings.width + "px";
    right.style.height = `calc(100% - ${parseInt(state.sections.top.contentSettings.height) + parseInt(state.sections.bottom.contentSettings.height)}px)`;
    card.appendChild(right);
  }

  if (state.sections.middle.contentSettings.content) {
    const middle = createSectionElement(state.sections.middle, "middle");
    middle.style.top = state.sections.top.contentSettings.height + "px";
    middle.style.left = state.sections.left.contentSettings.width + "px";
    middle.style.width = `calc(100% - ${parseInt(state.sections.left.contentSettings.width) + parseInt(state.sections.right.contentSettings.width)}px)`;
    middle.style.height = `calc(100% - ${parseInt(state.sections.top.contentSettings.height) + parseInt(state.sections.bottom.contentSettings.height)}px)`;
    card.appendChild(middle);
  }

  preview.innerHTML = "";
  preview.appendChild(card);

  requestAnimationFrame(scalePreview);
}

function scalePreview() {
  const previewContainer = document.getElementById("previewContainer");
  const preview = document.getElementById("previewSettings");
  const card = preview.firstChild;

  if (!previewContainer || !preview || !card) return;

  // Reset any existing transforms
  preview.style.transform = "";
  card.style.transform = "";

  const containerWidth = previewContainer.clientWidth;
  const containerHeight = previewContainer.clientHeight;
  const cardWidth = parseInt(state.sections.card.contentSettings.width);
  const cardHeight = parseInt(state.sections.card.contentSettings.height);

  // Add padding to container dimensions
  const paddingX = 32; // Increased padding for better visibility
  const paddingY = 60; // Increased padding for better visibility
  const availableWidth = containerWidth - paddingX;
  const availableHeight = containerHeight - paddingY;

  const scaleX = availableWidth / cardWidth;
  const scaleY = availableHeight / cardHeight;
  const scale = Math.min(scaleX, scaleY, 1);

  // Center the preview in the container
  const scaledWidth = cardWidth * scale;
  const scaledHeight = cardHeight * scale;

  // Calculate position to center
  const translateX = Math.max(0, (availableWidth - scaledWidth) / 2);
  const translateY = Math.max(0, (availableHeight - scaledHeight) / 2);

  // Set up the preview container
  preview.style.position = "relative";
  preview.style.width = `${cardWidth}px`;
  preview.style.height = `${cardHeight}px`;
  preview.style.transformOrigin = "0 0";

  // Apply transformations in correct order
  const transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
  preview.style.transform = transform;
}

// Add window resize listener to handle container size changes
window.addEventListener("resize", () => {
  requestAnimationFrame(scalePreview);
});
