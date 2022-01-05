/**
 * 聊城二院-护理部月工作计划
 */
const tHead = {
  top: [
    { name: "序号", colspan: "1", rowspan: "1", style:{ width: 50 } },
    { name: "工作计划", colspan: "1", rowspan: "1", style:{ width: 400 } },
    { name: "完成<br/>时限", colspan: "1", rowspan: "1", style:{ width: 50 } },
    { name: "责任人", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "备注", colspan: "1", rowspan: "1", style:{ width: 100 } },
   
  ],
  mid: [],
  bottom: []
}

const tBody: any = [
  { key: "serialNumber", name: "序号", value: "", width: 50 },
  { key: "what", name: "what", value: "", width: 400 },
  { key: "why", name: "why", value: "", width: 50 },
  { key: "where", name: "where", value: "", width: 100 },
  { key: "who", name: "who", value: "", width: 100 },
]

export default {
  defaulLength: [20],
  tableTitle: { value: "xxxx年XX月护理部月工作计划", width: 696 },
  tBody: [tBody],
  tHead: [tHead],
}