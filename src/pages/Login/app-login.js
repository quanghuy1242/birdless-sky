import { LitElement, html, css, customElement, unsafeCSS, queryAll } from 'lit-element';
import style from './app-login.scss';
import { mdcTextFieldStyles, mdcButtonStyles, mdcTypographyStyles } from '../../sharestyles';
import { MDCTextField } from '@material/textfield';
import { MDCRipple } from '@material/ripple';

@customElement('app-login')
export class AppMain extends LitElement {
  @queryAll('.mdc-text-field') textFieldElements;
  @queryAll('.mdc-button') buttonElements;

  static get styles() {
    return [
      mdcTextFieldStyles,
      mdcButtonStyles,
      mdcTypographyStyles,
      css`${unsafeCSS(style)}`
    ];
  }

  firstUpdated() {
    this.textFieldElements.forEach(element => {
      new MDCTextField(element);
    });

    this.buttonElements.forEach(element => {
      new MDCRipple(element);
    })
  }

  render() {
    return html`
      <div class="wrapper">
        <div class="login-form">
          <div class="header mdc-typography--headline4">Đăng nhập</div>
          <div class="main-form">
            <div class="mdc-textfield-wrapper">
              <div class="mdc-text-field mdc-text-field--outlined">
                <input class="mdc-text-field__input" id="text-field-hero-input">
                <div class="mdc-notched-outline">
                  <div class="mdc-notched-outline__leading"></div>
                  <div class="mdc-notched-outline__notch">
                    <label for="text-field-hero-input" class="mdc-floating-label">Email</label>
                  </div>
                  <div class="mdc-notched-outline__trailing"></div>
                </div>
              </div>
            </div>
            <div class="mdc-textfield-wrapper">
              <div class="mdc-text-field mdc-text-field--outlined">
                <input class="mdc-text-field__input" id="text-field-hero-input">
                <div class="mdc-notched-outline">
                  <div class="mdc-notched-outline__leading"></div>
                  <div class="mdc-notched-outline__notch">
                    <label for="text-field-hero-input" class="mdc-floating-label">Password</label>
                  </div>
                  <div class="mdc-notched-outline__trailing"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="action">
            <a class="mdc-button" href="/register">Register</a>
            <button class="mdc-button mdc-button--raised">Sign in</button>
          </div>
        </div>
      </div>
    `;
  }
}