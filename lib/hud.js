(function () {
  if (typeof SnakeGame === "undefined") window.SnakeGame = {};

  var Hud = SnakeGame.Hud = function () {
    this.$el = $('#hud');
  }

  Hud.prototype.init = function (name) {
    var content = localStorage.getItem(name) || 0;
    localStorage.setItem(name, content);
    $("#" + name).html(content);
  }

  Hud.prototype.edit = function (name, value) {
    localStorage.setItem(name, value);
    $("#" + name).html(value);
  }

  Hud.prototype.increment = function (name, isStored) {
    if (isStored) {
      this.edit(name, +(localStorage.getItem(name)) + 1);
    } else {
      var value = $("#" + name).html();
      $("#" + name).html(+value + 1);
    }
  }

  Hud.prototype.incrementScore = function () {
    this.increment("score", true);
    if (+(localStorage.getItem('score')) > +(localStorage.getItem('hiscore'))) {
      this.increment("hiscore", true);
    }
  }
})();
