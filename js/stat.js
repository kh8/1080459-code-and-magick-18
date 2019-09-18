'use strict';

var cloud = {
  WIDTH: 420,
  HEIGHT: 270,
  X: 100,
  Y: 10,
  WINDOW_COLOR: 'rgba(0, 0, 0, 0.7)',
  SHADOW_COLOR: '#ccc'
};

var bar = {
  SPACE: 50,
  WIDTH: 40,
  HEIGHT: 150,
  GAP: 10,
  CURRENT_USER_COLOR: 'rgba(255, 0, 0, 1)'
};

var statsText = {
  HEADER_FONT: '16px PT Mono',
  HEADER_FONT_COLOR: '#000',
  RESULTS_FONT: '14px PT Mono'
};

var getMaxElement = function (arr) {
  return Math.max.apply(null, arr);
};

var getRandom100 = function () {
  return Math.floor(Math.random() * 100);
};

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, cloud.WIDTH, cloud.HEIGHT);
};

var renderHeader = function (ctx) {
  ctx.fillStyle = statsText.HEADER_FONT_COLOR;
  ctx.font = statsText.HEADER_FONT;
  ctx.fillText('Ура вы победили!', cloud.X + 15 * bar.GAP, cloud.Y + 2 * bar.GAP);
  ctx.fillText('Список результатов:', cloud.X + bar.GAP, cloud.Y + 4 * bar.GAP);
};

var renderBar = function (ctx, player, time, maxTime, barNumber) {
  ctx.fillStyle = (player === 'Вы') ? bar.CURRENT_USER_COLOR : 'hsl(253, ' + getRandom100() + '%, 39%)';
  ctx.font = statsText.RESULTS_FONT;
  ctx.fillText(player, cloud.X + 2 * bar.GAP + 2 * bar.SPACE * barNumber, cloud.HEIGHT);
  ctx.fillRect(cloud.X + 2 * bar.GAP + bar.SPACE * 2 * barNumber, cloud.HEIGHT - 2 * bar.GAP, bar.WIDTH, -bar.HEIGHT * time / maxTime);
  ctx.fillText(Math.floor(parseInt(time, 10)), cloud.X + 2 * bar.GAP + bar.SPACE * 2 * barNumber, -bar.HEIGHT * time / maxTime + 23 * bar.GAP);
};

window.renderStatistics = function (ctx, players, times) {
  var maxTime = getMaxElement(times);
  renderCloud(ctx, cloud.X + bar.GAP, cloud.Y + bar.GAP, cloud.WINDOW_COLOR);
  renderCloud(ctx, cloud.X, cloud.Y, cloud.SHADOW_COLOR);
  renderHeader(ctx);
  for (var i = 0; i < players.length; i++) {
    renderBar(ctx, players[i], times[i], maxTime, i);
  }
};
