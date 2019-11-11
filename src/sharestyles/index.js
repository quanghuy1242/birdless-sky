import { css, unsafeCSS } from 'lit-element';

import githubMarkdown from './github-markdown.scss';
import mdcTopAppBar from './mdc-top-app-bar.scss';
import mdcElevation from './mdc-elevation.scss';
import mdcTypography from './mdc-typography.scss';
import mdcDrawer from './mdc-drawer.scss';
import mdcList from './mdc-list.scss';
import mdcCard from './mdc-card.scss';
import mdcChips from './mdc-chips.scss';

export const githubMarkdownStyles = css`${unsafeCSS(githubMarkdown)}`;
export const mdcElevationStyles = css`${unsafeCSS(mdcElevation)}`;
export const mdcTypographyStyles = css`${unsafeCSS(mdcTypography)}`;
export const mdcListStyles = css`${unsafeCSS(mdcList)}`;
export const mdcCardStyles = css`${unsafeCSS(mdcCard)}`;
export const mdcChipsStyles = css`${unsafeCSS(mdcChips)}`;
export const mdcTopAppBarStyles = css`${unsafeCSS(mdcTopAppBar)}`;
export const mdcDrawerStyles = css`${unsafeCSS(mdcDrawer)}`;