(function () {
  if (typeof SnakeGame === "undefined") window.SnakeGame = {};

  var Food = SnakeGame.Food = function (game, pos) {
    this.game = game;
    this.color = "#FF0000";
    this.pos = pos;
  }

  Food.rad = 10;

  Food.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], Food.rad, 0, 2 * Math.PI, true
    );
    ctx.fill();
  }

  Food.prototype.getEaten = function (snake) {
    snake.length += 50;
    // TODO make this better
    this.game.foods = [];
  }

})();
