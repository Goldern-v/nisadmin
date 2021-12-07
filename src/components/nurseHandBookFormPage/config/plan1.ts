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
    key: 'key1',
    value: "",
    width: 100
  },
  {
    key: 'key2',
    value: "",
    width: 100
  },
  {
    key: 'key3',
    value: "",
    width: 100
  },
  // {
  //   key: 'key3',
  //   value: "",
  //   width: 35
  // },
  // {
  //   key: 'key4',
  //   value: "",
  //   width: 35
  // }
]

export default {
  defaulLength: 17,
  tableTitle: "新生儿监护单",
  tBody,
  tHead,
}