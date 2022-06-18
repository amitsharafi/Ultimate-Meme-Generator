'use strict'

var gCanvas
var gCtx
var gStartPos

function renderMeme() {
  var imgs = getImgs()
  var meme = getMeme()
  var src = imgs[meme.selectedImgId].url
  drawImgFromlocal(src)
}

function drawImgFromlocal(src) {
  var meme = getMeme()
  var img = new Image()
  img.src = src
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height) //img,x,y,xend,yend
    if (meme.lines.length) {
      var txt = meme.lines[meme.selectedLineIdx].txt
      drawText(txt)
      drawFrame()
    }
  }
}

function drawText() {
  var meme = getMeme()
  meme.lines.forEach((line) => {
    gCtx.lineWidth = 2
    gCtx.fillStyle = line.color.fill
    gCtx.strokeStyle = line.color.stroke
    gCtx.font = `${line.size}px ${line.font}`
    gCtx.textAlign = line.align
    gCtx.fillText(line.txt, line.pos.x, line.pos.y)
    gCtx.strokeText(line.txt, line.pos.x, line.pos.y)
  })
}

function onMoveTxt(px) {
  moveTxt(px)
  renderMeme()
}

function drawFrame() {
  var meme = getMeme()
  var line = meme.lines[meme.selectedLineIdx]
  var lineWidth = gCtx.measureText(line.txt).width
  var pos = line.pos
  gCtx.lineWidth = 2
  gCtx.beginPath()
  gCtx.moveTo(pos.x - 10, pos.y + 10)
  gCtx.lineTo(pos.x + 10 + lineWidth, pos.y + 10)
  gCtx.lineTo(pos.x + 10 + lineWidth, pos.y - line.size)
  gCtx.lineTo(pos.x - 10, pos.y - line.size)
  // gCtx.moveTo(pos.x - 10 - lineWidth / 2, pos.y + 10)
  // gCtx.lineTo(pos.x + 10 + lineWidth / 2, pos.y + 10)
  // gCtx.lineTo(pos.x + 10 + lineWidth / 2, pos.y - line.size)
  // gCtx.lineTo(pos.x - 10 - lineWidth / 2, pos.y - line.size)
  gCtx.closePath()
  gCtx.strokeStyle = 'red'
  gCtx.stroke()
}

function onDown(ev) {
  var pos = getEvPos(ev)
  if (!isLineClicked(ev)) return
  var meme = getMeme()
  meme.lines[meme.selectedLineIdx].isDrag = true
  gStartPos = pos
}

function onMove(ev) {
  var meme = getMeme()
  if (meme.lines[meme.selectedLineIdx].isDrag) {
    var pos = getEvPos(ev)
    var dx = pos.x - gStartPos.x
    var dy = pos.y - gStartPos.y
    meme.lines[meme.selectedLineIdx].pos.x += dx
    meme.lines[meme.selectedLineIdx].pos.y += dy
    gStartPos = pos
    renderMeme()
  }
}

function onUp() {
  var meme = getMeme()
  meme.lines[meme.selectedLineIdx].isDrag = false
}

function isLineClicked(ev) {
  var meme = getMeme()
  var pos = getEvPos(ev)
  var lineIdx = meme.lines.findIndex((line) => {
    var lineWidth = gCtx.measureText(line.txt).width
    return (
      pos.x >= line.pos.x &&
      pos.x <= line.pos.x + lineWidth &&
      pos.y <= line.pos.y &&
      pos.y >= line.pos.y - line.size
    )
  })
  if (lineIdx !== -1) {
    setSelectedLine(lineIdx)
    renderMeme()
    return true
  }
}

function getEvPos(ev) {
  //Gets the offset pos , the default pos
  var pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  }
  // Check if its a touch ev
  // if (gTouchEvs.includes(ev.type)) {
  //   //soo we will not trigger the mouse ev
  //   ev.preventDefault()
  //   //Gets the first touch point
  //   ev = ev.changedTouches[0]
  //   //Calc the right pos according to the touch screen
  //   pos = {
  //     x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
  //     y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
  //   }
  // }
  return pos
}

// clickedPos.x >= pos.x &&
//   clickedPos.x <= pos.x + txtWidth &&
//   clickedPos.y <= pos.y &&
//   clickedPos.y >= pos.y + txtHeight

// function drawLine(x, y, xEnd, yEnd) {
//   gCtx.lineWidth = 2
//   gCtx.moveTo(x - 10, y - 10)
//   gCtx.lineTo(xEnd, yEnd)
//   gCtx.strokeStyle = 'red'
//   gCtx.stroke()
// }

function onImgSelect(imgId) {
  setImg(imgId)
  var elGallery = document.querySelector('.gallery')
  var elEditor = document.querySelector('.editor')
  gCanvas = document.querySelector('.editor-canvas')
  elGallery.classList.add('hidden')
  elEditor.classList.remove('hidden')
  gCtx = gCanvas.getContext('2d')
  renderMeme()
}

function onChangeTxt(txt) {
  setLineTxt(txt)
  renderMeme()
}

function onSetFillColor(color) {
  setFillColor(color)
  renderMeme()
}

function onSetStrokeColor(color) {
  setStrokeColor(color)
  renderMeme()
}

function onChangeFontSize(value) {
  var meme = getMeme()
  var currSize = meme.lines[meme.selectedLineIdx].size
  if (currSize <= 10 && value < 0) return
  changeFontSize(value)
  renderMeme()
}

function onSwitchLine() {
  switchLine()
  setInputValue()
  renderMeme()
}

function onSetFont(font) {
  setFont(font)
  renderMeme()
}

function onDeleteLine() {
  deleteLine()
  switchLine()
  setInputValue()
  renderMeme()
}

function setInputValue() {
  var elInput = document.querySelector('.txt-input')
  var meme = getMeme()
  if (meme.lines.length) {
    elInput.value = meme.lines[meme.selectedLineIdx].txt
    elInput.value
  } else {
    elInput.value = null
  }
}

function onAddLine() {
  addLine()
  renderMeme()
}

function returnToGallery() {
  var elGallery = document.querySelector('.gallery')
  var elEditor = document.querySelector('.editor')
  gCanvas = document.querySelector('.editor-canvas')
  elEditor.classList.add('hidden')
  elGallery.classList.remove('hidden')
}

function onAlignLeft() {
  alignLeft()
  renderMeme()
}

function onAlignRight() {
  var meme = getMeme()
  var line = meme.lines[meme.selectedLineIdx]
  var lineWidth = gCtx.measureText(line.txt).width
  var x = gCanvas.width - lineWidth - 10
  alignRight(x)
  renderMeme()
}

function onAlignCenter() {
  var meme = getMeme()
  var line = meme.lines[meme.selectedLineIdx]
  var lineWidth = gCtx.measureText(line.txt).width
  var x = gCanvas.width / 2 - lineWidth / 2
  alignCenter(x)
  renderMeme()
}
