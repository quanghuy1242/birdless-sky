import { LitElement, html, css, customElement, unsafeCSS, queryAll, property } from 'lit-element';
import style from './app-register.scss';
import { mdcTypographyStyles } from '../../sharestyles';
import { addNewUser } from '../../worker/worker.instance';
import { connect, updateMetadata } from 'pwa-helpers';
import { store } from '../../store';
import { Router } from '@vaadin/router';

import '../../components/Tooltip/app-tooltip';
import '@material/mwc-textfield';
import '@material/mwc-button';

@customElement('app-register')
export class AppMain extends connect(store)(LitElement) {

  @property({ type: String }) username = '';
  @property({ type: String }) email = '';
  @property({ type: String }) password = '';
  @property({ type: String }) rePassword = '';
  @property({ type: Boolean }) isPending;
  @property({ type: String }) error;
  @property({ type: Boolean }) isAuth;

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
      title: 'Register',
      description: 'Đăng kí tài khoản',
      url: window.location.href
    });
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

      case 'rePassword': {
        this.rePassword = event.target.value;
        break;
      }
    
      default:
        break;
    }
  }

  handleRegister(e) {
    e.preventDefault();

    if (this.password !== this.rePassword) {
      return alert('Mật khẩu không khớp!');
    }

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
            <app-tooltip content="Tên đăng nhập có tối thiểu 5 chữ số" placement="top-end">
              <mwc-textfield
                .value=${this.username}
                label="Username"
                required
                outlined
                @change=${(event) => this.handleValueChange(event, 'username')}
              ></mwc-textfield>
            </app-tooltip>
            <app-tooltip content="Email đúng định dạng" placement="top-end">
              <mwc-textfield
                .value=${this.email}
                label="Email"
                required
                outlined
                type="email"
                @change=${(event) => this.handleValueChange(event, 'email')}
              ></mwc-textfield>
            </app-tooltip>
            <app-tooltip content="Mật khẩu phải có ít nhất 1 ký tự hoa, 1 ký tự thường, 1 ký tự số" placement="top-end">
              <mwc-textfield
                .value=${this.password}
                label="Password"
                required
                outlined
                type="password"
                @change=${(event) => this.handleValueChange(event, 'password')}
              ></mwc-textfield>
            </app-tooltip>
            <app-tooltip content="Nhập lại mật khẩu" placement="top-end">
              <mwc-textfield
                .value=${this.rePassword}
                label="Retype Password"
                required
                outlined
                type="password"
                @change=${(event) => this.handleValueChange(event, 'rePassword')}
              ></mwc-textfield>
            </app-tooltip>
          </div>
          <div class="action">
            <mwc-button label="Register" raised @click=${this.handleRegister}></mwc-button>
          </div>
          ${this.error
            ? html`<div class="mdc-typography--body2 error">${this.error}</div>`
            : ''}
        </form>
      </div>
    `;
  }
}