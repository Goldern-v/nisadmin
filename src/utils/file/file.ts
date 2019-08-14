import { message } from 'antd/es'
import { FileType } from 'src/types/file'

/**
 * 文件大小
 * @param fileByte 文件字节大小
 */

export function getFileSize(fileByte: number | string) {
  var fileSizeByte = Number(fileByte)
  var fileSizeMsg = ''
  if (fileSizeByte < 1048576) fileSizeMsg = (fileSizeByte / 1024).toFixed(2) + 'KB'
  else if (fileSizeByte == 1048576) fileSizeMsg = '1MB'
  else if (fileSizeByte > 1048576 && fileSizeByte < 1073741824)
    fileSizeMsg = (fileSizeByte / (1024 * 1024)).toFixed(2) + 'MB'
  else if (fileSizeByte > 1048576 && fileSizeByte == 1073741824) fileSizeMsg = '1GB'
  else if (fileSizeByte > 1073741824 && fileSizeByte < 1099511627776)
    fileSizeMsg = (fileSizeByte / (1024 * 1024 * 1024)).toFixed(2) + 'GB'
  else fileSizeMsg = '文件超过1TB'
  return fileSizeMsg
}

// 导出文件
export const fileDownload = (res: any, fileName?: string) => {
  /** 判断是否成功 */
  if (res.headers['cr-download-code'] == '300') {
    return message.warn(res.headers['cr-download-message'] ? decodeURI(res.headers['cr-download-message']) : '暂无记录')
  }

  let filename = fileName
    ? fileName
    : res.headers['content-disposition']
    ? decodeURIComponent(res.headers['content-disposition'].replace('attachment;filename=', ''))
    : '导出文件'
  let blob = new Blob([res.data], {
    type: res.data.type // 'application/vnd.ms-excel;charset=utf-8'
  })

  let a = document.createElement('a')
  let href = window.URL.createObjectURL(blob) // 创建链接对象
  a.href = href
  a.download = filename // 自定义文件名
  document.body.appendChild(a)
  a.click()
  window.URL.revokeObjectURL(href)
  document.body.removeChild(a) // 移除a元素
}

/**
 * 获取文件类型
 */

export const getFileType = (filePath: string): FileType => {
  var index = filePath.lastIndexOf('.')
  var ext = filePath.substr(index + 1)
  let imgExtList = ['png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp', 'psd', 'svg', 'tiff']
  let pdfExtList = ['pdf']
  let excelExtList = ['xlsx', 'xls']
  let wordExtList = ['docx', 'doc']
  if (imgExtList.includes(ext)) {
    return 'img'
  } else if (pdfExtList.includes(ext)) {
    return 'pdf'
  } else if (excelExtList.includes(ext)) {
    return 'excel'
  } else if (wordExtList.includes(ext)) {
    return 'word'
  } else {
    return 'other'
  }
}

/** 文件预览图 */
export const getFilePrevImg = (filePath: string) => {
  let fileType = getFileType(filePath)
  return require(`./images/${fileType}.png`)
  // if (fileType == 'img') {
  //   return require('./images/img.png')
  // } else if (fileType == 'pdf') {
  //   return require('./images/pdf.png')
  // }else if (fileType == 'excel') {
  //   return require('./images/excel.png')
  // }
}
