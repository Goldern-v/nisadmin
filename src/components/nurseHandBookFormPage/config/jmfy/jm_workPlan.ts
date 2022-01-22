/**
 * 江门妇幼-年度工作计划表
 */
const tHead = {
  top: [
    { name: "序号", colspan: "1", rowspan: "1", style:{ width: 50 } },
    { name: "what", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "why", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "where", colspan: "1", rowspan: "1", style:{ width: 75 } },
    { name: "who", colspan: "1", rowspan: "1", style:{ width: 75 } },
    { name: "when", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "how", colspan: "1", rowspan: "1", style:{ width: 250 } },
  ],
  mid: [],
  bottom: []
}

const tBody: any = [
  { key: "serialNumber", name: "序号", value: "", width: 50 },
  { key: "what", name: "what", value: "", width: 100 },
  { key: "why", name: "why", value: "", width: 100 },
  { key: "where", name: "where", value: "", width: 75 },
  { key: "who", name: "who", value: "", width: 75 },
  { key: "when", name: "when", value: "", width: 100 },
  { key: "how", name: "how", value: "", width: 250 },
]

export default {
  defaulLength: [17],
  tableTitle: { value: "年度工作计划表", width: 744 },
  tBody: [tBody],
  tHead: [tHead],
}