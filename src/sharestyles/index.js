import { css, unsafeCSS } from 'lit-element';

import materialIcons from './material-icons.scss';
import mdcTopAppBar from './mdc-top-app-bar.scss';
import mdcButton from './mdc-button.scss';

export const materialIconsStyles = css`${unsafeCSS(materialIcons)}`;
export const mdcTopAppBarStyles = css`${unsafeCSS(mdcTopAppBar)}`;
export const mdcButtonStyles = css`${unsafeCSS(mdcButton)}`;