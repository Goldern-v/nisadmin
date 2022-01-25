// 本文件用于存放渲染时需要用到的函数
import { authStore, appStore, scheduleStore } from "src/stores";
const { queryObj } = appStore

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
  let tempArr:any = []
   masterInfo.tBody.map((body:any,bodyIdx:any)=>{
    let arr = []
    let rows = 0
    let needNullRows = false
    if (formContent[bodyIdx]) {
      rows = formContent[bodyIdx].tableData.length
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
      if (needNullRows && (!formContent[bodyIdx] || index >= formContent[bodyIdx].tableData.length)) {
          nullRow.map((item: any,rowIndex:any) => {  
            if(masterInfo.tBody[bodyIdx][rowIndex].defaultValue){
              item.value = masterInfo.tBody[bodyIdx][rowIndex].defaultValue[index]
            }else{
              item.value = masterInfo.tBody[bodyIdx][rowIndex].value || ""
            }
          })
      } else {
        nullRow.map((item: any) => {
          item.value = formContent[bodyIdx].tableData[index][item.key]
        })
      }
      arr.push(nullRow)
    }
    tempArr.push({tableData:arr})
   })
  setBodyModal([...tempArr])
}

// 用来同步数据的函数(不存在保存，数据根据接口变化)
export const noSaveBodyModal = (masterInfo: any, setBodyModal: Function, formContent: any) => {
  let tempArr:any = []
   masterInfo.tBody.map((body:any,bodyIdx:any)=>{
    let arr = []
    let rows = 0
    let needNullRows = false
    if (formContent[bodyIdx] && formContent[bodyIdx].tableData.length>masterInfo.defaulLength[bodyIdx]) {
      rows = formContent[bodyIdx].tableData.length
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
      if (needNullRows && (!formContent[bodyIdx] || index >= formContent[bodyIdx].tableData.length)) {
          nullRow.map((item: any,index:any) => {
            item.value = masterInfo.tBody[bodyIdx][index].value || ""
          })
      } else {
        nullRow.map((item: any) => {
          item.value = formContent[bodyIdx].tableData[index][item.key]
        })
      }
      arr.push(nullRow)
    }
    tempArr.push({tableData:arr})
   })
  setBodyModal([...tempArr])
}