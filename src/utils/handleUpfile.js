import exif from 'exif-js';
const getOrientation = (file)=> {
  return new Promise((done, fail)=> {
    const flag = exif.getData(file, function () {
      exif.getAllTags(this);
      done(exif.getTag(this, 'Orientation'));
    });
    if (!flag) fail()
  })
}
const getImageObj = (file) =>{
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (e) => {
      var result = e.target.result; // base64
      var img = new Image();
      img.src = result;

      img.onload = ()=> {
        resolve(img)
      };
    };
  })
}
const getCanvasWidthAndHeight = (targetValue, width, height) => {
  if (Math.max(width, height) > targetValue) {
    let scale = Math.max(width, height) / targetValue;
    return {
      width: width / scale,
      height: height / scale
    }
  } else {
    return {
      width,
      height
    }
  }
}
const getCanvasFromImage = (orientation, width, height, img) => {
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext('2d');

  canvas.width = width;
  canvas.height = height;

  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, width, height);

  if (orientation != "" && orientation != 1 && orientation != undefined) {
    switch (orientation) {
      case 6://需要顺时针90度旋转
        canvas.width = height;
        canvas.height = width;
        ctx.rotate(90 * Math.PI / 180);
        ctx.drawImage(img, 0, -height, width, height);
        break;
      case 8://需要逆时针90度旋转
        canvas.width = height;
        canvas.height = width;
        ctx.rotate(-90 * Math.PI / 180);
        ctx.drawImage(img, -width, 0, width, height);
        break;
      case 3://需要180度旋转
        ctx.rotate(180 * Math.PI / 180);
        ctx.drawImage(img, -width, -height, width, height);
        break;
    }
  }
  return canvas;
}
const dataURItoBlob=(base64Data)=> {
  let byteString;
  if(base64Data.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(base64Data.split(',')[1]);
  else
      byteString = unescape(base64Data.split(',')[1]);
  let mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0];
  let ia = new Uint8Array(byteString.length);
  for(let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ia], {
      type: mimeString
  });
};
const dataURItoFile = (base64Data, name) => {
  let byteString;
  if(base64Data.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(base64Data.split(',')[1]);
  else
      byteString = unescape(base64Data.split(',')[1]);
  let mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0];
  let ia = new Uint8Array(byteString.length);
  for(let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
  }
  return new window.File([ia], name, { type: mimeString });
};
// const BlobToBuffer= (blob) => {
//   // blob转arrayBuffer
//   var reader = new FileReader();
//   reader.readAsArrayBuffer(blob);
//   reader.onload = function (event) {
//     event
//   }
// }
module.exports = {
  getOrientation,
  getImageObj,
  getCanvasWidthAndHeight,
  getCanvasFromImage,
  dataURItoBlob,
  dataURItoFile
};
