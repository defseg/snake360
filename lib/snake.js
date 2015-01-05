(function () {
  if (typeof SnakeGame === "undefined") window.SnakeGame = {};

  var Snake = SnakeGame.Snake = function (game) {
    this.game = game;
    this.pos = [game.width / 2, game.height / 2]
    this.segments = [];
    this.segmentRadius = 5;
    this.length = 300;
    this.rotation = 180;
    this.vel = [0, -1];
    this.color = "#00FF00";
    this.spd = 2;
  }

  Snake.prototype.step = function () {
    this.move();
    this.checkCollisions();
  }

  Snake.prototype.rotate = function (inc) {
    this.rotation = (this.rotation + inc) % 360;
  }

  Snake.prototype.impulse = function () {
    return [Math.sin(SnakeGame.Util.degToRad(this.rotation)) * this.spd,
            Math.cos(SnakeGame.Util.degToRad(this.rotation)) * this.spd];
  }

  Snake.prototype.checkCollisions = function () {
    this.segments.slice(10).forEach (function (segment) {
      if (SnakeGame.Util.dist(this.pos, segment) < this.segmentRadius) {
        console.log('bonk')
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

})();
