import { tick } from "../function/click"
const tHead = {
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
const tBody: any = [
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

export default {
  defaulLength: 17,
  tableTitle: "月工作重点及周安排",
  tBody,
  tHead,
}