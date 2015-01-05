(function () {
  if (typeof SnakeGame === "undefined") window.SnakeGame = {};

  var Game = SnakeGame.Game = function (width, height, multiplayer) {
    this.dim = width;
    // width and height should always be equal
    this.rad = this.dim / 2;

    this.foods = [];

    this.multiplayer = multiplayer;
    if (this.multiplayer) {
      this.snake = new SnakeGame.Snake(this, "#00FF00", this.dim / 3);
      this.snake2 = new SnakeGame.Snake(this, "#FF00FF", (2 * this.dim) / 3);
    } else {
      this.snake = new SnakeGame.Snake(this, "#00FF00", this.dim / 2);
    }
  }

  Game.prototype.step = function () {
    this.checkKeys();
    this.checkFood();
    if (this.multiplayer) {
      this.snake.step(this.snake2);
      this.snake2.step(this.snake);
    } else {
      this.snake.step();
    }
  }

  Game.prototype.checkKeys = function () {
    if (this.multiplayer) {
      if (key.isPressed("left"))  this.snake2.rotate(8);
      if (key.isPressed("right")) this.snake2.rotate(-8);
      if (key.isPressed("a"))     this.snake.rotate(8);
      if (key.isPressed("d"))     this.snake.rotate(-8);
    } else {
      if (key.isPressed("left"))  this.snake.rotate(8);
      if (key.isPressed("right")) this.snake.rotate(-8);
    }
  }

  Game.prototype.checkFood = function () {
    if (this.foods.length === 0) {
      this.foods.push(new SnakeGame.Food(this, this.foodCoords()));
    }
  }

  Game.prototype.foodCoords = function () {
    // Generate the coords in polar, then convert to Cartesian.
    // Not going to bother with degToRad here.
    var r = Math.random() * (this.rad - SnakeGame.Food.rad);
    var phi = Math.random() * Math.PI * 2;

    var x = r * Math.cos(phi);
    var y = r * Math.sin(phi);

    return [x + this.rad, y + this.rad];
  }

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, this.width, this.height);
    ctx.fillStyle = "#999999";
    ctx.fillRect(0, 0, this.width, this.height);

    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath();
    ctx.arc(
      this.rad, this.rad, this.rad, 0, 2 * Math.PI, true
    );
    ctx.fill();

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    if (this.multiplayer) {
      ctx.font = "150px sans-serif";
      ctx.fillStyle = "#CCFFCC";
      ctx.fillText(this.snake.foodsEaten, this.rad * 2 / 3, this.rad);
      ctx.fillStyle = "#FFCCFF";
      ctx.fillText(this.snake2.foodsEaten, this.rad * 4 / 3, this.rad);
    } else {
      ctx.font = "200px sans-serif";
      ctx.fillStyle = "#CCCCCC";
      ctx.fillText(this.snake.foodsEaten, this.rad, this.rad);
    }

    this.foods.forEach (function (food) {
      food.draw(ctx);
    })
    this.snake.draw(ctx);
    if (this.multiplayer) this.snake2.draw(ctx);
  }

})();
