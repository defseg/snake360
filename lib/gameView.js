(function () {
  if (typeof SnakeGame === "undefined") window.SnakeGame = {};

  var GameView = SnakeGame.GameView = function (game, ctx) {
    this.game = game;
    this.ctx = ctx;
  }

  GameView.prototype.start = function () {
    that = this;
    window.setInterval((function () {
      that.game.step();
      that.game.draw(that.ctx);
    }), 20)
  }

})();
