import { tick } from "../function/click"
const tHead1 = {
  top: [
    { name: "序号", colspan: "1", rowspan: "1", style: { width: 100 } },
    { name: "工资", colspan: "1", rowspan: "1", style: { width: 100 } },
    { name: "姓名", colspan: "1", rowspan: "1", style: { width: 100 } },
    { name: "年龄", colspan: "1", rowspan: "1", style: { width: 100 } },
    { name: "总收入", colspan: "1", rowspan: "1", style: { width: 100 } },
    { name: "年薪", colspan: "1", rowspan: "1", style: { width: 100 } },
    { name: "加", colspan: "1", rowspan: "1", style: { width: 100 } },
    { name: "减", colspan: "1", rowspan: "1", style: { width: 100 } },
    { name: "how", colspan: "1", rowspan: "1", style: { width: 100 } },
  ],
  mid: [],
  bottom: []
}
const tHead2 = {
  top: [
    // { name: "序号", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "www", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "why", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "where", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "who", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "when", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "how", colspan: "1", rowspan: "1", style:{ width: 100 } },
  ],
  mid: [],
  bottom: []
}
const tHead3 = {
  top: [
    // { name: "序号", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "hhh", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "why", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "where", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "who", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "when", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "how", colspan: "1", rowspan: "1", style:{ width: 100 } },
  ],
  mid: [],
  bottom: []
}
const tBody1: any = [
  {
    key: "serialNumber",
    name: "序号",
    value: "",
    width: 100,
  },
  {
    key: "money",
    name: "工资",
    value: "",
    width: 100,
  },
  {
    key: "name",
    name: "姓名",
    value: "",
    width: 100,
  },
  {
    key: "age",
    name: "年龄",
    value: "",
    width: 100,
  },
  {
    key: "calculation_1",
    name: "总收入",
    calculation_rules: "age * money",
    value: "",
    width: 100,
  },
  {
    key: "calculation_2",
    name: "年薪",
    calculation_rules: "calculation_1 / age",
    width: 100,
    value: ""
  },
  {
    key: "calculation_3",
    name: "加",
    calculation_rules: "age + money",
    width: 100,
    value: ""
  },
  {
    key: "calculation_4",
    name: "减",
    calculation_rules: "money - age",
    width: 100,
    value: ""
  },
  {
    key: "how",
    name: "how",
    value: "",
    width: 100,
  },
]
const tBody2: any = [
  { key: "what", name: "what", value: "", width: 100,},
  { key: "why",name: "why", value: "", width: 100,},
  { key: "where", name: "where", value: "", width: 100,},
  { key: "who",name: "who", value: "",width: 100,},
  { key: "when", name: "when", value: "",width: 100,},
  { key: "how",name: "how",value: "",width: 100,},
]
const tBody3: any = [
  { key: "what", name: "what", value: "", width: 100,},
  { key: "why",name: "why", value: "", width: 100,},
  { key: "where", name: "where", value: "", width: 100,},
  { key: "who",name: "who", value: "",width: 100,},
  { key: "when", name: "when", value: "",width: 100,},
  { key: "how",name: "how",value: "",width: 100,},
]

const complexHead: any = {
  boxWidth: 700,
  complexHeadList:[
    { key: 'time', name:'时间', value: "", leftWidth: 100, rightWidth: 100 },
    { key: 'place', name:'地点', value: "", leftWidth: 100, rightWidth: 100 },
    { key: 'one', name:'主持人', value: "", leftWidth: 100, rightWidth: 200 , lastChild:true },
    { key: 'two', name:'被邀请人员', value: "", leftWidth: 100, rightWidth: 600 , preIndex:3 },
    { key: 'name', name:'患者姓名', value: "", leftWidth: 100, rightWidth: 100 },
    { key: 'ID', name:'住院号', value: "", leftWidth: 100, rightWidth: 100 },
    { key: 'zhenduan', name:'诊断', value: "", leftWidth: 100, rightWidth: 200, lastChild:true },
    { key: 'fanwei', name:'讨论范围', value: "", leftWidth: 100, rightWidth: 600, preIndex:3 },
  ]
}
const computeRow1: any = [
  { key: '合计', name:'合计', value: "合计", width: 100,},
  { key: 'calculation_one', name:'星期一', value: "", width: 100 },
  { key: 'calculation_two', name:'星期二', value: "", width: 100 },
  { key: 'calculation_three', name:'星期三', value: "", width: 100 },
  { key: 'calculation_four', name:'星期四', value: "", width: 100 },
  { key: 'calculation_five', name:'星期五', value: "", width: 100 },
  { key: 'calculation_six', name:'星期四', value: "", width: 100 },
  { key: 'calculation_seven', name:'星期五', value: "", width: 100 },
  { key: 'calculation_ten', name:'星期五', value: "", width: 100 },
]

const computeRow2: any = [
  { key: "calculation_what", name: "what", value: "", width: 100,},
  { key: "calculation_why",name: "why", value: "", width: 100,},
  { key: "calculation_where", name: "where", value: "", width: 100,},
  { key: "calculation_who",name: "who", value: "",width: 100,},
  { key: "calculation_when", name: "when", value: "",width: 100,},
  { key: "calculation_how",name: "how",value: "",width: 100,},
]


const sign = {
  signName:{key:'signName',value:''},
  signTime:{key:'signTime',value:''}
}
// export default {
//   defaulLength: 17,
//   tableTitle: { value: "月工作重点及周安排", width: 700 },
//   tBody:[

//   ],
//   tHead,
//   // remark: { value: "备注：", width: 700 },
//   // computeRow,
//   // sign: sign,
//   // complexHead,
//   defaultValue:{
//     10:['第一周'],
//     20:['第二周'],
//   },

//   // tableList: [
//   //   { defaulLength: 17,tBody,tHead,}
//   //   { defaulLength: 17,tBody,tHead,}
//   //   { defaulLength: 17,tBody,tHead,}
//   // ]
// }
export default {
  hiddenFixHeader:true,
  defaulLength: [9,9,9],
  tableTitle: { value: "月工作重点及周安排", width: 600 },
  primaryKey:18,
  tBody:[tBody1,tBody2,tBody3],
  tHead:[tHead1,tHead2,tHead3],
  computeRow:[[],computeRow2,[]],
}