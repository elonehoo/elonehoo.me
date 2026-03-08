---
title: 使用 FileReader 本地预览
date: 2025-02-14T19:54:00.000+08:00
lang: zh
duration: 5min
---

本地上传文件，可以使用 `FileReader` 对文件进行预览。

```ts
const fileBlob = file.raw ? file.raw : file

if(fileBlob instanceof Blob){
  const fileReader = new FileReader()
  fileReader.readAsDataURL(fileBlob)
  fileReader.onload = (e) => {
    const result = e.target.result
  }
}
```
