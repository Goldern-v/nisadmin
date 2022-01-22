/**
 * 江门妇幼-月度指标的持续改进措施及下月工作设想
 */
import { datePicker } from "../../function/click";
import moment from "moment";
const tHead1 = {
  top: [
    { name: "1月份", colspan: "1", rowspan: "1", style:{ width: 750 } },
  ],
  mid: [],
  bottom: []
}

const tHead2 = {
  top: [
    { name: "2月份", colspan: "1", rowspan: "1", style:{ width: 750 } },
  ],
  mid: [],
  bottom: []
}

const tHead3 = {
  top: [
    { name: "3月份", colspan: "1", rowspan: "1", style:{ width: 750 } },
  ],
  mid: [],
  bottom: []
}

const tHead4 = {
  top: [
    { name: "4月份", colspan: "1", rowspan: "1", style:{ width: 750 } },
  ],
  mid: [],
  bottom: []
}

const tHead5 = {
  top: [
    { name: "5月份", colspan: "1", rowspan: "1", style:{ width: 750 } },
  ],
  mid: [],
  bottom: []
}

const tHead6 = {
  top: [
    { name: "6月份", colspan: "1", rowspan: "1", style:{ width: 750 } },
  ],
  mid: [],
  bottom: []
}

const tHead7 = {
  top: [
    { name: "7月份", colspan: "1", rowspan: "1", style:{ width: 750 } },
  ],
  mid: [],
  bottom: []
}

const tHead8 = {
  top: [
    { name: "8月份", colspan: "1", rowspan: "1", style:{ width: 750 } },
  ],
  mid: [],
  bottom: []
}

const tHead9 = {
  top: [
    { name: "9月份", colspan: "1", rowspan: "1", style:{ width: 750 } },
  ],
  mid: [],
  bottom: []
}

const tHead10 = {
  top: [
    { name: "10月份", colspan: "1", rowspan: "1", style:{ width: 750 } },
  ],
  mid: [],
  bottom: []
}

const tHead11 = {
  top: [
    { name: "11月份", colspan: "1", rowspan: "1", style:{ width: 750 } },
  ],
  mid: [],
  bottom: []
}

const tHead12 = {
  top: [
    { name: "12月份", colspan: "1", rowspan: "1", style:{ width: 750 } },
  ],
  mid: [],
  bottom: []
}

const tBody1: any = [
  { key: "content", name: "措施与设想", value: "", width: 750, style:{ minHeight: "100px", textAlign: "left", verticalAlign: "top" } },
]

export default {
  hiddenFixHeader:true,//隐藏浮动表头
  defaulLength: [1,1,1,1,1,1,1,1,1,1,1,1],
  tableTitle: { value: `${moment().format('YYYY')}年月度指标的持续改进措施及下月工作设想`, width: 750 },
  tBody:[tBody1,tBody1,tBody1,tBody1,tBody1,tBody1,tBody1,tBody1,tBody1,tBody1,tBody1,tBody1],
  tHead:[tHead1,tHead2,tHead3,tHead4,tHead5,tHead6,tHead7,tHead8,tHead9,tHead10,tHead11,tHead12],
}