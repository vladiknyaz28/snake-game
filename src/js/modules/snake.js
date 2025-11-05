export class Snake {
  currentDirection = 'right';
  snake = [
    { x: 10, y: 10 },
  ];
  context = null;
  positionsCount = 30;
  positionsSize = 20;

  constructor(context, positionsCount, positionsSize) {
    this.context = context;
    this.positionsCount = positionsCount;
    this.positionsSize = positionsSize;
    this.addKeyboardHandler();
  }

  addKeyboardHandler() {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft' && this.currentDirection !== 'right') {
        this.currentDirection = 'left';
      } else if (event.key === 'ArrowRight' && this.currentDirection !== 'left') {
        this.currentDirection = 'right';
      } else if (event.key === 'ArrowUp' && this.currentDirection !== 'down') {
        this.currentDirection = 'up';
      } else if (event.key === 'ArrowDown' && this.currentDirection !== 'up') {
        this.currentDirection = 'down';
      }
    });
  }

  showSnake(foodPosition) {
    let result = { gotFood: false, collision: false };
    let newHeadPosition = { ...this.snake[0] };
    if (this.currentDirection === 'left') newHeadPosition.x -= 1;
    else if (this.currentDirection === 'right') newHeadPosition.x += 1;
    else if (this.currentDirection === 'up') newHeadPosition.y -= 1;
    else if (this.currentDirection === 'down') newHeadPosition.y += 1;

    if (newHeadPosition.x < 1 || newHeadPosition.x > this.positionsCount ||
      newHeadPosition.y < 1 || newHeadPosition.y > this.positionsCount ||
      this.checkNewPositionForCollision(newHeadPosition)) {
      result.collision = true;
      return result;
    }

    if (foodPosition && foodPosition.x === newHeadPosition.x && foodPosition.y === newHeadPosition.y) {
      result.gotFood = true;
    } else {
      this.snake.pop();
    }

    this.snake.unshift(newHeadPosition);

    this.context.fillStyle = 'yellow';
    for (let seg of this.snake) {
      this.context.fillRect(
        (seg.x - 1) * this.positionsSize,
        (seg.y - 1) * this.positionsSize,
        this.positionsSize,
        this.positionsSize
      );
    }
    return result;
  }

  checkNewPositionForCollision(newHeadPosition) {
    for (let i = 1; i < this.snake.length; i++) {
      if (newHeadPosition.x === this.snake[i].x && newHeadPosition.y === this.snake[i].y) {
        return true;
      }
    }
    return false;
  }
}
