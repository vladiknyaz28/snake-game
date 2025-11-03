import { Game } from './modules/game.js';
import '../css/styles.css';

class App {
  settings = {
    positionsCount: 30,
    positionsSize: 20
  }

  constructor() {
    // Ждем пока весь DOM загрузится
    setTimeout(() => {
      this.initGame();
    }, 100);
  }

  initGame() {
    let container = document.getElementById('container');
    if (!container) {
      console.error('Container not found!');
      return;
    }

    // Создаем canvas
    const canvas = document.createElement("canvas");
    canvas.setAttribute('width', (this.settings.positionsCount * this.settings.positionsSize).toString());
    canvas.setAttribute('height', (this.settings.positionsCount * this.settings.positionsSize).toString());
    container.appendChild(canvas);

    const context = canvas.getContext('2d');
    new Game(context, this.settings);
  }
}

// Запускаем когда страница полностью загрузится
window.addEventListener('load', () => {
  new App();
});