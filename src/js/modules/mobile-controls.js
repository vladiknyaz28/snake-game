export class MobileControls {
  constructor(game) {
    this.game = game;
    this.isMobile = 'ontouchstart' in window;
    this.init();
  }

  init() {
    if (!this.isMobile) return;

    this.createControls();
    this.bindEvents();
  }

  createControls() {
    const controlsHTML = `
            <div class="mobile-controls">
                <div class="control-row">
                    <button class="control-btn up" data-direction="up">↑</button>
                </div>
                <div class="control-row">
                    <button class="control-btn left" data-direction="left">←</button>
                    <button class="control-btn down" data-direction="down">↓</button>
                    <button class="control-btn right" data-direction="right">→</button>
                </div>
            </div>
        `;

    document.body.insertAdjacentHTML('beforeend', controlsHTML);
  }

  bindEvents() {
    const buttons = document.querySelectorAll('.control-btn');

    buttons.forEach(btn => {
      btn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const direction = btn.dataset.direction;
        this.handleDirectionChange(direction);
      });

      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const direction = btn.dataset.direction;
        this.handleDirectionChange(direction);
      });
    });
  }

  handleDirectionChange(direction) {
    if (this.game && this.game.snake) {
      this.game.snake.setDirection(direction);
    }
  }

  destroy() {
    const controls = document.querySelector('.mobile-controls');
    if (controls) {
      controls.remove();
    }
  }
}