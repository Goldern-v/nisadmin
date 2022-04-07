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
export const delCurrentRow = (tBody: any, bodyModal: any, setBodyModal: any, selectIndex: any, selectRow: any, copyRow: any, setCopyRow: any, colIdx: any, computeRow: any ,bodyIdx:any,masterInfo:any) => {
  if(bodyModal[bodyIdx].tableData.length <= 1){
// if(bodyModal[bodyIdx].tableData.length <= masterInfo.defaulLength[bodyIdx]){
  message.error('当前行数少于1行，只可清空数据!')
    return
  }
  bodyModal[bodyIdx].tableData.splice(selectIndex, 1)
  setBodyModal([...bodyModal])
}

// 清空当前行数据
export const wipeData = (tBody: any, bodyModal: any, setBodyModal: any, selectIndex: any, selectRow: any, copyRow: any, setCopyRow: any, colIdx: any, computeRow: any ,bodyIdx:any) => {
  let nullRow: any = []
  tBody[bodyIdx].map((config: any, index: any) => {
    nullRow.push({})
    for (let key in config) {
      // console.log(Object.prototype.toString.call(config[key]) == "[object Function]");
      copyNullRow(nullRow, config, index, key)
    }
  })
  bodyModal[bodyIdx].tableData[selectIndex] = nullRow
  setBodyModal([...bodyModal])
}

// 插入空行事件
export const addRowBefore = (tBody: any, bodyModal: any, setBodyModal: any, selectIndex: any, selectRow: any, copyRow: any, setCopyRow: any, colIdx: any, computeRow: any ,bodyIdx:any) => {
  let nullRow: any = []
  tBody[bodyIdx].map((config: any, index: any) => {
    nullRow.push({})
    for (let key in config) {
      // console.log(Object.prototype.toString.call(config[key]) == "[object Function]");
      copyNullRow(nullRow, config, index, key)
    }
  })
  bodyModal[bodyIdx].tableData.splice(selectIndex, 1, nullRow, bodyModal[bodyIdx].tableData[selectIndex])
  setBodyModal([...bodyModal])
}
// 追加空行事件
export const addRowAfter = (tBody: any, bodyModal: any, setBodyModal: any, selectIndex: any, selectRow: any, copyRow: any, setCopyRow: any, colIdx: any, computeRow: any ,bodyIdx:any) => {
  let nullRow: any = []
  tBody[bodyIdx].map((config: any, index: any) => {
    nullRow.push({})
    for (let key in config) {
      // console.log(Object.prototype.toString.call(config[key]) == "[object Function]");
      copyNullRow(nullRow, config, index, key)
    }
  })
  bodyModal[bodyIdx].tableData.splice(selectIndex, 1, bodyModal[bodyIdx].tableData[selectIndex], nullRow)
  setBodyModal([...bodyModal])
}
// 复制整行事件
export const copyRow = (tBody: any, bodyModal: any, setBodyModal: any, selectIndex: any, selectRow: any, copyRow: any, setCopyRow: any, colIdx: any, computeRow: any ,bodyIdx:any) => {
  let nullRow: any = []
  bodyModal[bodyIdx].tableData[selectIndex].map((config: any, index: any) => {
    nullRow.push({})
    for (let key in config) {
      // console.log(Object.prototype.toString.call(config[key]) == "[object Function]");
      copyNullRow(nullRow, config, index, key)
    }
  })
  setCopyRow(nullRow)
}
// 粘贴事件
export const paste = (tBody: any, bodyModal: any, setBodyModal: any, selectIndex: any, selectRow: any, copyRow: any, setCopyRow: any, colIdx: any, computeRow: any ,bodyIdx:any,masterInfo:any) => {
  if (JSON.stringify(copyRow) == "{}") {
    message.error('尚未复制内容！')
    return
  }
  let isIncludes = masterInfo.tBody[bodyIdx].some((item:any)=>{return item.key==copyRow[0].key})
  if(!isIncludes){
    message.error('非同类型表无法粘贴！')
    return
  }
  bodyModal[bodyIdx].tableData[selectIndex] = copyRow
  setBodyModal([...bodyModal])
}

// 粘贴为纯文本事件
export const pasteText = (tBody: any, bodyModal: any, setBodyModal: any, selectIndex: any, selectRow: any, copyRow: any, setCopyRow: any, colIdx: any, computeRow: any ,bodyIdx:any,masterInfo:any) => {
  navigator.clipboard.readText()
  .then(text => {
    bodyModal[bodyIdx].tableData[selectIndex][colIdx].value = bodyModal[bodyIdx].tableData[selectIndex][colIdx].value + text
    setBodyModal([...bodyModal])
  })
  .catch(err => {
    console.error('Failed to read clipboard contents: ', err);
  });
}

// 计算当前行事件
export const calculation_currentRow = (tBody: any, bodyModal: any, setBodyModal: any, selectIndex: any, selectRow: any, copyRow: any, setCopyRow: any, colIdx: any, computeRow: any ,bodyIdx:any) => {
  let rules = bodyModal[bodyIdx].tableData[selectIndex].filter((item: any) => item.calculation_rules)
  if(!rules.length){message.warn("当前行无计算规则！");return}
  rules = rules.map((item: any) => {
    let [key1, operator, key2] = item.calculation_rules.split(" ")
    let resultKey = item.key
    return { key1, operator, key2, resultKey }
  })

  rules.map((rule: any) => {
    let val1 = Number(bodyModal[bodyIdx].tableData[selectIndex].find((item: any) => item.key === rule.key1).value)
    let val2 = Number(bodyModal[bodyIdx].tableData[selectIndex].find((item: any) => item.key === rule.key2).value)
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
    let colIndex = bodyModal[bodyIdx].tableData[selectIndex].findIndex((item: any) => item.key === rule.resultKey)
    bodyModal[bodyIdx].tableData[selectIndex][colIndex].value = resul
  })
}
export const calculation_currentColumn = (tBody: any, bodyModal: any, setBodyModal: any, selectIndex: any, selectRow: any, copyRow: any, setCopyRow: any, colIdx: any, computeRow: any ,bodyIdx:any) => {
  if(!computeRow[bodyIdx]) {message.warn("当前列无计算规则！");return}
  if(!computeRow[bodyIdx].length) {message.warn("当前列无计算规则！");return}
  if(!computeRow[bodyIdx][colIdx].key.includes('calculation')){message.warn("当前列无计算规则！");return}
  let ColumnArr:any = []
  bodyModal[bodyIdx].tableData.map((row:any)=>{
    ColumnArr.push(row[colIdx].value)
  });
  let sum = ColumnArr.reduce((pro:any,cur:any)=>{
    return pro += Number(cur)
  },0)

  if (Object.is(sum, NaN)) { sum = '数值有误' }

  computeRow[bodyIdx].find((item:any)=>{
    return item.key.split("_")[1] === tBody[bodyIdx][colIdx].key
  }).value = sum
}
export default {
  copyRow,
  paste,
  pasteText,
  addRowBefore,
  addRowAfter,
  wipeData,
  delCurrentRow,
  calculation_currentRow,
  calculation_currentColumn,
}