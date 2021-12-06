import { message } from 'antd'
import { copyNullRow } from "./render"
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

export const copyRow = (tbody: any, bodyModal: any, setBodyModal: any, selectIndex: any, selectRow: any, copyRow: any, setCopyRow: any) => {
  setCopyRow(bodyModal[selectIndex])
}

export const copyContent = () => {
  console.log("copyContent");

}

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
  copyContent,
  paste,
  addRowBefore,
  addRowAfter,
}