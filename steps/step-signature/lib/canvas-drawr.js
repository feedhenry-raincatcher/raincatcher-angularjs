'use strict';

var CanvasDrawrMouse = function(element, options) {
  var canvas = element[0].getElementsByTagName('canvas')[0];
  var ctx = canvas.getContext("2d");
  canvas.style.width = '100%';
  canvas.width = (window.innerWidth);
  canvas.height = 200;
  canvas.style.width = '';

  // set props from options, but the defaults are for the cool kids
  ctx.lineWidth = options.size || 5;
  ctx.lineCap = options.lineCap || "round";
  options.color = options.color || 'blue';

  // last known position
  var pos = { x: 0, y: 0 };

  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mousedown', setPosition);
  canvas.addEventListener('mouseup', stop);
  canvas.addEventListener('mouseout', stop);

  // new position from mouse event
  function setPosition(e) {
    e.preventDefault();
    e.stopPropagation();
    canvas.focus();
    var rect = canvas.getBoundingClientRect();
    var offset = {
      top: rect.top,
      left: rect.left
    };
    pos.x = e.clientX - offset.left;
    pos.y = e.clientY - offset.top;
  }

  function draw(e) {
    e.preventDefault();
    e.stopPropagation();
    // mouse left button must be pressed
    if (e.buttons !== 1) {
      return;
    }

    ctx.beginPath(); // begin

    ctx.strokeStyle = options.color;

    ctx.moveTo(pos.x, pos.y); // from

    var rect = canvas.getBoundingClientRect();
    var offset = {
      top: rect.top,
      left: rect.left
    };
    pos.x = e.clientX - offset.left;
    pos.y = e.clientY - offset.top;
    ctx.lineTo(pos.x, pos.y); // to

    ctx.stroke(); // draw it!

  }

  function stop() {
    canvas.blur();
  }
};

var CanvasDrawr = function(element, options, $document) {
  var canvas = element[0].getElementsByTagName('canvas')[0];
  var ctx = canvas.getContext('2d');
  canvas.style.width = '100%';
  canvas.width = canvas.offsetWidth;
  canvas.style.width = '';

  // set props from options, but the defaults are for the cool kids
  ctx.lineWidth = options.size || 5;
  ctx.lineCap = options.lineCap || 'round';
  options.color = options.color || 'blue';
  ctx.pX = undefined;
  ctx.pY = undefined;

  var lines = new Array(2);
  var rect = canvas.getBoundingClientRect();

  var offset = {
    top: rect.top + $document[0].body.scrollTop,
    left: rect.left + $document[0].body.scrollLeft
  };

  var self = {
    //bind click events
    init: function() {
      // use anguler.element#on for automatic listener cleanup
      var canvasNg = angular.element(canvas);
      //set pX and pY from first click
      canvasNg.on('touchstart', self.preDraw);
      canvasNg.on('touchmove', self.draw);
      canvasNg.on('touchend', self.stop);
      canvasNg.on('touchcancel', self.stop);
    },

    preDraw: function(event) {
      canvas.focus();
      rect = canvas.getBoundingClientRect();
      offset = {
        top: rect.top + $document[0].body.scrollTop,
        left: rect.left + $document[0].body.scrollLeft
      };

      for (var i = 0; i < event.touches.length; i++) {
        var touch = event.touches[i];
        var id      = touch.identifier;

        lines[id] = {
          x     : touch.pageX - offset.left,
          y     : touch.pageY - offset.top,
          color : options.color
        };
      }
      event.preventDefault();
      event.cancelBubble = true;
    },

    draw: function(event) {
      for (var i = 0; i < event.touches.length; i++) {
        var touch = event.touches[i];
        var id = touch.identifier,

          moveX = touch.pageX - offset.left - lines[id].x,
          moveY = touch.pageY - offset.top - lines[id].y;

        var ret = self.move(id, moveX, moveY);
        lines[id].x = ret.x;
        lines[id].y = ret.y;
      }

      event.preventDefault();
    },

    move: function(i, changeX, changeY) {
      ctx.strokeStyle = lines[i].color;
      ctx.beginPath();
      ctx.moveTo(lines[i].x, lines[i].y);

      ctx.lineTo(lines[i].x + changeX, lines[i].y + changeY);
      ctx.stroke();
      ctx.closePath();

      return { x: lines[i].x + changeX, y: lines[i].y + changeY };
    },

    stop: function() {
      canvas.blur();
    }
  };

  return self.init();
};

module.exports = {
  CanvasDrawr: CanvasDrawr,
  CanvasDrawrMouse: CanvasDrawrMouse
};
