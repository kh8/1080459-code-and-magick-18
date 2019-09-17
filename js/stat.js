'use strict';

var cloudSize = {
  WIDTH: 420,
  HEIGHT: 270,
  X: 100,
  Y: 10
};

var barSize = {
  SPACE: 50,
  WIDTH: 40,
  HEIGHT: 150,
  GAP: 10,
  FONT_GAP: 15
};

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, cloudSize.WIDTH, cloudSize.HEIGHT);
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
    renderCloud(ctx, cloudSize.X + barSize.GAP, cloudSize.Y + barSize.GAP, 'rgba(0, 0, 0, 0.7)');
    renderCloud(ctx, cloudSize.X, cloudSize.Y, '#ccc');

    ctx.fillStyle = '#000';

    var maxTime = getMaxElement(times);
    ctx.font = '16px PT Mono';
    ctx.fillText('Ура вы победили!\nСписок результатов:', cloudSize.X + barSize.GAP, cloudSize.Y + barSize.GAP + barSize.FONT_GAP);
    for (var i = 0; i < players.length; i++) {
      var clr = Math.random() * 100;
      if (players[i] === 'Вы') {
        ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      } else {
        ctx.fillStyle = 'hsl(253, ' + clr + '%, 39%)';
      }
      ctx.fillText(players[i], cloudSize.X + 2 * barSize.GAP + 2 * barSize.SPACE * i, cloudSize.HEIGHT - barSize.FONT_GAP);
      ctx.fillRect(cloudSize.X + 2 * barSize.GAP + barSize.SPACE * 2 * i, cloudSize.HEIGHT - 2 * barSize.FONT_GAP, barSize.WIDTH, -barSize.HEIGHT * times[i] / maxTime);
      ctx.fillText(Math.floor(parseInt(times[i], 10)), cloudSize.X + 2 * barSize.GAP + barSize.SPACE * 2 * i, -barSize.HEIGHT * times[i] / maxTime + 22 * barSize.GAP);

    }
};
