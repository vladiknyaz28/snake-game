import {Snake} from './snake.js';
import {Food} from "./food.js";
import { MobileControls } from '../mobile-controls.js'; // ПРАВИЛЬНЫЙ ПУТЬ

export class Game {

  snake = null;
  context = null;
  positionsCount = null;
  positionsSize = null;
  score = 0;
  food = null;
  interval = null;
  scoreElement = null;
  mobileControls = null;

  constructor(context, settings) {
    this.context = context;
    this.positionsCount = settings.positionsCount;
    this.positionsSize = settings.positionsSize;

    this.scoreElement = document.getElementById('score');

    const startButton = document.getElementById('start');
    if (startButton) {
      startButton.onclick = () => {
        this.startGame();
      }
    }
  }

  startGame() {
    if (this.interval) {
      clearInterval(this.interval);
    }

    this.score = 0;
    if (this.scoreElement) {
      this.scoreElement.innerText = this.score;
    }

    this.food = new Food(this.context, this.positionsCount, this.positionsSize);
    this.snake = new Snake(this.context, this.positionsCount, this.positionsSize);

    // Подключаем мобильное управление
    this.mobileControls = new MobileControls(this.snake);

    this.food.setNewFoodPosition();
    this.interval = setInterval(this.gameProcess.bind(this), 100);
  }

  gameProcess() {
    this.context.clearRect(0, 0, this.positionsCount * this.positionsSize,
      this.positionsCount * this.positionsSize);

    this.showGrid();
    this.food.showFood();
    let result = this.snake.showSnake(this.food.foodPosition);
    if (result) {
      if (result.collision) {
        this.endGame();
      } else if (result.gotFood) {
        this.score += 1;
        if (this.scoreElement) {
          this.scoreElement.innerText = this.score;
        }
        this.food.setNewFoodPosition();
      }
    }
  }

  endGame() {
    clearInterval(this.interval);

    this.context.fillStyle = 'black';
    this.context.font = 'bold 48px Arial';
    this.context.textAlign = 'center';
    this.context.fillText('Вы набрали: ' + this.score + ' очков!',
      (this.positionsCount * this.positionsSize) / 2,
      (this.positionsCount * this.positionsSize) / 2);
  }

  showGrid() {
    const size = this.positionsCount * this.positionsSize;
    this.context.beginPath();

    for (let x = 0; x <= size; x += this.positionsSize) {
      this.context.moveTo(x + 0.5, 0);
      this.context.lineTo(x + 0.5, size);
    }

    for (let y = 0; y <= size; y += this.positionsSize) {
      this.context.moveTo(0, y + 0.5);
      this.context.lineTo(size, y + 0.5);
    }

    this.context.strokeStyle = "black";
    this.context.stroke();
  }
}