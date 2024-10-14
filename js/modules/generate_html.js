export function generateHTML(state) {
  const { dimensions, sections } = state;

  // Extract data for easier access
  const cardStyle = sections.card.style;
  const topSection = sections.top;
  const leftSection = sections.left;
  const rightSection = sections.right;
  const bottomSection = sections.bottom;

  // Extract middle sections
  const middleSections = Object.keys(sections)
    .filter(key => key.startsWith('middle'))
    .map(key => sections[key]);

  const html = `
    <div id="cardPreview" style="width: ${dimensions.width}px; height: ${dimensions.height}px; position: relative; ${cardStyle.backgroundColor ? `background-color: ${cardStyle.backgroundColor};` : ''}">
      <div id="top" style="
        ${topSection.style.backgroundColor ? `background-color: ${topSection.style.backgroundColor};` : ''}
        ${topSection.border.top ? `border-top: ${topSection.border.width || 1}px ${topSection.border.type || 'solid'} ${topSection.border.color || 'black'};` : ''}
        ${topSection.border.right ? `border-right: ${topSection.border.width || 1}px ${topSection.border.type || 'solid'} ${topSection.border.color || 'black'};` : ''}
        ${topSection.border.bottom ? `border-bottom: ${topSection.border.width || 1}px ${topSection.border.type || 'solid'} ${topSection.border.color || 'black'};` : ''}
        ${topSection.border.left ? `border-left: ${topSection.border.width || 1}px ${topSection.border.type || 'solid'} ${topSection.border.color || 'black'};` : ''}
        ${topSection.border.radius ? `border-radius: ${topSection.border.radius}px;` : ''}
        ${topSection.shadow && topSection.shadow.enabled ? `box-shadow: ${topSection.shadow.inset ? 'inset ' : ''}${topSection.shadow.right}px ${topSection.shadow.down}px ${topSection.shadow.blur}px ${topSection.shadow.spread}px rgba(${parseInt(topSection.shadow.color.slice(1, 3), 16)}, ${parseInt(topSection.shadow.color.slice(3, 5), 16)}, ${parseInt(topSection.shadow.color.slice(5, 7), 16)}, ${topSection.shadow.opacity / 100});` : ''}
      ">
        ${topSection.content ? topSection.content.value : ''}
      </div>
      <div style="display: flex; height: calc(100% - ${topSection.height || 0}px - ${bottomSection.height || 0}px);">
        <div id="left" style="
          ${leftSection.style.backgroundColor ? `background-color: ${leftSection.style.backgroundColor};` : ''}
          ${leftSection.border.top ? `border-top: ${leftSection.border.width || 1}px ${leftSection.border.type || 'solid'} ${leftSection.border.color || 'black'};` : ''}
          ${leftSection.border.right ? `border-right: ${leftSection.border.width || 1}px ${leftSection.border.type || 'solid'} ${leftSection.border.color || 'black'};` : ''}
          ${leftSection.border.bottom ? `border-bottom: ${leftSection.border.width || 1}px ${leftSection.border.type || 'solid'} ${leftSection.border.color || 'black'};` : ''}
          ${leftSection.border.left ? `border-left: ${leftSection.border.width || 1}px ${leftSection.border.type || 'solid'} ${leftSection.border.color || 'black'};` : ''}
          ${leftSection.border.radius ? `border-radius: ${leftSection.border.radius}px;` : ''}
          ${leftSection.shadow && leftSection.shadow.enabled ? `box-shadow: ${leftSection.shadow.inset ? 'inset ' : ''}${leftSection.shadow.right}px ${leftSection.shadow.down}px ${leftSection.shadow.blur}px ${leftSection.shadow.spread}px rgba(${parseInt(leftSection.shadow.color.slice(1, 3), 16)}, ${parseInt(leftSection.shadow.color.slice(3, 5), 16)}, ${parseInt(leftSection.shadow.color.slice(5, 7), 16)}, ${leftSection.shadow.opacity / 100});` : ''}
          writing-mode: vertical-rl;
        ">
          ${leftSection.content ? leftSection.content.value : ''}
        </div>
        <div id="middleContentContainer" style="flex: 1; overflow-y: auto;">
          ${middleSections.map(section => `
            <div style="
              ${section.style.backgroundColor ? `background-color: ${section.style.backgroundColor};` : ''}
              ${section.border.top ? `border-top: ${section.border.width || 1}px ${section.border.type || 'solid'} ${section.border.color || 'black'};` : ''}
              ${section.border.right ? `border-right: ${section.border.width || 1}px ${section.border.type || 'solid'} ${section.border.color || 'black'};` : ''}
              ${section.border.bottom ? `border-bottom: ${section.border.width || 1}px ${section.border.type || 'solid'} ${section.border.color || 'black'};` : ''}
              ${section.border.left ? `border-left: ${section.border.width || 1}px ${section.border.type || 'solid'} ${section.border.color || 'black'};` : ''}
              ${section.border.radius ? `border-radius: ${section.border.radius}px;` : ''}
              ${section.shadow && section.shadow.enabled ? `box-shadow: ${section.shadow.inset ? 'inset ' : ''}${section.shadow.right}px ${section.shadow.down}px ${section.shadow.blur}px ${section.shadow.spread}px rgba(${parseInt(section.shadow.color.slice(1, 3), 16)}, ${parseInt(section.shadow.color.slice(3, 5), 16)}, ${parseInt(section.shadow.color.slice(5, 7), 16)}, ${section.shadow.opacity / 100});` : ''}
              height: ${section.height}px;
            ">
              ${section.content ? section.content.value : ''}
            </div>
          `).join('')}
        </div>
        <div id="right" style="
          ${rightSection.style.backgroundColor ? `background-color: ${rightSection.style.backgroundColor};` : ''}
          ${rightSection.border.top ? `border-top: ${rightSection.border.width || 1}px ${rightSection.border.type || 'solid'} ${rightSection.border.color || 'black'};` : ''}
          ${rightSection.border.right ? `border-right: ${rightSection.border.width || 1}px ${rightSection.border.type || 'solid'} ${rightSection.border.color || 'black'};` : ''}
          ${rightSection.border.bottom ? `border-bottom: ${rightSection.border.width || 1}px ${rightSection.border.type || 'solid'} ${rightSection.border.color || 'black'};` : ''}
          ${rightSection.border.left ? `border-left: ${rightSection.border.width || 1}px ${rightSection.border.type || 'solid'} ${rightSection.border.color || 'black'};` : ''}
          ${rightSection.border.radius ? `border-radius: ${rightSection.border.radius}px;` : ''}
          ${rightSection.shadow && rightSection.shadow.enabled ? `box-shadow: ${rightSection.shadow.inset ? 'inset ' : ''}${rightSection.shadow.right}px ${rightSection.shadow.down}px ${rightSection.shadow.blur}px ${rightSection.shadow.spread}px rgba(${parseInt(rightSection.shadow.color.slice(1, 3), 16)}, ${parseInt(rightSection.shadow.color.slice(3, 5), 16)}, ${parseInt(rightSection.shadow.color.slice(5, 7), 16)}, ${rightSection.shadow.opacity / 100});` : ''}
          writing-mode: vertical-rl;
        ">
          ${rightSection.content ? rightSection.content.value : ''}
        </div>
      </div>
      <div id="bottom" style="
        ${bottomSection.style.backgroundColor ? `background-color: ${bottomSection.style.backgroundColor};` : ''}
        ${bottomSection.border.top ? `border-top: ${bottomSection.border.width || 1}px ${bottomSection.border.type || 'solid'} ${bottomSection.border.color || 'black'};` : ''}
        ${bottomSection.border.right ? `border-right: ${bottomSection.border.width || 1}px ${bottomSection.border.type || 'solid'} ${bottomSection.border.color || 'black'};` : ''}
        ${bottomSection.border.bottom ? `border-bottom: ${bottomSection.border.width || 1}px ${bottomSection.border.type || 'solid'} ${bottomSection.border.color || 'black'};` : ''}
        ${bottomSection.border.left ? `border-left: ${bottomSection.border.width || 1}px ${bottomSection.border.type || 'solid'} ${bottomSection.border.color || 'black'};` : ''}
        ${bottomSection.border.radius ? `border-radius: ${bottomSection.border.radius}px;` : ''}
        ${bottomSection.shadow && bottomSection.shadow.enabled ? `box-shadow: ${bottomSection.shadow.inset ? 'inset ' : ''}${bottomSection.shadow.right}px ${bottomSection.shadow.down}px ${bottomSection.shadow.blur}px ${bottomSection.shadow.spread}px rgba(${parseInt(bottomSection.shadow.color.slice(1, 3), 16)}, ${parseInt(bottomSection.shadow.color.slice(3, 5), 16)}, ${parseInt(bottomSection.shadow.color.slice(5, 7), 16)}, ${bottomSection.shadow.opacity / 100});` : ''}
      ">
        ${bottomSection.content ? bottomSection.content.value : ''}
      </div>
    </div>
  `;

  return html;
}