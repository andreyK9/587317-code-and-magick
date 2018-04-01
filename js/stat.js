'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 20;
var BAR_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var TEXT_COLOR = '#000';
var MY_COLOR = 'rgba(255, 0, 0, 1)';
var STEP_CUMULUS_CLOUD = 5;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderText = function (ctx, text, align, x, y) {
  ctx.fillStyle = TEXT_COLOR;
  ctx.textBaseline = 'top';
  ctx.textAlign = align;
  ctx.font = '16px PT Mono';
  ctx.fillText(text, x, y);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var renderCumulusCloudHeight = function (ctx, beginX, beginY, step, height, color) {
  var stepCurrent = Math.floor(CLOUD_HEIGHT / step);

  ctx.beginPath();
  ctx.moveTo(beginX, beginY);

  for (var i = 0; i < step; i++) {
    ctx.bezierCurveTo(beginX, beginY + stepCurrent * i, beginX + height, beginY + (stepCurrent / 2) + stepCurrent * i, beginX, beginY + stepCurrent * (i + 1));
  }

  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
};

window.renderStatistics = function (ctx, names, times) {

  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  renderCumulusCloudHeight(ctx, CLOUD_X + CLOUD_WIDTH + GAP, CLOUD_Y + GAP, STEP_CUMULUS_CLOUD, BAR_GAP, 'rgba(0, 0, 0, 0.7)');
  renderCumulusCloudHeight(ctx, CLOUD_X + CLOUD_WIDTH, CLOUD_Y, STEP_CUMULUS_CLOUD, BAR_GAP, '#fff');

  renderText(ctx, 'Ура вы победили!', 'center', CLOUD_X + CLOUD_WIDTH / 2, CLOUD_Y + GAP);
  renderText(ctx, 'Список результатов:', 'center', CLOUD_X + CLOUD_WIDTH / 2, CLOUD_Y + FONT_GAP + GAP);

  var maxTime = getMaxElement(times);

  var minArrowLength = Math.min(names.length, times.length);
  names.length = times.length = minArrowLength;

  for (var i = 0; i < names.length; i++) {
    renderText(ctx, names[i], 'left', CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, CLOUD_HEIGHT - CLOUD_Y - GAP);

    if (names[i] === 'Вы') {
      ctx.fillStyle = MY_COLOR;
    } else {
      var saturateControl = Math.round(Math.random() * 100);
      ctx.fillStyle = 'hsl(240, ' + saturateControl + '%, 50%)';
    }

    var currentBarHeight = (BAR_HEIGHT * times[i]) / maxTime;
    var currentBarStep = (BAR_WIDTH + BAR_GAP) * i;
    var beginBarPosition = CLOUD_HEIGHT - GAP - FONT_GAP;

    ctx.fillRect(CLOUD_X + BAR_GAP + currentBarStep, beginBarPosition - currentBarHeight, BAR_WIDTH, currentBarHeight);
    renderText(ctx, Math.round(times[i]), 'left', CLOUD_X + BAR_GAP + currentBarStep, beginBarPosition - FONT_GAP - currentBarHeight);
  }
};
