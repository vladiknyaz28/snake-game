export class Snake {
  currentDirection = 'right';
  snake = [
    {x: 10, y: 10}, // Изменил начальную позицию
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
    })
  }


  showSnake(foodPosition) {
    let result = {
      gotFood: false,
      collision: false,
    };

    // Создаем новую позицию головы
    let newHeadPosition = {
      x: this.snake[0].x,
      y: this.snake[0].y,
    }

    // Движение
    if (this.currentDirection === 'left') {
      newHeadPosition.x -= 1;
    } else if (this.currentDirection === 'right') {
      newHeadPosition.x += 1;
    } else if (this.currentDirection === 'up') {
      newHeadPosition.y -= 1;
    } else if (this.currentDirection === 'down') {
      newHeadPosition.y += 1;
    }

    // Проверка столкновения со стеной и безопасный отскок
    let hitWall = false;
    let originalDirection = this.currentDirection;

    if (newHeadPosition.x < 1) {
      hitWall = true;
      // Пробуем двигаться вверх или вниз вместо лево
      if (!this.wouldCollide({x: this.snake[0].x, y: this.snake[0].y - 1})) {
        this.currentDirection = 'up';
        newHeadPosition.x = this.snake[0].x;
        newHeadPosition.y = this.snake[0].y - 1;
      } else if (!this.wouldCollide({x: this.snake[0].x, y: this.snake[0].y + 1})) {
        this.currentDirection = 'down';
        newHeadPosition.x = this.snake[0].x;
        newHeadPosition.y = this.snake[0].y + 1;
      } else {
        // Если все направления ведут к столкновению - конец игры
        result.collision = true;
        return result;
      }
    } else if (newHeadPosition.x > this.positionsCount) {
      hitWall = true;
      // Пробуем двигаться вверх или вниз вместо право
      if (!this.wouldCollide({x: this.snake[0].x, y: this.snake[0].y - 1})) {
        this.currentDirection = 'up';
        newHeadPosition.x = this.snake[0].x;
        newHeadPosition.y = this.snake[0].y - 1;
      } else if (!this.wouldCollide({x: this.snake[0].x, y: this.snake[0].y + 1})) {
        this.currentDirection = 'down';
        newHeadPosition.x = this.snake[0].x;
        newHeadPosition.y = this.snake[0].y + 1;
      } else {
        result.collision = true;
        return result;
      }
    }

    if (newHeadPosition.y < 1) {
      hitWall = true;
      // Пробуем двигаться влево или вправо вместо верх
      if (!this.wouldCollide({x: this.snake[0].x - 1, y: this.snake[0].y})) {
        this.currentDirection = 'left';
        newHeadPosition.x = this.snake[0].x - 1;
        newHeadPosition.y = this.snake[0].y;
      } else if (!this.wouldCollide({x: this.snake[0].x + 1, y: this.snake[0].y})) {
        this.currentDirection = 'right';
        newHeadPosition.x = this.snake[0].x + 1;
        newHeadPosition.y = this.snake[0].y;
      } else {
        result.collision = true;
        return result;
      }
    } else if (newHeadPosition.y > this.positionsCount) {
      hitWall = true;
      // Пробуем двигаться влево или вправо вместо низ
      if (!this.wouldCollide({x: this.snake[0].x - 1, y: this.snake[0].y})) {
        this.currentDirection = 'left';
        newHeadPosition.x = this.snake[0].x - 1;
        newHeadPosition.y = this.snake[0].y;
      } else if (!this.wouldCollide({x: this.snake[0].x + 1, y: this.snake[0].y})) {
        this.currentDirection = 'right';
        newHeadPosition.x = this.snake[0].x + 1;
        newHeadPosition.y = this.snake[0].y;
      } else {
        result.collision = true;
        return result;
      }
    }

    // Если ударились о стену и нашли безопасное направление, продолжаем
    if (hitWall) {
      // Проверяем финальную позицию на столкновение с собой
      if (this.checkNewPositionForCollision(newHeadPosition)) {
        result.collision = true;
        return result;
      }
    } else {
      // Обычное движение без столкновения со стеной
      if (this.checkNewPositionForCollision(newHeadPosition)) {
        result.collision = true;
        return result;
      }
    }

    // Проверка съедания еды
    if (foodPosition && foodPosition.x === newHeadPosition.x && foodPosition.y === newHeadPosition.y) {
      result.gotFood = true;
    } else {
      this.snake.pop();
    }

    // Добавляем голову
    this.snake.unshift(newHeadPosition);

    // Отрисовка змейки
    this.context.fillStyle = 'yellow';
    for (let i = 0; i < this.snake.length; i++) {
      this.context.fillRect(
        (this.snake[i].x - 1) * this.positionsSize,
        (this.snake[i].y - 1) * this.positionsSize,
        this.positionsSize,
        this.positionsSize
      );
    }

    return result;
  }

// Вспомогательный метод для проверки столкновения с позицией
  wouldCollide(position) {
    // Проверяем стенки
    if (position.x < 1 || position.x > this.positionsCount ||
      position.y < 1 || position.y > this.positionsCount) {
      return true;
    }

    // Проверяем столкновение с собой
    for (let i = 0; i < this.snake.length; i++) {
      if (position.x === this.snake[i].x && position.y === this.snake[i].y) {
        return true;
      }
    }

    return false;
  }

  checkNewPositionForCollision(newHeadPosition) {
    // Проверяем все сегменты змейки КРОМЕ головы
    for (let i = 1; i < this.snake.length; i++) {
      if (newHeadPosition.x === this.snake[i].x && newHeadPosition.y === this.snake[i].y) {
        return true;
      }
    }
    return false;
  }

// //телепортируется змейка //
//   showSnake(foodPosition) {
//     let result = {
//       gotFood: false,
//       collision: false,
//     };
//
//     // Сначала двигаем голову
//     let newHeadPosition = {
//       x: this.snake[0].x,
//       y: this.snake[0].y,
//     }
//
//     // Движение
//     if (this.currentDirection === 'left') {
//       newHeadPosition.x -= 1;
//     } else if (this.currentDirection === 'right') {
//       newHeadPosition.x += 1;
//     } else if (this.currentDirection === 'up') {
//       newHeadPosition.y -= 1;
//     } else if (this.currentDirection === 'down') {
//       newHeadPosition.y += 1;
//     }
//
//     // Телепортация через границы
//     if (newHeadPosition.x < 1) newHeadPosition.x = this.positionsCount;
//     if (newHeadPosition.x > this.positionsCount) newHeadPosition.x = 1;
//     if (newHeadPosition.y < 1) newHeadPosition.y = this.positionsCount;
//     if (newHeadPosition.y > this.positionsCount) newHeadPosition.y = 1;
//
//     // Проверка столкновения с собой
//     if (this.checkNewPositionForCollision(newHeadPosition)) {
//       result.collision = true;
//       return result;
//     }
//
//     // Проверка съедания еды
//     if (foodPosition && foodPosition.x === newHeadPosition.x && foodPosition.y === newHeadPosition.y) {
//       result.gotFood = true;
//     } else {
//       this.snake.pop();
//     }
//
//     // УБРАЛ ДУБЛИРОВАНИЕ - добавляем голову только один раз
//     this.snake.unshift(newHeadPosition);
//
//     // Отрисовка змейки
//     this.context.fillStyle = 'yellow'; // Яркий цвет для видимости
//     for (let i = 0; i < this.snake.length; i++) {
//       this.context.fillRect(
//         (this.snake[i].x - 1) * this.positionsSize,
//         (this.snake[i].y - 1) * this.positionsSize,
//         this.positionsSize,
//         this.positionsSize
//       );
//     }
//
//     return result;
//   }


}