(function () {
  if (typeof SnakeGame === "undefined") window.SnakeGame = {};

  var Game = SnakeGame.Game = function (width, height) {
    this.width = width;
    this.height = height;

    // width and height should always be equal
    this.rad = this.width / 2;

    this.snake = new SnakeGame.Snake(this);
  }

  Game.prototype.step = function () {
    this.checkKeys();
    this.snake.step();
  }

  Game.prototype.checkKeys = function () {
    if (key.isPressed("left"))  this.snake.rotate(8);
    if (key.isPressed("right")) this.snake.rotate(-8);
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

    this.snake.draw(ctx);
  }

})();
