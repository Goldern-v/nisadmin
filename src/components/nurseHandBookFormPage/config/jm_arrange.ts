import { tick } from "../function/click"
const tHead = {
  top: [
    { name: "序号", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "what", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "why", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "where", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "who", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "when", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "how", colspan: "1", rowspan: "1", style:{ width: 100 } },
  ],
  mid: [],
  bottom: []
}
const tBody: any = [
  {
    key: "serialNumber",
    name: "序号",
    value: "",
    width: 100,
  },
  {
    key: "what",
    name: "what",
    value: "",
    width: 100,
  },
  {
    key: "why",
    name: "why",
    value: "",
    width: 100,
  },
  {
    key: "where",
    name: "where",
    value: "",
    width: 100,
  },
  {
    key: "who",
    name: "who",
    value: "",
    width: 100,
  },
  {
    key: "when",
    name: "when",
    value: "",
    width: 100,
  },
  {
    key: "how",
    name: "how",
    value: "",
    width: 100,
  },
]

const computeRow: any = [
  { key: '合计', name:'合计', value: "合计", width: 100 },
  { key: 'calculation_what', name:'星期一', value: "", width: 100 },
  { key: 'calculation_why', name:'星期二', value: "", width: 100 },
  { key: 'calculation_where', name:'星期三', value: "", width: 100 },
  { key: 'calculation_who', name:'星期四', value: "", width: 100 },
  { key: 'calculation_when', name:'星期五', value: "", width: 100 },
  { key: 'calculation_how', name:'星期五', value: "", width: 100 },
]

// const complexHead: any = {
//   boxWidth: 700,
//   complexHeadList:[
//     { key: 'time', name:'时间', value: "", leftWidth: 100, rightWidth: 100 },
//     { key: 'place', name:'地点', value: "", leftWidth: 100, rightWidth: 100 },
//     { key: 'one', name:'主持人', value: "", leftWidth: 100, rightWidth: 200 ,lastChild:true },
//     { key: 'two', name:'被邀请人员', value: "", leftWidth: 100, rightWidth: 600 , preIndex:3 },
//     { key: 'name', name:'患者姓名', value: "", leftWidth: 100, rightWidth: 100 },
//     { key: 'ID', name:'住院号', value: "", leftWidth: 100, rightWidth: 100 },
//     { key: 'zhenduan', name:'诊断', value: "", leftWidth: 100, rightWidth: 200  ,lastChild:true },
//     { key: 'fanwei', name:'讨论范围', value: "", leftWidth: 100, rightWidth: 600  , preIndex:3 },
//   ]
// }

export default {
  defaulLength: 17,
  tableTitle: { value: "月工作重点及周安排", width: 700 },
  tBody,
  tHead,
  remark: { value: "备注：", width: 700 },
  computeRow,
  sign: true,
  // complexHead,
}