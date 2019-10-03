import { LitElement, html, css, unsafeCSS, property, customElement } from 'lit-element';
import { styleMap } from 'lit-html/directives/style-map';
import style from './app-circular-progress.scss';

/**
 * ## Property
 * - **size**: "xsmall" | "small" | "medium" | "large" | "xlarge" | "xxlarge"  
 * - **progress**
 * - **max**
 * - **min**
 * 
 * ## Attribute
 * - **center**: styling the circular progress to the center of it's parrent
 */
@customElement('app-circular-progress')
export class AppCircularProgress extends LitElement {
  @property({ type: String }) size = "medium";
  @property({ type: Number }) progress;
  @property({ type: Number }) min = 0;
  @property({ type: Number }) max = 1;

  static get styles() {
    return [
      css`${unsafeCSS(style)}`
    ];
  }

  calculateRatio(value) {
    if (value < this.min) return 0;
    if (value > this.max) return 1;
    return (value - this.min) / (max - this.min);
  }

  circularStyle(size) {
    return styleMap(
      this.progress !== undefined
      ? {
          strokeDasharray: `${
            2 * Math.PI * (size / 2.4) * this.calculateRatio(this.progress)
          }, 666.66%`
        }
      : undefined
    );
  }

  sizeMap(size) {
    return {
      xsmall: 18,
      small: 20,
      medium: 24,
      large: 36,
      xlarge: 48,
      xxlarge: 72
    }[size];
  }

  render() {
    const sizeNumber = this.sizeMap(this.size);
    return html`
      <div
        class="
          circular-progress 
          circular-progress--size-${this.size} 
          circular-progress--indeterminate 
          circular-progress--thickerstroke
        "
      >
        <svg
          class="circular-progress__circle"
          viewBox="0 0 ${sizeNumber} ${sizeNumber}"
        >
          <circle
            class="circular-progress__path"
            style="${this.circularStyle(sizeNumber)}"
            cx="${sizeNumber / 2}"
            cy="${sizeNumber / 2}"
            r="${sizeNumber / 2.4}"
          />
        </svg>
      </div>
    `;
  }
}