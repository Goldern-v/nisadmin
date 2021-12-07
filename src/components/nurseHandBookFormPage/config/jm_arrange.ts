import { tick } from "../function/click"
const tHead = {
  top: [
    { name: "序号", colspan: "2", rowspan: "1", style: {} },
    // { name: "what", colspan: "1", rowspan: "1", style:{ width: 100} },
    // { name: "why", colspan: "1", rowspan: "1", style:{ width: 100} },
    // { name: "where", colspan: "1", rowspan: "1", style:{ width: 100} },
    // { name: "who", colspan: "1", rowspan: "1", style:{ width: 100} },
    // { name: "when", colspan: "1", rowspan: "1", style:{ width: 100} },
    // { name: "how", colspan: "1", rowspan: "1", style:{ width: 100} },
  ],
  mid: [
    { name: "what", colspan: "2", rowspan: "1", style: {} },
    { name: "why", colspan: "2", rowspan: "1", style: { width: 100 } },
  ],
  bottom: [
    { name: "who", colspan: "1", rowspan: "1", style: { width: 100 } },
    { name: "when", colspan: "1", rowspan: "1", style: { width: 100 } },
    { name: "", colspan: "1", rowspan: "1", style: { width: 99 } },
  ]
}
const tBody: any = [
  {
    key: "index",
    name: "序号",
    value: "",
    width: "100px",
  },
  {
    key: "what",
    name: "what",
    value: "",
    width: "100px",
  },
  {
    key: "why",
    name: "why",
    value: "",
    width: 100
  },
  {
    key: 'key3',
    value: "",
    width: 100
  },
  {
    key: "where",
    name: "where",
    value: "",
    width: "100px",
  },
  {
    key: "who",
    name: "who",
    value: "",
    width: "100px",
  },
  {
    key: "when",
    name: "when",
    value: "",
    width: "100px",
  },
  {
    key: "how",
    name: "how",
    value: "",
    width: "100px",
  },
]

export default {
  defaulLength: 17,
  tableTitle: "月工作重点及周安排",
  tBody,
  tHead,
}