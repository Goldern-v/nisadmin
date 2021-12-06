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

// 插入空行事件
export const addRowBefore = (tbody: any, bodyModal: any, setBodyModal: any, selectIndex: any) => {
  let nullRow: any = []
  tbody.map((config: any, index: any) => {
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
export const addRowAfter = (tbody: any, bodyModal: any, setBodyModal: any, selectIndex: any) => {
  let nullRow: any = []
  tbody.map((config: any, index: any) => {
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
export const copyRow = (tbody: any, bodyModal: any, setBodyModal: any, selectIndex: any, selectRow: any, copyRow: any, setCopyRow: any) => {
  setCopyRow(bodyModal[selectIndex])
}
// 粘贴事件
export const paste = (tbody: any, bodyModal: any, setBodyModal: any, selectIndex: any, selectRow: any, copyRow: any, setCopyRow: any) => {
  console.log(copyRow);

  if (JSON.stringify(copyRow) == "{}") {
    message.error('尚未复制内容！')
    return
  }
  bodyModal[selectIndex] = copyRow
  setBodyModal([...bodyModal])
}
export default {
  copyRow,
  paste,
  addRowBefore,
  addRowAfter,
}