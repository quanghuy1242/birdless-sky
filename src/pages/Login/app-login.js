import { LitElement, html, css, customElement, unsafeCSS, property } from 'lit-element';
import style from './app-login.scss';
import { mdcTypographyStyles } from '../../sharestyles';
import { updateMetadata, connect } from 'pwa-helpers';
import { store } from '../../store';
import { signIn } from '../../worker/worker.instance';
import { Router } from '@vaadin/router';

import '../../components/Tooltip/app-tooltip';
import '@material/mwc-textfield';
import '@material/mwc-button';

@customElement('app-login')
export class AppMain extends connect(store)(LitElement) {
  @property({ type: String }) email = '';
  @property({ type: String }) password = '';
  @property({ type: Boolean }) isAuth;
  @property({ type: Boolean }) isPending;

  static get styles() {
    return [
      mdcTypographyStyles,
      css`${unsafeCSS(style)}`
    ];
  }

  stateChanged(state) {
    this.isPending = state.auth.isPending;
    this.error = state.auth.error;
    this.isAuth = state.auth.isAuth || undefined;
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
              <mwc-textfield
                .value=${this.email}
                label="Email"
                required
                type="email"
                outlined
                @change=${(event) => this.handleValueChange(event, 'email')}
              ></mwc-textfield>
            </app-tooltip>
            <app-tooltip content="Mật khẩu phải có ít nhất 1 ký tự hoa, 1 ký tự thường, 1 ký tự số" placement="top-end">
              <mwc-textfield
                .value=${this.password}
                label="Password"
                required
                type="password"
                outlined
                @change=${(event) => this.handleValueChange(event, 'password')}
              ></mwc-textfield>
            </app-tooltip>
          </div>
          <div class="action">
            <mwc-button label="Register" @click=${() => Router.go('/register')}></mwc-button>
            <mwc-button
              label="Sign in"
              raised
              @click=${this.handleLogin}
              .disabled=${this.isPending}
            ></mwc-button>
          </div>
          ${this.error
            ? html`<div class="mdc-typography--body2 error">${this.error}</div>`
            : ''}
        </form>
      </div>
    `;
  }
}