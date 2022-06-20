'use strict'

function renderGallery(imgs = getImgs()) {
  const elGallery = document.querySelector('.gallery .images')
  let strHTML = ''
  imgs.forEach((img) => {
    strHTML += `<img src="${img.url}" onclick="onImgSelect(${img.id})" />`
  })
  elGallery.innerHTML = strHTML
}

function onFilterByKey(value) {
  if (!value) return renderGallery()
  const imgs = getImgs()
  var filteredImgs = imgs.filter((img) => {
    return img.keywords.some((keyward) => {
      return keyward.startsWith(value.toLowerCase())
    })
  })
  renderGallery(filteredImgs)
}
