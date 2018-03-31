'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 20;
var TEXT_WIDTH = 50;
var BAR_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var TEXT_COLOR = '#000';
var MY_COLOR = 'rgba(255, 0, 0, 1)';

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
}

var renderText = function(ctx, text, align , x, y) {
  ctx.fillStyle = TEXT_COLOR;
  ctx.textBaseline = 'top';
  ctx.textAlign = align;
  ctx.font = '16px PT Mono';
  ctx.fillText(text, x, y);
}

var getMaxElement = function(arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function(ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  renderText(ctx, 'Ура вы победили!', 'center', CLOUD_X + CLOUD_WIDTH / 2, CLOUD_Y + GAP);
  renderText(ctx, 'Список результатов:', 'center', CLOUD_X + CLOUD_WIDTH / 2, CLOUD_Y + FONT_GAP + GAP);

  var maxTime = getMaxElement(times);

  for(var i = 0 ; i < names.length ; i++) {
    renderText(ctx, names[i], 'left', CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, CLOUD_HEIGHT - CLOUD_Y - GAP);

    if(names[i] === 'Вы') {
      ctx.fillStyle = MY_COLOR;
    } else {
      ctx.fillStyle = 'hsl(240,100%,50%)';
    }

    ctx.fillRect(CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, CLOUD_HEIGHT - GAP - FONT_GAP - (BAR_HEIGHT * times[i]) / maxTime, BAR_WIDTH, (BAR_HEIGHT * times[i]) / maxTime);
  }
}
