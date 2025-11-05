export class Food {
  foodPosition = { x: 5, y: 5 };
  context = null;
  positionsCount = 30;
  positionsSize = 20;

  constructor(context, positionsCount, positionsSize) {
    this.context = context;
    this.positionsCount = positionsCount;
    this.positionsSize = positionsSize;
  }

  setNewFoodPosition(snake = []) {
    let valid = false;
    while (!valid) {
      this.foodPosition = {
        x: Math.floor(1 + Math.random() * this.positionsCount),
        y: Math.floor(1 + Math.random() * this.positionsCount),
      };
      valid = !snake.some(seg =>
        seg.x === this.foodPosition.x && seg.y === this.foodPosition.y
      );
    }
  }

  showFood() {
    this.context.fillStyle = 'red';
    this.context.fillRect(
      (this.foodPosition.x - 1) * this.positionsSize,
      (this.foodPosition.y - 1) * this.positionsSize,
      this.positionsSize,
      this.positionsSize
    );
  }
}
