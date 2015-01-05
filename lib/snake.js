(function () {
  if (typeof SnakeGame === "undefined") window.SnakeGame = {};

  var Snake = SnakeGame.Snake = function (game) {
    this.game = game;
    this.segmentRadius = 5;
    this.color = "#00FF00";
    this.spd = 2;
    this.foodsEaten = 0;

    this.reset();
  }

  Snake.prototype.step = function () {
    this.move();
    this.checkFoods();
    this.checkCollisions();
  }

  Snake.prototype.rotate = function (inc) {
    this.rotation = (this.rotation + inc) % 360;
  }

  Snake.prototype.impulse = function () {
    return [Math.sin(SnakeGame.Util.degToRad(this.rotation)) * this.spd,
            Math.cos(SnakeGame.Util.degToRad(this.rotation)) * this.spd];
  }

  Snake.prototype.checkFoods = function () {
    this.game.foods.forEach (function (food) {
      if (SnakeGame.Util.dist(this.pos, food.pos) < SnakeGame.Food.rad + this.segmentRadius) {
        this.foodsEaten++;
        food.getEaten(this);
      }
    }.bind(this));
  }

  Snake.prototype.checkCollisions = function () {
    if (SnakeGame.Util.dist(this.pos, [this.game.rad, this.game.rad]) > (this.game.rad - this.segmentRadius)) {
      this.reset();
    }

    this.segments.slice(10).forEach (function (segment) {
      if (SnakeGame.Util.dist(this.pos, segment) < this.segmentRadius) {
        this.reset();
      }
    }.bind(this))
  }

  Snake.prototype.move = function () {
    this.vel = this.impulse();
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    this.segments.unshift(this.pos.slice());
    if (this.segments.length >= this.length) {
      this.segments.pop();
    };
  }

  Snake.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    this.segments.forEach (function (segment) {
      ctx.beginPath();
      ctx.arc(
        segment[0], segment[1], this.segmentRadius, 0, 2 * Math.PI, true
      );
      ctx.fill();
    }.bind(this))
  }

  Snake.prototype.reset = function () {
    this.pos = [this.game.dim / 2, this.game.dim / 2]
    this.segments = [];
    this.rotation = 180;
    this.vel = [0, -1];
    this.length = 50;
    this.foodsEaten = 0;
  }

})();
