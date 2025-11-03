export class MobileControls {
  constructor(snake) {
    this.snake = snake;
    this.init();
  }

  init() {
    console.log('🔄 Инициализация мобильного управления...');

    // Ждем полной загрузки DOM
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupControls());
    } else {
      this.setupControls();
    }
  }

  setupControls() {
    console.log('🎯 Настройка мобильных кнопок...');
    this.createMobileButtons();
    this.setupEventListeners();
  }

  createMobileButtons() {
    // Проверяем есть ли уже кнопки
    if (document.getElementById('btnUp')) {
      console.log('✅ Кнопки уже существуют');
      return;
    }

    console.log('📝 Создаем кнопки управления...');

    const controlsHTML = `
      <div class="mobile-controls">
        <button class="mobile-btn btn-up" id="btnUp">↑</button>
        <button class="mobile-btn btn-left" id="btnLeft">←</button>
        <button class="mobile-btn btn-right" id="btnRight">→</button>
        <button class="mobile-btn btn-down" id="btnDown">↓</button>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', controlsHTML);
    console.log('✅ Кнопки созданы');
  }

  setupEventListeners() {
    console.log('🎮 Настройка обработчиков...');

    const btnUp = document.getElementById('btnUp');
    const btnLeft = document.getElementById('btnLeft');
    const btnRight = document.getElementById('btnRight');
    const btnDown = document.getElementById('btnDown');

    // Проверяем что все кнопки найдены
    if (!btnUp || !btnLeft || !btnRight || !btnDown) {
      console.error('❌ Не все кнопки найдены!');
      return;
    }

    console.log('✅ Все кнопки найдены');

    // Простые обработчики через onclick
    btnUp.onclick = () => {
      console.log('⬆️ Кнопка ВВЕРХ');
      if (this.snake.currentDirection !== 'down') {
        this.snake.currentDirection = 'up';
        console.log('🔄 Направление: UP');
      }
    };

    btnLeft.onclick = () => {
      console.log('⬅️ Кнопка ВЛЕВО');
      if (this.snake.currentDirection !== 'right') {
        this.snake.currentDirection = 'left';
        console.log('🔄 Направление: LEFT');
      }
    };

    btnRight.onclick = () => {
      console.log('➡️ Кнопка ВПРАВО');
      if (this.snake.currentDirection !== 'left') {
        this.snake.currentDirection = 'right';
        console.log('🔄 Направление: RIGHT');
      }
    };

    btnDown.onclick = () => {
      console.log('⬇️ Кнопка ВНИЗ');
      if (this.snake.currentDirection !== 'up') {
        this.snake.currentDirection = 'down';
        console.log('🔄 Направление: DOWN');
      }
    };

    console.log('✅ Обработчики настроены');
  }
}