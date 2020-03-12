const uploadEle = document.getElementById('upload');

uploadEle.onchange = function (e) {
    console.log(e.target.files[0]);
    const file = e.target.files[0];
    console.log(file);
    // 判断图片
    if (file.type.indexOf('image') === -1) {
        console.error('格式错误')
        return;
    }
    // 判断大小
    // if (file.size / 1024 > 2) {
    //     console.error('图片过大');
    //     return;
    // }
    // 压缩图片
    // 文件阅读对象
    let fileReader = new FileReader();
    fileReader.readAsDataURL(file); // 读取文件对象, 操作为异步
    fileReader.onload = () => {
        const base64Url = fileReader.result;
        const pro = canvasDataUrl(base64Url, 0.5, null);
        pro.then(ret => {
            console.log(ret);
        })
    }
}

function canvasDataUrl(base64Url, scale, callback) {
    var img = new Image();
    img.src = base64Url;
    // res成功的回调
    // rej失败的回调
    return new Promise((res, rej) => {
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const imgW = img.width;
            const imgH = img.height;
            canvas.height = imgH * scale;
            canvas.width = imgW * scale;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            // 上方是拉伸图片减低图片宽高
            const base64 = canvas.toDataURL('image/jpeg', 1); // 这一步是在压缩图片(第二个参数)
            res(convertBase64UrlToBlob(base64));
        }
    })
}

// base64 -> blob文件(用于上传)
function convertBase64UrlToBlob(urlData) {
    var arr = urlData.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {
        type: mime
    });
}