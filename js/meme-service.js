'use strict'

var gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 }

var gImgs = [
  { id: 0, url: 'img/1.jpg', keywords: ['trump', 'president'] },
  { id: 1, url: 'img/2.jpg', keywords: ['dogs'] },
  { id: 2, url: 'img/3.jpg', keywords: ['baby', 'dogs', 'sleep'] },
  { id: 3, url: 'img/4.jpg', keywords: ['cat, sleep'] },
  { id: 4, url: 'img/5.jpg', keywords: ['baby'] },
  { id: 5, url: 'img/6.jpg', keywords: [] },
  { id: 6, url: 'img/7.jpg', keywords: ['baby'] },
  { id: 7, url: 'img/8.jpg', keywords: [''] },
  { id: 8, url: 'img/9.jpg', keywords: ['baby'] },
  { id: 9, url: 'img/10.jpg', keywords: ['obama'] },
  { id: 10, url: 'img/11.jpg', keywords: [] },
  { id: 11, url: 'img/12.jpg', keywords: [] },
  { id: 12, url: 'img/13.jpg', keywords: [] },
  { id: 13, url: 'img/14.jpg', keywords: [] },
  { id: 14, url: 'img/15.jpg', keywords: [] },
  { id: 15, url: 'img/16.jpg', keywords: [] },
  { id: 16, url: 'img/17.jpg', keywords: ['putin', 'president'] },
  { id: 17, url: 'img/18.jpg', keywords: [] },
]

var gMeme = {
  selectedImgId: 5,
  selectedLineIdx: 0,
  lines: [
    {
      txt: 'text here',
      size: 40,
      color: { fill: 'white', stroke: 'black' },
      font: 'Impact',
      pos: { x: 130, y: 50 },
      isDrag: false,
    },
    {
      txt: 'Hello',
      size: 40,
      color: { fill: 'white', stroke: 'black' },
      font: 'Impact',
      pos: { x: 130, y: 450 },
      isDrag: false,
    },
  ],
}

function getImgs() {
  return gImgs
}

function getMeme() {
  return gMeme
}

function setImg(imgId) {
  gMeme.selectedImgId = imgId
}

function setLineTxt(txt) {
  gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function setFillColor(color) {
  gMeme.lines[gMeme.selectedLineIdx].color.fill = color
}

function setStrokeColor(color) {
  gMeme.lines[gMeme.selectedLineIdx].color.stroke = color
}

function changeFontSize(value) {
  gMeme.lines[gMeme.selectedLineIdx].size += value
}

function switchLine() {
  gMeme.selectedLineIdx++
  if (gMeme.selectedLineIdx >= gMeme.lines.length) {
    gMeme.selectedLineIdx = 0
  }
}

function setSelectedLine(lineIdx) {
  gMeme.selectedLineIdx = lineIdx
}

function setFont(font) {
  gMeme.lines[gMeme.selectedLineIdx].font = font
}
function addLine() {
  const line = {
    txt: 'Enter text here',
    size: 40,
    color: { fill: 'white', stroke: 'black' },
    font: 'Impact',
    pos: { x: 130, y: gCanvas.height / 2 },
    isDrag: false,
  }
  gMeme.lines.push(line)
  gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function deleteLine() {
  gMeme.lines.splice(gMeme.selectedLineIdx, 1)
}

function saveToStorage(key, val) {
  localStorage.setItem(key, JSON.stringify(val))
}

function loadFromStorage(key) {
  var val = localStorage.getItem(key)
  return JSON.parse(val)
}

function moveTxt(px) {
  gMeme.lines[gMeme.selectedLineIdx].pos.y += px
}

function alignLeft() {
  gMeme.lines[gMeme.selectedLineIdx].pos.x = 10
  console.log(gCtx.measureText(gMeme.lines[gMeme.selectedLineIdx].txt).width)
}

function alignRight(x) {
  gMeme.lines[gMeme.selectedLineIdx].pos.x = x
}

function alignCenter(x) {
  gMeme.lines[gMeme.selectedLineIdx].pos.x = x
}
