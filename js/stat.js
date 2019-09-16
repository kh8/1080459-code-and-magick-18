'use strict';

window.renderStatistics = function () {
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var GAP = 10;
  var FONT_GAP = 15;
  var TEXT_WIDTH = 50;
  var BAR_HEIGHT = 150;
  var barWidth = 40;

  var renderCloud = function (ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  };

  var getMaxElement = function (arr) {
    var maxElement = arr[0];

    for (var i = 0; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }

    return maxElement;
  };

  window.renderStatistics = function (ctx, players, times) {
    renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
    renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ccc');

    ctx.fillStyle = '#000';

    var maxTime = getMaxElement(times);
    ctx.fillText('Ура вы победили!\nСписок результатов:', CLOUD_X + GAP, CLOUD_Y + GAP + FONT_GAP);
    for (var i = 0; i < players.length; i++) {
      var clr = Math.random() * 100;
      if (players[i] === 'Вы') {
        ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      } else {
        ctx.fillStyle = 'hsl(253, ' + clr + '%, 39%)';
      }
      ctx.fillText(players[i], CLOUD_X + 2 * GAP + 2 * TEXT_WIDTH * i, CLOUD_HEIGHT - FONT_GAP);
      ctx.fillRect(CLOUD_X + 2 * GAP + TEXT_WIDTH * 2 * i, CLOUD_HEIGHT - 2 * FONT_GAP, barWidth, -BAR_HEIGHT * times[i] / maxTime);
      ctx.fillText(Math.floor(parseInt(times[i], 10)), CLOUD_X + 2 * GAP + TEXT_WIDTH * 2 * i, -BAR_HEIGHT * times[i] / maxTime + 22 * GAP);

    }
  };
};
