import { state } from "./state.js";

function hexToRGBA(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function createSectionElement(section, sectionName) {
  const element = document.createElement("div");
  const isCard = sectionName === "card";
  const textSettings = isCard
    ? section.textSettings
    : {
        ...state.sections.card.textSettings, // Default card settings
        ...section.textSettings, // Override with section-specific settings
      };

  // Basic element setup
  element.id = sectionName;
  if (
    !isCard &&
    section.contentSettings.content !== "No text for card, use Middle instead!"
  ) {
    element.textContent = section.contentSettings.content;
  }

  // Apply styles directly
  element.style.backgroundColor = section.contentSettings.backgroundColor;
  element.style.display = "flex";
  element.style.overflow = "hidden";
  element.style.position = "absolute";
  element.style.margin = "0";
  element.style.padding = "5px";
  element.style.wordWrap = "break-word";
  element.style.boxSizing = "border-box";

  // Text styles
  element.style.fontWeight = textSettings.bold ? "bold" : "normal";
  element.style.fontStyle = textSettings.italic ? "italic" : "normal";
  element.style.textDecoration = [
    textSettings.underline && "underline",
    textSettings.strikethrough && "line-through",
  ]
    .filter(Boolean)
    .join(" ");
  element.style.fontSize = `${textSettings.fontsize}px`;
  element.style.fontFamily = textSettings.fontFamily;
  element.style.color = textSettings.fontColor;
  element.style.textAlign = textSettings.textAlign;

  // Add borders
  ["top", "right", "bottom", "left"].forEach((side) => {
    if (section.borderSettings[`${side}Border`]) {
      element.style[`border${side.charAt(0).toUpperCase() + side.slice(1)}`] =
        `${section.borderSettings.borderSize}px ${section.borderSettings.borderType} ${section.borderSettings.borderColor}`;
      element.style.borderRadius = `${section.borderSettings.borderRadius}px`;
    }

    // Add shadow if enabled
    if (section.borderSettings.shadow) {
      const inset = section.borderSettings.insetShadow ? "inset " : "";
      const color = section.borderSettings.shadowColor;
      const opacity = section.borderSettings.shadowOpacity;
      const rgba = hexToRGBA(color, opacity / 100);

      element.style.boxShadow = `${inset}${section.borderSettings.shadowShiftRight}px ${section.borderSettings.shadowShiftDown}px ${section.borderSettings.shadowBlur}px ${section.borderSettings.shadowSpread}px ${rgba}`;
    }
  });

  return element;
}

function hasContent(content) {
  return content && content.trim().length > 0;
}

export function generateHTML() {
  console.log("state: ", state);
  const preview = document.getElementById("previewSettings");
  const card = createSectionElement(state.sections.card, "card");
  card.style.position = "relative";
  card.style.width = state.sections.card.contentSettings.width + "px";
  card.style.height = state.sections.card.contentSettings.height + "px";

  if (hasContent(state.sections.top.contentSettings.content)) {
    const top = createSectionElement(state.sections.top, "top");
    top.style.top = state.sections.top.contentSettings.topPosition + "%";
    top.style.left = state.sections.top.contentSettings.leftPosition + "%";

    top.style.width = state.sections.top.contentSettings.width + "%";
    top.style.height = state.sections.top.contentSettings.height + "%";
    card.appendChild(top);
  }

  if (hasContent(state.sections.bottom.contentSettings.content)) {
    const bottom = createSectionElement(state.sections.bottom, "bottom");
    bottom.style.top = state.sections.bottom.contentSettings.topPosition + "%";
    bottom.style.left =
      state.sections.bottom.contentSettings.leftPosition + "%";

    bottom.style.width = state.sections.bottom.contentSettings.width + "%";
    bottom.style.height = state.sections.bottom.contentSettings.height + "%";
    card.appendChild(bottom);
  }

  if (hasContent(state.sections.left.contentSettings.content)) {
    const left = createSectionElement(state.sections.left, "left");
    left.style.top = state.sections.left.contentSettings.topPosition + "%";
    left.style.left = state.sections.left.contentSettings.leftPosition + "%";

    left.style.width = state.sections.left.contentSettings.width + "%";
    left.style.height = state.sections.left.contentSettings.height + "%";
    card.appendChild(left);
  }

  if (hasContent(state.sections.right.contentSettings.content)) {
    const right = createSectionElement(state.sections.right, "right");
    right.style.top = state.sections.right.contentSettings.topPosition + "%";
    right.style.left = state.sections.right.contentSettings.leftPosition + "%";

    right.style.width = state.sections.right.contentSettings.width + "%";
    right.style.height = state.sections.right.contentSettings.height + "%";
    card.appendChild(right);
  }

  // if (hasContent(state.sections.middle.contentSettings.content)) {
  //   const middle = createSectionElement(state.sections.middle, "middle");
  //   middle.style.top = state.sections.middle.contentSettings.topPosition + "%";
  //   middle.style.left =
  //     state.sections.middle.contentSettings.leftPosition + "%";

  //   middle.style.width = state.sections.middle.contentSettings.width + "%";
  //   middle.style.height = state.sections.middle.contentSettings.height + "%";
  //   card.appendChild(middle);
  // }

  Object.values(state.sections.middles).forEach((middle) => {
    const middleElement = createSectionElement(middle, "middle");
    middleElement.style.top = middle.contentSettings.topPosition + "%";
    middleElement.style.left = middle.contentSettings.leftPosition + "%";
    middleElement.style.width = middle.contentSettings.width + "%";
    middleElement.style.height = middle.contentSettings.height + "%";
    card.appendChild(middleElement);
  });

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
