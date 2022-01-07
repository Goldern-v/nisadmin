/**
 * 聊城二院-继续教育培训情况
 */
import moment from "moment";

const tHead = {
  top: [
    { name: "日期", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "培训主题", colspan: "1", rowspan: "1", style:{ width: 200 } },
    { name: "培训内容", colspan: "1", rowspan: "1", style:{ width: 200 } },
    { name: "培训单位/ 组织", colspan: "1", rowspan: "1", style:{ width: 150 } },
    { name: "培训对象", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "备注", colspan: "1", rowspan: "1", style:{ width: 150 } },
   
  ],
  mid: [],
  bottom: []
}

const tBody: any = [
  { key: "time", name: "日期", value: "", width: 100, timePicker:true },
  { key: "classTime", name: "培训主题", value: "", width: 200 },
  { key: "assess", name: "培训内容", value: "", width: 200 },
  { key: "content", name: "培训单位/ 组织", value: "", width: 150 },
  { key: "object", name: "培训对象", value: "", width: 100 },
  { key: "remark", name: "备注", value: "", width: 150 },
]

export default {
  defaulLength: [20],
  tableTitle: { value: `继续教育护士培训情况`, width: 895 },
  tBody: [tBody],
  tHead: [tHead],
}