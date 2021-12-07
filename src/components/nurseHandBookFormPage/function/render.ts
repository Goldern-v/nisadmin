// 本文件用于存放渲染时需要用到的函数
import { authStore, appStore, scheduleStore } from "src/stores";

// 用来复制空行的函数
export const copyNullRow = (nullRow: any, config: any, index: any, key: any) => {
  // 对于函数属性进行借用
  if (Object.prototype.toString.call(config[key]) == "[object Function]") {
    nullRow[index][key] = config[key].bind()
  } else {
    // 其他属性进行深拷贝
    nullRow[index][key] = JSON.parse(JSON.stringify(config[key]))
  }
}

// 用来复制空行的函数
export const initBodyModal = (masterInfo:any, setBodyModal:Function, formContent:any) => {
  console.log(formContent);
  let tempArr = []
  let rows = 0
  let needNullRows = false
  if (formContent.length > masterInfo.defaulLength) {
    rows = formContent.length
  } else {
    rows = masterInfo.defaulLength;
    needNullRows = true
  }
  for (let index = 0; index < rows; index++) {
    let nullRow: any = []
    masterInfo.tBody.map((config: any, index: any) => {
      nullRow.push({})
      for (let key in config) {
        copyNullRow(nullRow, config, index, key)
      }
    })

    nullRow.map((item: any) => {
      if (needNullRows && index >= formContent.length) {
        item.value = ""
      } else {
        item.value = formContent[index][item.key]
      }
    })
    tempArr.push(nullRow)
  }
  setBodyModal([...tempArr])
  scheduleStore.setIsSave(true)
}