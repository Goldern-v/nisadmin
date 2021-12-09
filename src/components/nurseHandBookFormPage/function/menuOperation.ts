/*
  本文件用于存放右键菜单的功能函数
  参数说明：
    tbody:空行对象,包括了一整行的属性/函数
    bodyModal:数据源,代表了当前整个表体的数据
    setBodyModal:更改数据源的方法(触发渲染)
    selectIndex:当前选中行数
    selectRow:当前选中行数据(拥有已输入的数据)
    copyRow:用户复制的行数据
    setCopyRow:更改用户当前复制的数据
 */
import { message } from 'antd'
// 引入复制空行函数
import { copyNullRow } from "./render"

// 删除当前行
export const delCurrentRow = (tBody: any, bodyModal: any, setBodyModal: any, selectIndex: any) => {
  let nullRow: any = []
  tBody.map((config: any, index: any) => {
    nullRow.push({})
    for (let key in config) {
      // console.log(Object.prototype.toString.call(config[key]) == "[object Function]");
      copyNullRow(nullRow, config, index, key)
    }
  })
  bodyModal.splice(selectIndex, 1)
  bodyModal.push(nullRow)
  setBodyModal([...bodyModal])
}

// 清空当前行数据
export const wipeData = (tBody: any, bodyModal: any, setBodyModal: any, selectIndex: any) => {
  let nullRow: any = []
  tBody.map((config: any, index: any) => {
    nullRow.push({})
    for (let key in config) {
      // console.log(Object.prototype.toString.call(config[key]) == "[object Function]");
      copyNullRow(nullRow, config, index, key)
    }
  })
  bodyModal[selectIndex] = nullRow
  setBodyModal([...bodyModal])
}

// 插入空行事件
export const addRowBefore = (tBody: any, bodyModal: any, setBodyModal: any, selectIndex: any) => {
  let nullRow: any = []
  tBody.map((config: any, index: any) => {
    nullRow.push({})
    for (let key in config) {
      // console.log(Object.prototype.toString.call(config[key]) == "[object Function]");
      copyNullRow(nullRow, config, index, key)
    }
  })
  bodyModal.splice(selectIndex, 1, nullRow, bodyModal[selectIndex])
  setBodyModal([...bodyModal])
}
// 追加空行事件
export const addRowAfter = (tBody: any, bodyModal: any, setBodyModal: any, selectIndex: any) => {
  let nullRow: any = []
  tBody.map((config: any, index: any) => {
    nullRow.push({})
    for (let key in config) {
      // console.log(Object.prototype.toString.call(config[key]) == "[object Function]");
      copyNullRow(nullRow, config, index, key)
    }
  })
  bodyModal.splice(selectIndex, 1, bodyModal[selectIndex], nullRow)
  setBodyModal([...bodyModal])
}
// 复制整行事件
export const copyRow = (tBody: any, bodyModal: any, setBodyModal: any, selectIndex: any, selectRow: any, copyRow: any, setCopyRow: any) => {
  let nullRow: any = []
  bodyModal[selectIndex].map((config: any, index: any) => {
    nullRow.push({})
    for (let key in config) {
      // console.log(Object.prototype.toString.call(config[key]) == "[object Function]");
      copyNullRow(nullRow, config, index, key)
    }
  })
  setCopyRow(nullRow)
}
// 粘贴事件
export const paste = (tBody: any, bodyModal: any, setBodyModal: any, selectIndex: any, selectRow: any, copyRow: any, setCopyRow: any) => {
  if (JSON.stringify(copyRow) == "{}") {
    message.error('尚未复制内容！')
    return
  }
  bodyModal[selectIndex] = copyRow
  setBodyModal([...bodyModal])
}

// 计算当前行事件
export const calculation_currentRow = (tBody: any, bodyModal: any, setBodyModal: any, selectIndex: any, selectRow: any, copyRow: any, setCopyRow: any) => {
  let rules = bodyModal[selectIndex].filter((item: any) => item.calculation_rules).map((item: any) => {
    let [key1, operator, key2] = item.calculation_rules.split(" ")
    let resultKey = item.key
    return { key1, operator, key2, resultKey }
  })

  rules.map((rule: any) => {
    let val1 = Number(bodyModal[selectIndex].find((item: any) => item.key === rule.key1).value)
    let val2 = Number(bodyModal[selectIndex].find((item: any) => item.key === rule.key2).value)
    let resul: Number | String = 0
    switch (rule.operator) {
      case '+':
        resul = val1 + val2;
        break;
      case '-':
        resul = val1 - val2;
        break;
      case '*':
        resul = val1 * val2;
        break;
      case '/':
        resul = val1 / val2;
        break;
    }
    if (Object.is(resul, NaN)) { resul = '数值有误' }
    let colIndex = bodyModal[selectIndex].findIndex((item: any) => item.key === rule.resultKey)
    bodyModal[selectIndex][colIndex].value = resul
  })
}
export const calculation_currentColumn = (tBody: any, bodyModal: any, setBodyModal: any, selectIndex: any, selectRow: any, copyRow: any, setCopyRow: any, colIdx: any, masterInfo: any ) => {
  let ColumnArr:any = []
  bodyModal.map((row:any)=>{
    ColumnArr.push(row[colIdx].value)
  });
  let sum = ColumnArr.reduce((pro:any,cur:any)=>{
    return pro += Number(cur)
  },0)

  if (Object.is(sum, NaN)) { sum = '数值有误' }

  masterInfo.computeRow.find((item:any)=>{
    return item.key.split("_")[1] === tBody[colIdx].key
  }).value = sum
}
export default {
  copyRow,
  paste,
  addRowBefore,
  addRowAfter,
  wipeData,
  delCurrentRow,
  calculation_currentRow,
  calculation_currentColumn,
}