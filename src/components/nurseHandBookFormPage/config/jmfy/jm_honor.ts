/**
 * 江门妇幼-科室荣誉登记表
 */
import moment from "moment";

const tHead = {
  top: [
  { name: "序号", colspan: "1", rowspan: "1", style:{ width: 50 } },
  { name: "获奖者", colspan: "1", rowspan: "1", style:{ width: 150 } },
  { name: "获奖项目名称", colspan: "1", rowspan: "1", style:{ width: 300 } },
  { name: "获奖等次", colspan: "1", rowspan: "1", style:{ width: 100 } },
  { name: "", colspan: "1", rowspan: "1", style:{ width: 100 }, canset:true, key:'custom1' },
  { name: "", colspan: "1", rowspan: "1", style:{ width: 100 }, canset:true, key:'custom2' }
  ],
  mid: [],
  bottom: []
}

const tBody: any = [
  { key: "serialNumber", name: "序号", value: "", width: 50 },
  { key: "winners", name: "获奖者", value: "", width: 150 },
  { key: "projectName", name: "获奖项目名称", value: "", width: 300 },
  { key: "grade", name: "获奖等次", value: "", width: 100 },
  { key: "custom1", name: "", value: "", width: 100 },
  { key: "custom2", name: "", value: "", width: 100 },
]

export default {
  hiddenFixHeader:true,//隐藏浮动表头
  defaulLength: [20],
  tableTitle: { value: `${moment().format('YYYY')}年科室荣誉登记表`, width: 795 },
  tBody: [tBody],
  tHead: [tHead],
}