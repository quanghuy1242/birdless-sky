import { LitElement, html, css, property, customElement, query, unsafeCSS } from 'lit-element';
import style from './app-tooltip.scss';
import Tooltip from 'tooltip.js';

@customElement('app-tooltip')
export class AppTooltip extends LitElement {
  @query('slot') tooltipElement;

  @property({ type: Object }) tooltip;
  @property({ type: String }) content = 'Nội dung';
  @property({ type: String }) placement = 'bottom';

  static get styles() {
    return [
      css`${unsafeCSS(style)}`
    ];
  }

  firstUpdated() {
    this.tooltip = new Tooltip(this.tooltipElement.assignedElements()[0], {
      html: true,
      placement: this.placement,
      title: this.content,
      trigger: "hover",
      popperOptions: {
        modifiers: {
          arrow: { enabled: false }
        }
      }
    });
  }

  handleOpenTooltip() {
    this.tooltip.show();
  }

  handleCloseTooltip() {
    if (!this.tooltipElement.assignedElements()[1]) { return; }
    this.tooltipElement.assignedElements()[1].classList.add('isClosing');
    setTimeout(() => {
      this.tooltip.dispose();
    }, 200);
  }

  render() {
    return html`
      <div
        class="tooltip-wrapper"
        @mouseenter=${this.handleOpenTooltip}
        @mouseleave=${this.handleCloseTooltip}
        @click=${this.handleCloseTooltip}
      >
        <slot></slot>
      </div>
    `;
  }
}