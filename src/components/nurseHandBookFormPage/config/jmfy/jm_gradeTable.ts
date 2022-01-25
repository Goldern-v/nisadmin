/**
 * 江门妇幼-护理人员季度考核成绩表
 */
import moment from "moment";
import { authStore } from 'src/stores'
import { datePicker } from "../../function/click";
let user: any = authStore.user || {};

const tHead = {
  top: [
    { name: "日期", colspan: "1", rowspan: "1", style:{ width: 150 } },
    { name: "姓名", colspan: "1", rowspan: "1", style:{ width: 150 } },
    { name: "考核内容", colspan: "1", rowspan: "1", style:{ width: 400 } },
    { name: "成绩", colspan: "1", rowspan: "1", style:{ width: 150 } },
  ],
  mid: [],
  bottom: []
}

const tBody: any = [
  { key: "time", name: "日期", value: "", width: 150, click:datePicker },
  { key: "name", name: "姓名", value: "", width: 150 },
  { key: "content", name: "考核内容", value: "", width: 400 },
  { key: "results", name: "成绩", value: "", width: 150 },
]

export default {
  hiddenFixHeader:true,//隐藏浮动表头
  defaulLength: [20],
  tableTitle: { value: `${moment().format('YYYY')}年第${moment().format('Q')}季度护士考核成绩记录表`, width: 847 },
  tBody: [tBody],
  tHead: [tHead],
}