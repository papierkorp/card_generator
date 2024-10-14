// js/modules/generate_html.js

export function generateHTML(state) {
  const { dimensions, sections, selectedSection } = state;

  function generateSection(sectionName) {
    const section = sections[sectionName];
    if (!section) return '';

    const { content, style, border } = section;
    const isVertical = sectionName === 'left' || sectionName === 'right';

    let sectionStyle = `
      ${style.backgroundColor ? `background-color: ${style.backgroundColor};` : ''}
      ${border.top ? `border-top: ${border.top};` : ''}
      ${border.right ? `border-right: ${border.right};` : ''}
      ${border.bottom ? `border-bottom: ${border.bottom};` : ''}
      ${border.left ? `border-left: ${border.left};` : ''}
      ${isVertical ? 'writing-mode: vertical-rl;' : ''}
    `;

    if (sectionName.startsWith('middle')) {
      sectionStyle += `height: ${section.height}px;`;
    }

    return `
      <div id="${sectionName}" style="${sectionStyle}">
        ${content ? content.value : ''}
      </div>
    `;
  }

  const middleSections = Object.keys(sections)
    .filter((key) => key.startsWith('middle'))
    .map(generateSection)
    .join('');

  const html = `
    <div id="cardPreview" style="width: ${dimensions.width}px; height: ${dimensions.height}px; position: relative;">
      ${generateSection('top')}
      <div style="display: flex; height: calc(100% - ${sections.top.height}px - ${sections.bottom.height}px);">
        ${generateSection('left')}
        <div id="middleContentContainer" style="flex: 1; overflow-y: auto;">
          ${middleSections}
        </div>
        ${generateSection('right')}
      </div>
      ${generateSection('bottom')}
    </div>
  `;

  return html;
}
