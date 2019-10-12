import { LitElement, html, css, customElement, unsafeCSS, queryAll, property } from 'lit-element';
import style from './app-register.scss';
import { mdcTextFieldStyles, mdcButtonStyles, mdcTypographyStyles } from '../../sharestyles';
import { MDCTextField } from '@material/textfield';
import { MDCRipple } from '@material/ripple';
import { addNewUser } from '../../worker/worker.instance';
import { connect, updateMetadata } from 'pwa-helpers';
import { store } from '../../store';

@customElement('app-register')
export class AppMain extends connect(store)(LitElement) {
  @queryAll('.mdc-text-field') textFieldElements;
  @queryAll('.mdc-button') buttonElements;

  @property({ type: String }) username = '';
  @property({ type: String }) email = '';
  @property({ type: String }) password = '';
  @property({ type: Boolean }) isPending;
  @property({ type: String }) error;

  static get styles() {
    return [
      mdcTextFieldStyles,
      mdcButtonStyles,
      mdcTypographyStyles,
      css`${unsafeCSS(style)}`
    ];
  }

  stateChanged(state) {
    this.isPending = state.auth.isPending;
    this.error = state.auth.error;
  }

  updated() {
    updateMetadata({
      title: 'Register',
      description: 'Đăng kí tài khoản',
      url: window.location.href
    });
  }

  firstUpdated() {
    this.textFieldElements.forEach(element => {
      new MDCTextField(element);
    });

    this.buttonElements.forEach(element => {
      new MDCRipple(element);
    })
  }

  handleValueChange(event, type) {
    switch (type) {
      case 'username': {
        this.username = event.target.value;
        break;
      }
      
      case 'email': {
        this.email = event.target.value;
        break;
      }

      case 'password': {
        this.password = event.target.value;
        break;
      }
    
      default:
        break;
    }
  }

  handleRegister(e) {
    e.preventDefault();

    if (this.username.length <= 5) {
      return alert('Tên đăng nhập có tối thiểu 5 chữ số')
    }

    if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/m.test(this.email)) {
      return alert('Email không đúng định dạng');
    }
    
    if (!/((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])).{6,}/m.test(this.password)) {
      return alert('Mật khẩu phải có ít nhất 1 ký tự hoa, 1 ký tự thường, 1 ký tự số');
    }

    addNewUser({
      username: this.username,
      email: this.email,
      password: this.password
    });
  }

  render() {
    return html`
      <div class="wrapper">
        <form class="login-form">
          <div class="header mdc-typography--headline4">Đăng ký</div>
          <div class="main-form">
            <div class="mdc-textfield-wrapper">
              <div class="mdc-text-field mdc-text-field--outlined">
                <input
                  class="mdc-text-field__input"
                  id="text-field-hero-input-1"
                  .value=${this.username}
                  required
                  @change=${(event) => this.handleValueChange(event, 'username')}
                >
                <div class="mdc-notched-outline">
                  <div class="mdc-notched-outline__leading"></div>
                  <div class="mdc-notched-outline__notch">
                    <label for="text-field-hero-input" class="mdc-floating-label">Username</label>
                  </div>
                  <div class="mdc-notched-outline__trailing"></div>
                </div>
              </div>
            </div>
            <div class="mdc-textfield-wrapper">
              <div class="mdc-text-field mdc-text-field--outlined">
                <input
                  class="mdc-text-field__input"
                  id="text-field-hero-input-2"
                  .value=${this.email}
                  required
                  type="email"
                  @change=${(event) => this.handleValueChange(event, 'email')}
                >
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
                <input
                  class="mdc-text-field__input"
                  id="text-field-hero-input-3"
                  type="password"
                  .value=${this.password}
                  required
                  @change=${(event) => this.handleValueChange(event, 'password')}
                >
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
            <button
              class="mdc-button mdc-button--raised"
              @click=${this.handleRegister}
              .disabled=${this.isPending}
            >
              Register
            </button>
          </div>
          ${this.error
            ? html`<div class="mdc-typography--body2 error">${this.error}</div>`
            : ''}
        </form>
      </div>
    `;
  }
}