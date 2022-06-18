'use strict'

function renderGallery() {
  var elGallery = document.querySelector('.gallery .images')
  var strHTML = ''
  var imgs = getImgs()
  imgs.forEach((img) => {
    strHTML += `<img src="${img.url}" onclick="onImgSelect(${img.id})" />`
  })
  elGallery.innerHTML = strHTML
}

renderGallery()
