'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var STEP_CUMULUS_CLOUD = 5;
var HEIGHT_CUMULUS_CLOUD = 20;
var GAP = 10;
var FONT_GAP = 20;
var BAR_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var TEXT_COLOR = '#000';
var MY_COLOR = 'rgba(255, 0, 0, 1)';


// Функция отрисовки текста
var renderText = function (ctx, text, align, x, y) {
  ctx.fillStyle = TEXT_COLOR;
  ctx.textBaseline = 'top';
  ctx.textAlign = align;
  ctx.font = '16px PT Mono';
  ctx.fillText(text, x, y);
};

// Функция отрисовки облака статистики
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;

  renderCumulusCloudVertical(ctx, x, y, STEP_CUMULUS_CLOUD, -BAR_GAP, color);

  renderCumulusCloudHorizontal(ctx, x, y, -HEIGHT_CUMULUS_CLOUD, color);

  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);

  renderCumulusCloudVertical(ctx, x + CLOUD_WIDTH, y, STEP_CUMULUS_CLOUD, BAR_GAP, color);

  renderCumulusCloudHorizontal(ctx, x, y + CLOUD_HEIGHT, HEIGHT_CUMULUS_CLOUD, color);
};

// Функция вывода закругленного облака статистики слева и справа
var renderCumulusCloudVertical = function (ctx, beginX, beginY, cloudStep, cloudRadius, color) {
  var step = Math.floor(CLOUD_HEIGHT / cloudStep);

  ctx.beginPath();
  ctx.moveTo(beginX, beginY);

  for (var i = 0; i < Math.abs(cloudStep); i++) {
    ctx.quadraticCurveTo(beginX + cloudRadius, beginY + (step / 2) + step * i, beginX, beginY + step * (i + 1));
  }

  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
};

// Функция вывода закругленного облака статистики сверху и снизу
var renderCumulusCloudHorizontal = function (ctx, beginX, beginY, cloudRadius, color) {
  ctx.beginPath();
  ctx.moveTo(beginX, beginY);
  ctx.quadraticCurveTo(beginX + Math.round(CLOUD_WIDTH / 2), beginY + cloudRadius, beginX + CLOUD_WIDTH, beginY);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
};

var renderHistograms = function (ctx, names, times) {
  var maxTime = Math.max.apply(null, times);

  times.length = Math.min(names.length, times.length);
  names.length = times.length;

  for (var i = 0; i < names.length; i++) {
    var currentBarHeight = (BAR_HEIGHT * times[i]) / maxTime;
    var currentBarStep = (BAR_WIDTH + BAR_GAP) * i;
    var beginBarPosition = CLOUD_HEIGHT - GAP - FONT_GAP;

    renderText(ctx, names[i], 'left', CLOUD_X + BAR_GAP + currentBarStep, CLOUD_HEIGHT - CLOUD_Y - GAP);

    if (names[i] === 'Вы') {
      ctx.fillStyle = MY_COLOR;
    } else {
      var saturateControl = Math.round(Math.random() * 100);
      ctx.fillStyle = 'hsl(240, ' + saturateControl + '%, 50%)';
    }

    ctx.fillRect(CLOUD_X + BAR_GAP + currentBarStep, beginBarPosition - currentBarHeight, BAR_WIDTH, currentBarHeight);
    renderText(ctx, Math.round(times[i]), 'left', CLOUD_X + BAR_GAP + currentBarStep, beginBarPosition - FONT_GAP - currentBarHeight);
  }
};

// Основная функция отрисовки облака статистики
window.renderStatistics = function (ctx, names, times) {

  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  renderText(ctx, 'Ура вы победили!', 'center', CLOUD_X + CLOUD_WIDTH / 2, CLOUD_Y + GAP);
  renderText(ctx, 'Список результатов:', 'center', CLOUD_X + CLOUD_WIDTH / 2, CLOUD_Y + FONT_GAP + GAP);

  renderHistograms(ctx, names, times);
};
