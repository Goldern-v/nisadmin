
import React from 'react'
import { message, Modal } from "antd/es";
import { FileType } from "src/types/file";

/**
 * 文件大小
 * @param fileByte 文件字节大小
 */

export function getFileSize(fileByte: number | string) {
  var fileSizeByte = Number(fileByte);
  var fileSizeMsg = "";
  if (fileSizeByte < 1048576)
    fileSizeMsg = (fileSizeByte / 1024).toFixed(2) + "KB";
  else if (fileSizeByte == 1048576) fileSizeMsg = "1MB";
  else if (fileSizeByte > 1048576 && fileSizeByte < 1073741824)
    fileSizeMsg = (fileSizeByte / (1024 * 1024)).toFixed(2) + "MB";
  else if (fileSizeByte > 1048576 && fileSizeByte == 1073741824)
    fileSizeMsg = "1GB";
  else if (fileSizeByte > 1073741824 && fileSizeByte < 1099511627776)
    fileSizeMsg = (fileSizeByte / (1024 * 1024 * 1024)).toFixed(2) + "GB";
  else fileSizeMsg = "文件超过1TB";
  return fileSizeMsg;
}

// 导出文件
export const fileDownload = (res: any, fileName?: string) => {
  /** 判断是否成功 */
  if (res.headers["cr-download-code"] == "300") {
    let warningMsg = res.headers["cr-download-message"]
      ? decodeURI(res.headers["cr-download-message"])
      : "暂无记录"

    if (warningMsg.indexOf('\n') > -1)
      return Modal.warn({
        title: '警告',
        mask: false,
        content: <pre style={{ whiteSpace: 'pre-wrap' }}>{warningMsg}</pre>
      })
    else
      return message.warn(warningMsg)
  }

  let filename = fileName
    ? fileName
    : res.headers["content-disposition"]
      ? decodeURIComponent(
        res.headers["content-disposition"].replace("attachment;filename=", "")
      )
      : "导出文件";
  let blob = new Blob([res.data], {
    type: res.data.type // 'application/vnd.ms-excel;charset=utf-8'
  });

  let a = document.createElement("a");
  let href = window.URL.createObjectURL(blob); // 创建链接对象
  a.href = href;
  a.download = filename; // 自定义文件名
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(href);
  document.body.removeChild(a); // 移除a元素
};

/**
 * 获取文件类型
 */
export const getFileType = (filePath: string): FileType => {
  if (!filePath) return "other";
  var index = filePath.lastIndexOf(".");
  var ext = filePath.substr(index + 1);
  let imgExtList = [
    "png",
    "jpg",
    "jpeg",
    "bmp",
    "gif",
    "webp",
    "psd",
    "svg",
    "tiff"
  ];
  let pdfExtList = ["pdf"];
  let excelExtList = ["xlsx", "xls", 'xlsm', 'xltx', 'xltm', 'xlsb', 'xlam'];
  let wordExtList = ["docx", "doc", "docm" , "dotx" , "dotm"];
  let pptExtList = ['ppt', 'pptx', 'pptm', 'ppsx', 'ppsm', 'potx', 'potm', 'ppam']
  let videoExtList = [
    "avi",
    "rmvb",
    "rm",
    "asf",
    "divx",
    "mpg",
    "mpeg",
    "mpe",
    "wmv",
    "mp4",
    "mkv",
    "vob"
  ];
  if (imgExtList.includes(ext)) {
    return "img";
  } else if (pdfExtList.includes(ext)) {
    return "pdf";
  } else if (excelExtList.includes(ext)) {
    return "excel";
  } else if (wordExtList.includes(ext)) {
    return "word";
  } else if (videoExtList.includes(ext)) {
    return "video";
  } else if (pptExtList.includes(ext)) {
    return "ppt";
  } else {
    return "other";
  }
};

/** 文件预览图 */
export const getFilePrevImg = (filePath: string) => {
  let fileType = getFileType(filePath);
  return require(`./images/${fileType}.png`);
};

/** 文件后缀名去除 */
export const clearFilePath = (path: string) => {
  return path.substring(0, path.lastIndexOf("."));
};
