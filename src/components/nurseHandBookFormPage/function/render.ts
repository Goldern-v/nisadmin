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
export const initBodyModal = (masterInfo: any, setBodyModal: Function, formContent: any) => {
  let tempArr = []
  if(masterInfo.multiTable){
    /*
      [
        {tableData:[{},{},{}]}
        {tableData:[{},{},{}]}
        {tableData:[{},{},{}]}
      ]
    */
   masterInfo.tBody.map((body:any,bodyIdx:any)=>{
    let rows = 0
    let needNullRows = false
    if (formContent[bodyIdx]&&(formContent[bodyIdx].length > masterInfo.defaulLength[bodyIdx])) {
      rows = formContent[bodyIdx].length
    } else {
      rows = masterInfo.defaulLength[bodyIdx];
      needNullRows = true
    }
    for (let index = 0; index < rows; index++) {
      let nullRow: any = []
      body.map((config: any, index: any) => {
        nullRow.push({})
        for (let key in config) {
          copyNullRow(nullRow, config, index, key)
        }
      })
      if (needNullRows && (!formContent[bodyIdx] || index >= formContent[bodyIdx].length)) {
          nullRow.map((item: any) => {
            item.value = ""
          })
      } else {
        nullRow.map((item: any) => {
        item.value = formContent[bodyIdx][index][item.key]
        })
      }
      tempArr.push(nullRow)
    }
   })
  }else{
    // [{},{},{}]
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
    if (needNullRows && index >= formContent.length) {
        nullRow.map((item: any) => {
          item.value = ""
        })
    } else {
      nullRow.map((item: any) => {
      item.value = formContent[index][item.key]
      })
    }
    tempArr.push(nullRow)
  }
  console.log(tempArr);
  }
  
  
  setBodyModal([...tempArr])
}