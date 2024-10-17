export function generateHTML(state) {
  const { sections } = state;

  function generateSectionStyle(section, isCard = false) {
    const { style, border, shadow, dimensions, text } = section;

    const styles = [
      style.backgroundColor && `background-color: ${style.backgroundColor};`,
      !isCard && border.top && `border-top: ${border.width}px ${border.type} ${border.color};`,
      !isCard && border.right && `border-right: ${border.width}px ${border.type} ${border.color};`,
      !isCard && border.bottom && `border-bottom: ${border.width}px ${border.type} ${border.color};`,
      !isCard && border.left && `border-left: ${border.width}px ${border.type} ${border.color};`,
      !isCard && border.radius && `border-radius: ${border.radius}px;`,
      shadow.enabled &&
        `box-shadow: ${shadow.inset ? 'inset ' : ''}${shadow.right}px ${shadow.down}px ${shadow.blur}px ${shadow.spread}px rgba(${parseInt(shadow.color.slice(1, 3), 16)}, ${parseInt(shadow.color.slice(3, 5), 16)}, ${parseInt(shadow.color.slice(5, 7), 16)}, ${shadow.opacity / 100});`,
      dimensions.width !== 'auto' && `width: ${dimensions.width}px;`,
      dimensions.height !== 'auto' && `height: ${dimensions.height}px;`,
      !isCard && `font-size: ${text.fontSize}px;`,
      !isCard && `font-family: ${text.fontFamily};`,
      !isCard && `color: ${text.color};`,
      !isCard && `text-align: ${text.alignment};`,
      !isCard && text.bold && 'font-weight: bold;',
      !isCard && text.italic && 'font-style: italic;',
      !isCard && text.underline && 'text-decoration: underline;',
      !isCard && text.strikethrough && 'text-decoration: line-through;',
      !isCard && text.highlight && 'background-color: yellow;',
    ]
      .filter(Boolean)
      .join(' ');

    return styles;
  }

  function getContentHtml(content) {
    return content && content.value ? content.value : '';
  }

  const cardSection = sections.card;
  const topSection = sections.top;
  const leftSection = sections.left;
  const rightSection = sections.right;
  const bottomSection = sections.bottom;

  const middleSections = Object.keys(sections)
    .filter((key) => key.startsWith('middle'))
    .map((key) => sections[key]);

  const html = `
<div id="cardPreview" style="${generateSectionStyle(cardSection, true)} position: relative;">
  ${
    topSection.content && topSection.content.value
      ? `<div id="topEdge" style="${generateSectionStyle(topSection)} width: 100%;">
      ${getContentHtml(topSection.content)}
    </div>`
      : ''
  }
  <div style="display: flex; position: absolute; top: ${topSection.dimensions.height || 0}px; bottom: ${bottomSection.dimensions.height || 0}px; left: 0; right: 0;">
    ${
      leftSection.content && leftSection.content.value
        ? `<div id="leftEdge" style="${generateSectionStyle(leftSection)} writing-mode: vertical-lr; display: flex; align-items: center; height: 100%;">
        ${getContentHtml(leftSection.content)}
      </div>`
        : ''
    }
    <div id="middleContentContainer" style="flex-grow: 1; overflow-y: auto; display: flex; flex-direction: column;">
      ${middleSections
        .map((section, index) =>
          section.content && section.content.value
            ? `<div id="middleContent-${index + 1}" style="${generateSectionStyle(section)}">
            ${getContentHtml(section.content)}
          </div>`
            : ''
        )
        .join('\n')}
    </div>
    ${
      rightSection.content && rightSection.content.value
        ? `<div id="rightEdge" style="${generateSectionStyle(rightSection)} writing-mode: vertical-rl; display: flex; align-items: center; height: 100%;">
        ${getContentHtml(rightSection.content)}
      </div>`
        : ''
    }
  </div>
  ${
    bottomSection.content && bottomSection.content.value
      ? `<div id="bottomEdge" style="${generateSectionStyle(bottomSection)} position: absolute; bottom: 0; width: 100%;">
      ${getContentHtml(bottomSection.content)}
    </div>`
      : ''
  }
</div>`;

  return html.replace(/^\s+|\s+$/gm, ''); // Remove leading/trailing whitespace from each line
}

export function scalePreview() {
  const previewContainer = document.getElementById('cardPreviewContainer');
  const preview = document.getElementById('cardPreview');

  if (!previewContainer || !preview) return;

  const containerWidth = previewContainer.clientWidth;
  const containerHeight = previewContainer.clientHeight;
  const cardWidth = preview.clientWidth;
  const cardHeight = preview.clientHeight;
  const scaleX = containerWidth / cardWidth;
  const scaleY = containerHeight / cardHeight;
  const scale = Math.min(scaleX, scaleY, 1); // Don't scale up, only down if necessary

  // Apply transformation
  preview.style.transform = `scale(${scale})`;
  preview.style.transformOrigin = 'top left';

  // Center the preview if it's smaller than the container
  const translateX = (containerWidth - cardWidth * scale) / 2;
  const translateY = (containerHeight - cardHeight * scale) / 2;
  preview.style.position = 'absolute';
  preview.style.left = `${translateX}px`;
  preview.style.top = `${translateY}px`;
}
