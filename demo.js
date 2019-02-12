var css = require('dom-css')

var pxSize = 50
var div = document.createElement('div')
document.body.appendChild(div)
css(div, {
  width: pxSize,
  height: pxSize,
  background: 'blue',
  position: 'absolute',
  left: (document.documentElement.clientWidth - pxSize) / 2,
  top: (document.documentElement.clientHeight - pxSize) / 2,
})

var pxSize2 = 10
var div2 = document.createElement('div')
document.body.appendChild(div2)
css(div2, {
  width: pxSize2,
  height: pxSize2,
  background: 'red',
  position: 'absolute',
  left: 0,
  top: 0,
  zIndex: 1,
})

var pinch = require('./')(window)

var scale = 1

// window.addEventListener('touchstart', function (ev) {
//   ev.preventDefault() // no scrolling
// })
document.addEventListener('gesturestart', function (ev) {
  ev.preventDefault() // no zoom
})

pinch.on('start', function () {
  css(div, 'background', 'green')
})

pinch.on('end', function () {
  css(div, 'background', 'blue')
})

pinch.on('change', function (current, prev, center) {
  var delta = (current - prev) * 0.01
  scale += delta
  css(div, 'transform', 'scale(' + scale.toFixed(5) + ')')
  css(div2, {
    left: (center[0] - pxSize2 * 0.5) + 'px',
    top: (center[1] - pxSize2 * 0.5) + 'px',
  }
})
