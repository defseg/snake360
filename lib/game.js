(function () {
  if (typeof SnakeGame === "undefined") window.SnakeGame = {};

  var Game = SnakeGame.Game = function (width, height) {
    this.dim = width;
    // width and height should always be equal
    this.rad = this.dim / 2;

    this.foods = [];
    this.snake = new SnakeGame.Snake(this);
  }

  Game.prototype.step = function () {
    this.checkKeys();
    this.checkFood();
    this.snake.step();
  }

  Game.prototype.checkKeys = function () {
    if (key.isPressed("left"))  this.snake.rotate(8);
    if (key.isPressed("right")) this.snake.rotate(-8);
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

    ctx.fillStyle = "#CCCCCC";
    ctx.font = "200px sans-serif";
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.snake.foodsEaten, this.rad, this.rad);

    this.foods.forEach (function (food) {
      food.draw(ctx);
    })
    this.snake.draw(ctx);
  }

})();
