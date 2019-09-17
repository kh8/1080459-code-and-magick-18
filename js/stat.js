'use strict';

var cloudSize = {
  WIDTH: 420,
  HEIGHT: 270,
  X: 100,
  Y: 10,
  HEADER_FONT: '16px PT Mono',
  HEADER_FONT_COLOR: '#000',
  WINDOWCOLOR: 'rgba(0, 0, 0, 0.7)',
  SHADOWCOLOR: '#ccc'
};

var barSize = {
  SPACE: 50,
  WIDTH: 40,
  HEIGHT: 150,
  GAP: 10,
  FONT_GAP: 15,
  USERCOLOR: 'rgba(255, 0, 0, 1)'
};

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, cloudSize.WIDTH, cloudSize.HEIGHT);
};

var getMaxElement = function (arr) {
  return Math.max.apply(null, arr);
};

var getRandom100 = function () {
  return Math.floor(Math.random() * 100);
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, cloudSize.X + barSize.GAP, cloudSize.Y + barSize.GAP, cloudSize.WINDOWCOLOR);
  renderCloud(ctx, cloudSize.X, cloudSize.Y, cloudSize.SHADOWCOLOR);
  var maxTime = getMaxElement(times);
  ctx.fillStyle = cloudSize.HEADER_FONT_COLOR;
  ctx.font = cloudSize.HEADER_FONT;
  ctx.fillText('Ура вы победили!\nСписок результатов:', cloudSize.X + barSize.GAP, cloudSize.Y + barSize.GAP + barSize.FONT_GAP);
  for (var i = 0; i < players.length; i++) {
    ctx.fillStyle = (players[i] === 'Вы') ? barSize.USERCOLOR : 'hsl(253, ' + getRandom100() + '%, 39%)';
    ctx.fillText(players[i], cloudSize.X + 2 * barSize.GAP + 2 * barSize.SPACE * i, cloudSize.HEIGHT - barSize.FONT_GAP);
    ctx.fillRect(cloudSize.X + 2 * barSize.GAP + barSize.SPACE * 2 * i, cloudSize.HEIGHT - 2 * barSize.FONT_GAP, barSize.WIDTH, -barSize.HEIGHT * times[i] / maxTime);
    ctx.fillText(Math.floor(parseInt(times[i], 10)), cloudSize.X + 2 * barSize.GAP + barSize.SPACE * 2 * i, -barSize.HEIGHT * times[i] / maxTime + 22 * barSize.GAP);
  }
};
