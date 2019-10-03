import { LitElement, html, css, property, customElement } from 'lit-element';
import { updateMetadata } from 'pwa-helpers';

import '../../components/CircularProgress/app-circular-progress';

@customElement('app-home')
export class AppMain extends LitElement {
  updated() {
    updateMetadata({
      title: 'Home',
      description: 'Quang Huy Blog',
      url: window.location.href
    });
  }

  render() {
    return html`
      <div class="home-wrapper">
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi, omnis sapiente velit commodi dolorum non explicabo. Corporis ad, reprehenderit odit excepturi, dolorem eos minima nam ullam ea corrupti, quasi vitae!</p>
        <app-circular-progress size="xlarge" center></app-circular-progress>
      </div>
    `;
  }
}