import './src/app-main';
import style from './index.scss';

document.querySelector('head').innerHTML += `<style>${style.toString()}</style>`;

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}