'use strict'

let gCanvas
let gCtx
let gStartPos

function init() {
  gCanvas = null
  gCtx = null
  renderGallery()
}

function onImgSelect(imgId) {
  setImg(imgId)
  MoveToEditor()
  renderMeme()
}

function MoveToEditor() {
  const elGallery = document.querySelector('.gallery')
  const elEditor = document.querySelector('.editor')
  elGallery.classList.add('hidden')
  elEditor.classList.remove('hidden')
  gCanvas = document.querySelector('.editor-canvas')
  gCtx = gCanvas.getContext('2d')
}

function renderMeme() {
  const imgs = getImgs()
  const meme = getMeme()
  const src = imgs[meme.selectedImgId].url
  drawImgFromlocal(src)
}

function drawImgFromlocal(src) {
  const meme = getMeme()
  const img = new Image()
  img.src = src
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height) //img,x,y,xend,yend
    if (meme.lines.length) {
      drawText()
      drawFrame()
    }
  }
}

function drawText() {
  const meme = getMeme()
  meme.lines.forEach((line) => {
    gCtx.lineWidth = 2
    gCtx.fillStyle = line.color.fill
    gCtx.strokeStyle = line.color.stroke
    gCtx.font = `${line.size}px ${line.font}`
    gCtx.fillText(line.txt, line.pos.x, line.pos.y)
    gCtx.strokeText(line.txt, line.pos.x, line.pos.y)
  })
}

function drawFrame() {
  const meme = getMeme()
  const line = meme.lines[meme.selectedLineIdx]
  console.log(line)
  const lineWidth = gCtx.measureText(line.txt).width
  console.log(lineWidth)
  const pos = line.pos
  gCtx.lineWidth = 2
  gCtx.beginPath()
  gCtx.moveTo(pos.x - 10, pos.y + 10)
  gCtx.lineTo(pos.x + 10 + lineWidth, pos.y + 10)
  gCtx.lineTo(pos.x + 10 + lineWidth, pos.y - line.size)
  gCtx.lineTo(pos.x - 10, pos.y - line.size)
  gCtx.closePath()
  gCtx.strokeStyle = 'red'
  gCtx.stroke()
}

function onMoveTxt(px) {
  moveTxt(px)
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
  const meme = getMeme()
  const currSize = meme.lines[meme.selectedLineIdx].size
  console.log(meme.lines)
  if (currSize <= 10 && value < 0) return
  changeFontSize(value)
  renderMeme()
}

function onSwitchLine() {
  switchLine()
  setInputValue()
  renderMeme()
}

function setInputValue() {
  const elInput = document.querySelector('.txt-input')
  const meme = getMeme()
  if (meme.lines.length) {
    elInput.value = meme.lines[meme.selectedLineIdx].txt
    elInput.value
  } else {
    elInput.value = null
  }
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

function onAddLine() {
  addLine()
  setInputValue()
  renderMeme()
}

function moveToGallery() {
  const elGallery = document.querySelector('.gallery')
  const elEditor = document.querySelector('.editor')
  elEditor.classList.add('hidden')
  elGallery.classList.remove('hidden')
}

function onAlignLeft() {
  alignLeft()
  renderMeme()
}

function onAlignRight() {
  const meme = getMeme()
  const line = meme.lines[meme.selectedLineIdx]
  const lineWidth = gCtx.measureText(line.txt).width
  const x = gCanvas.width - lineWidth - 10
  alignRight(x)
  renderMeme()
}

function onAlignCenter() {
  const meme = getMeme()
  const line = meme.lines[meme.selectedLineIdx]
  const lineWidth = gCtx.measureText(line.txt).width
  const x = gCanvas.width / 2 - lineWidth / 2
  alignCenter(x)
  renderMeme()
}

function isLineClicked(ev) {
  const meme = getMeme()
  const pos = getEvPos(ev)
  const lineIdx = meme.lines.findIndex((line) => {
    const lineWidth = gCtx.measureText(line.txt).width
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
  const pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  }
  return pos
}

function onDown(ev) {
  if (!isLineClicked(ev)) return
  const pos = getEvPos(ev)
  const meme = getMeme()
  meme.lines[meme.selectedLineIdx].isDrag = true
  gStartPos = pos
  gCanvas.style.cursor = 'grabbing'
  setInputValue()
}

function onMove(ev) {
  const pos = getEvPos(ev)
  const meme = getMeme()
  if (meme.lines[meme.selectedLineIdx].isDrag) {
    const line = meme.lines[meme.selectedLineIdx]
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    line.pos.x += dx
    line.pos.y += dy
    gStartPos = pos
    renderMeme()
  }
}

function onUp() {
  const meme = getMeme()
  meme.lines[meme.selectedLineIdx].isDrag = false
  gCanvas.style.cursor = 'grab'
}
