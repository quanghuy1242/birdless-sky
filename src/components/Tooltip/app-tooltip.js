import { LitElement, html, css, property, customElement, query, unsafeCSS } from 'lit-element';
import style from './app-tooltip.scss';
import Popper from 'popper.js';

@customElement('app-tooltip')
export class AppTooltip extends LitElement {
  @query('slot') referenceElement;
  @query('.tooltip-inner') tooltipElement;

  @property({ type: String }) content = 'Nội dung';
  @property({ type: String }) placement = 'bottom';
  @property({ type: Boolean }) isOpen = false;

  static get styles() {
    return [
      css`${unsafeCSS(style)}`
    ];
  }

  updated() {
    if (this.isOpen) {
      new Popper(this.referenceElement.assignedElements()[0], this.tooltipElement, {
        placement: this.placement,
        positionFixed: true
      });
      this.tooltipElement.classList.add('isOpening');
    }
  }

  handleOpenTooltip() {
    if (!this.isOpen) {
      this.isOpen = true;
    }
  }

  handleCloseTooltip() {
    if (this.tooltipElement) {
      this.tooltipElement.classList.replace('isOpening', 'isClosing');
      setTimeout(() => {
        this.isOpen = false;
      }, 200);
    }
  }

  render() {
    return html`
      <div
        class="tooltip-wrapper"
        @mouseenter=${this.handleOpenTooltip}
        @mouseleave=${this.handleCloseTooltip}
        @click=${this.handleCloseTooltip}
      >
        ${this.isOpen
          ? html`
            <div class="tooltip-inner">
              ${this.content}
            </div>
          `
          : html``}
        <slot></slot>
      </div>
    `;
  }
}