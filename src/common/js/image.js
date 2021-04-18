// 下载图片
export function downloadImg ({
  url,
  name = ''
} = {}) {
  const aEl = document.createElement('a')
  aEl.href = url
  aEl.download = name
  document.body.appendChild(aEl)
  aEl.click()
  document.body.removeChild(aEl)
}

export function downloadImg2 ({
 url,
 name = 'image.jpg'
} = {}) {
  const aEl = document.createElement('a')
  getBase64ImageByUrl(url).then(res => {
    aEl.href = res
    aEl.download = name
    document.body.appendChild(aEl)
    aEl.click()
    document.body.removeChild(aEl)
  })
}

function getBase64Image (img) {
  console.log(img.width, img.height)
  var canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);
  console.log(canvas.toDataURL)
  var dataURL = canvas.toDataURL('image/png');
  return dataURL;
}

function getBase64ImageByUrl (url) {
  var image = new Image()
  image.src = url
  return new Promise(resolve => {
    image.onload = function () {
      const base64 = getBase64Image(image)
      resolve(base64)
    }
  })
}
