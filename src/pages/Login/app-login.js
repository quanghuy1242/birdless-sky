import { LitElement, html, css, customElement, unsafeCSS, queryAll, property } from 'lit-element';
import style from './app-login.scss';
import { mdcTextFieldStyles, mdcButtonStyles, mdcTypographyStyles } from '../../sharestyles';
import { MDCTextField } from '@material/textfield';
import { MDCRipple } from '@material/ripple';
import { updateMetadata, connect } from 'pwa-helpers';
import { store } from '../../store';
import { signIn } from '../../worker/worker.instance';
import { Router } from '@vaadin/router';

import '../../components/Tooltip/app-tooltip';

@customElement('app-login')
export class AppMain extends connect(store)(LitElement) {
  @queryAll('.mdc-text-field') textFieldElements;
  @queryAll('.mdc-button') buttonElements;
  
  @property({ type: String }) email = '';
  @property({ type: String }) password = '';
  @property({ type: Boolean }) isAuth;
  @property({ type: Boolean }) isPending;

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
    this.isAuth = state.auth.isAuth || undefined;
    console.log(state.auth.isPending);
  }

  updated() {
    if (this.isAuth) {
      Router.go('/home');
    }

    updateMetadata({
      title: 'Login',
      description: 'Đăng nhập vào hệ thống',
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

  handleLogin(e) {
    e.preventDefault();

    if (this.email.length === 0) {
      return alert('Email không bỏ trống');
    }

    if (this.password.length === 0) {
      return alert('Password không bỏ trống');
    }

    signIn({
      email: this.email,
      password: this.password
    })
  }

  render() {
    return html`
      <div class="wrapper">
        <form class="login-form">
          <div class="header mdc-typography--headline4">Đăng nhập</div>
          <div class="main-form">
            <app-tooltip content="Email đúng định dạng" placement="top-end">
              <div class="mdc-textfield-wrapper">
                <div class="mdc-text-field mdc-text-field--outlined">
                  <input
                    class="mdc-text-field__input" 
                    id="text-field-hero-input-1"
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
            </app-tooltip>
            <app-tooltip content="Mật khẩu phải có ít nhất 1 ký tự hoa, 1 ký tự thường, 1 ký tự số" placement="top-end">
              <div class="mdc-textfield-wrapper">
                <div class="mdc-text-field mdc-text-field--outlined">
                  <input
                    class="mdc-text-field__input"
                    id="text-field-hero-input-2"
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
            </app-tooltip>
          </div>
          <div class="action">
            <a class="mdc-button" href="/register">Register</a>
            <button
              class="mdc-button mdc-button--raised"
              @click=${this.handleLogin}
              .disabled=${this.isPending}
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    `;
  }
}