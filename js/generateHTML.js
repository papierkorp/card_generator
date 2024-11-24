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

  element.id = sectionName;

  if (isCard) {
    // Card-specific styles
    element.style.all = "unset";
    element.style.display = "block";
    element.style.position = "relative";
    element.style.width = section.contentSettings.width + "px";
    element.style.height = section.contentSettings.height + "px";
    element.style.backgroundColor = section.contentSettings.backgroundColor;
  } else {
    // Content handling for divs
    if (section.contentSettings.content) {
      element.innerHTML = "";
      const textContainer = document.createElement("div");
      textContainer.style.width = "100%";
      textContainer.style.height = "100%";
      textContainer.style.display = "flex";
      textContainer.style.flexDirection = "column";
      textContainer.style.justifyContent = "center";

      const lines = section.contentSettings.content.split("\n");
      lines.forEach((line) => {
        const p = document.createElement("p");
        p.textContent = line;
        p.style.margin = "0";
        p.style.padding = "0";
        p.style.width = "100%";
        p.style.textAlign = section.textSettings.textAlign || "left";
        textContainer.appendChild(p);
      });

      element.appendChild(textContainer);
    }

    // Div styles
    element.style.backgroundColor = section.contentSettings.backgroundColor;
    element.style.display = "flex";
    element.style.alignItems = "center";
    element.style.justifyContent = "center";
    element.style.overflow = "hidden";
    element.style.position = "absolute";
    element.style.margin = "0";
    element.style.padding = "5px";
    element.style.wordWrap = "break-word";
    element.style.boxSizing = "border-box";

    // Text styles
    if (section.textSettings) {
      element.style.fontWeight = section.textSettings.bold ? "bold" : "normal";
      element.style.fontStyle = section.textSettings.italic
        ? "italic"
        : "normal";
      element.style.textDecoration = [
        section.textSettings.underline && "underline",
        section.textSettings.strikethrough && "line-through",
      ]
        .filter(Boolean)
        .join(" ");
      element.style.fontSize = `${section.textSettings.fontsize}px`;
      element.style.fontFamily = section.textSettings.fontFamily;
      element.style.color = section.textSettings.fontColor;
      element.style.lineHeight = section.textSettings.lineHeight;
      element.style.wordSpacing = `${section.textSettings.wordSpacing}px`;
      element.style.whiteSpace = "pre-wrap";
    }

    // Border styles
    if (section.borderSettings) {
      ["top", "right", "bottom", "left"].forEach((side) => {
        if (section.borderSettings[`${side}Border`]) {
          element.style[
            `border${side.charAt(0).toUpperCase() + side.slice(1)}`
          ] =
            `${section.borderSettings.borderSize}px ${section.borderSettings.borderType} ${section.borderSettings.borderColor}`;
        }
      });

      element.style.borderRadius = `${section.borderSettings.borderRadius}px`;

      // Shadow
      if (section.borderSettings.shadow) {
        const inset = section.borderSettings.insetShadow ? "inset " : "";
        const rgba = hexToRGBA(
          section.borderSettings.shadowColor,
          section.borderSettings.shadowOpacity / 100,
        );
        element.style.boxShadow = `${inset}${section.borderSettings.shadowShiftRight}px ${section.borderSettings.shadowShiftDown}px ${section.borderSettings.shadowBlur}px ${section.borderSettings.shadowSpread}px ${rgba}`;
      }
    }
  }

  return element;
}

export function generateHTML() {
  const preview = document.getElementById("previewSettings");
  const htmlOutput = document.getElementById("htmlOutputSettings");
  const card = createSectionElement(state.sections.card, "card");

  // Set card dimensions
  card.style.width = state.sections.card.contentSettings.width + "px";
  card.style.height = state.sections.card.contentSettings.height + "px";

  // Add all divs
  Object.entries(state.sections.divs || {}).forEach(([id, div]) => {
    const divElement = createSectionElement(div, `div${id}`);
    divElement.style.top = div.contentSettings.topPosition + "%";
    divElement.style.left = div.contentSettings.leftPosition + "%";
    divElement.style.width = div.contentSettings.width + "%";
    divElement.style.height = div.contentSettings.height + "%";
    card.appendChild(divElement);
  });

  // Update preview
  preview.innerHTML = "";
  preview.appendChild(card);

  // Simple HTML output
  htmlOutput.innerHTML = "";
  const pre = document.createElement("pre");
  pre.style.whiteSpace = "pre-wrap";
  pre.style.overflow = "auto";
  pre.style.maxHeight = "500px";
  pre.textContent = card.outerHTML;
  htmlOutput.appendChild(pre);

  requestAnimationFrame(scalePreview);
}

function scalePreview() {
  const previewContainer = document.getElementById("previewContainer");
  const preview = document.getElementById("previewSettings");
  const card = preview.firstChild;

  if (!previewContainer || !preview || !card) return;

  preview.style.transform = "";
  card.style.transform = "";

  const containerWidth = previewContainer.clientWidth;
  const containerHeight = previewContainer.clientHeight;
  const cardWidth = parseInt(state.sections.card.contentSettings.width);
  const cardHeight = parseInt(state.sections.card.contentSettings.height);

  const paddingX = 32;
  const paddingY = 60;
  const availableWidth = containerWidth - paddingX;
  const availableHeight = containerHeight - paddingY;

  const scaleX = availableWidth / cardWidth;
  const scaleY = availableHeight / cardHeight;
  const scale = Math.min(scaleX, scaleY, 1);

  const scaledWidth = cardWidth * scale;
  const scaledHeight = cardHeight * scale;

  const translateX = Math.max(0, (availableWidth - scaledWidth) / 2);
  const translateY = Math.max(0, (availableHeight - scaledHeight) / 2);

  preview.style.position = "relative";
  preview.style.width = `${cardWidth}px`;
  preview.style.height = `${cardHeight}px`;
  preview.style.transformOrigin = "0 0";
  preview.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
}

window.addEventListener("resize", () => {
  requestAnimationFrame(scalePreview);
});
