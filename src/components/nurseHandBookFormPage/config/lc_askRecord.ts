/**
 * 聊城二院-护理晨会提问记录
 */
import moment from "moment";
import { authStore } from 'src/stores'
import { tick, timePicker } from "../function/click" 

let user: any = authStore.user || {};

const tHead = {
  top: [
    { name: "日期", colspan: "1", rowspan: "1", style:{ width: 150 },  },
    { name: "被提问者", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "提问内容", colspan: "1", rowspan: "1", style:{ width: 300 } },
    { name: "评价", colspan: "3", rowspan: "1", style:{ width: 150 } },
    { name: "提问者", colspan: "1", rowspan: "1", style:{ width: 100 } },
  ],
  mid: [
    { name: "优", colspan: "1", rowspan: "1", style:{ width: 50 } },
    { name: "良", colspan: "1", rowspan: "1", style:{ width: 51 } },
    { name: "一般", colspan: "1", rowspan: "1", style:{ width: 50 } },
  ],
  bottom: []
}

const tBody: any = [
  { key: "time", name: "日期", value: "", width: 150, click: timePicker },
  { key: "people", name: "被提问者", value: "", width: 100 },
  { key: "content", name: "提问内容", value: "", width: 300 },
  { key: "optimal", name: "优", value: "", width: 50, click: tick },
  { key: "fine", name: "良", value: "", width: 50, click: tick },
  { key: "general", name: "一般", value: "", width: 50, click: tick },
  { key: "question", name: "提问者", value: "", width: 100 },
]

export default {
  hiddenFixHeader:true,//隐藏浮动表头
  defaulLength: [20],
  tableTitle: { value: `${moment().format('YYYY')}年${moment().format('MM')}月${user.deptName}护理晨会提问记录`, width: 794 },
  tBody: [tBody],
  tHead: [tHead],
  borderMessage: "优：能准确完整的回答问题。良：能回答出80%以上的内容。一般：回答内容小于80%或回答不出"
}