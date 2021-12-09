import { tick } from "../function/click"
const tHead = {
  top: [
    { name: "序号", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "星期一", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "星期二", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "星期三", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "星期四", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "星期五", colspan: "1", rowspan: "1", style:{ width: 100 } },
  ],
  mid: [],
  bottom: []
}
const tBody: any = [
  { key: 'serialNumber', name:'序号', value: "", width: 100 },
  { key: 'one', name:'星期一', value: "", width: 100 },
  { key: 'two', name:'星期二', value: "", width: 100 },
  { key: 'three', name:'星期三', value: "", width: 100 },
  { key: 'four', name:'星期四', value: "", width: 100 },
  { key: 'five', name:'星期五', value: "", width: 100 }, 
]

const computeRow: any = [
  { key: '合计', name:'合计', value: "合计", width: 100 },
  { key: 'one', name:'星期一', value: "", width: 100 },
  { key: 'two', name:'星期二', value: "", width: 100 },
  { key: 'three', name:'星期三', value: "", width: 100 },
  { key: 'four', name:'星期四', value: "", width: 100 },
  { key: 'five', name:'星期五', value: "", width: 100 },
]

export default {
  defaulLength: 17,
  tableTitle: { value:"计算行类型表单", width:600 },
  tBody,
  tHead,
  computeRow,
}