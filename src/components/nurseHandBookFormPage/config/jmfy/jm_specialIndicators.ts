/**
 * 江门妇幼-专科质量指标
 */
import { datePicker } from "../../function/click";
import moment from "moment";
const tHead1 = {
  top: [
    { name: "1月质量指标", colspan: "5", rowspan: "1", style:{ width: 750 } },
  ],
  mid: [
    { name: "序号", colspan: "1", rowspan: "1", style:{ width: 50 } },
    { name: "指标项目", colspan: "1", rowspan: "1", style:{ width: 341 } },
    { name: "本月人数", colspan: "1", rowspan: "1", style:{ width: 121 } },
    { name: "同比", colspan: "1", rowspan: "1", style:{ width: 121 } },
    { name: "环比", colspan: "1", rowspan: "1", style:{ width: 120 } },
  ],
  bottom: []
}

const tHead2 = {
  top: [
    { name: "2月质量指标", colspan: "5", rowspan: "1", style:{ width: 750 } },
  ],
  mid: [
    { name: "序号", colspan: "1", rowspan: "1", style:{ width: 50 } },
    { name: "指标项目", colspan: "1", rowspan: "1", style:{ width: 341 } },
    { name: "本月人数", colspan: "1", rowspan: "1", style:{ width: 121 } },
    { name: "同比", colspan: "1", rowspan: "1", style:{ width: 121 } },
    { name: "环比", colspan: "1", rowspan: "1", style:{ width: 120 } },
  ],
  bottom: []
}

const tHead3 = {
  top: [
    { name: "3月质量指标", colspan: "5", rowspan: "1", style:{ width: 750 } },
  ],
  mid: [
    { name: "序号", colspan: "1", rowspan: "1", style:{ width: 50 } },
    { name: "指标项目", colspan: "1", rowspan: "1", style:{ width: 341 } },
    { name: "本月人数", colspan: "1", rowspan: "1", style:{ width: 121 } },
    { name: "同比", colspan: "1", rowspan: "1", style:{ width: 121 } },
    { name: "环比", colspan: "1", rowspan: "1", style:{ width: 120 } },
  ],
  bottom: []
}

const tHead4 = {
  top: [
    { name: "4月质量指标", colspan: "5", rowspan: "1", style:{ width: 750 } },
  ],
  mid: [
    { name: "序号", colspan: "1", rowspan: "1", style:{ width: 50 } },
    { name: "指标项目", colspan: "1", rowspan: "1", style:{ width: 341 } },
    { name: "本月人数", colspan: "1", rowspan: "1", style:{ width: 121 } },
    { name: "同比", colspan: "1", rowspan: "1", style:{ width: 121 } },
    { name: "环比", colspan: "1", rowspan: "1", style:{ width: 120 } },
  ],
  bottom: []
}

const tHead5 = {
  top: [
    { name: "5月质量指标", colspan: "5", rowspan: "1", style:{ width: 750 } },
  ],
  mid: [
    { name: "序号", colspan: "1", rowspan: "1", style:{ width: 50 } },
    { name: "指标项目", colspan: "1", rowspan: "1", style:{ width: 341 } },
    { name: "本月人数", colspan: "1", rowspan: "1", style:{ width: 121 } },
    { name: "同比", colspan: "1", rowspan: "1", style:{ width: 121 } },
    { name: "环比", colspan: "1", rowspan: "1", style:{ width: 120 } },
  ],
  bottom: []
}

const tHead6 = {
  top: [
    { name: "6月质量指标", colspan: "5", rowspan: "1", style:{ width: 750 } },
  ],
  mid: [
    { name: "序号", colspan: "1", rowspan: "1", style:{ width: 50 } },
    { name: "指标项目", colspan: "1", rowspan: "1", style:{ width: 341 } },
    { name: "本月人数", colspan: "1", rowspan: "1", style:{ width: 121 } },
    { name: "同比", colspan: "1", rowspan: "1", style:{ width: 121 } },
    { name: "环比", colspan: "1", rowspan: "1", style:{ width: 120 } },
  ],
  bottom: []
}

const tHead7 = {
  top: [
    { name: "7月质量指标", colspan: "5", rowspan: "1", style:{ width: 750 } },
  ],
  mid: [
    { name: "序号", colspan: "1", rowspan: "1", style:{ width: 50 } },
    { name: "指标项目", colspan: "1", rowspan: "1", style:{ width: 341 } },
    { name: "本月人数", colspan: "1", rowspan: "1", style:{ width: 121 } },
    { name: "同比", colspan: "1", rowspan: "1", style:{ width: 121 } },
    { name: "环比", colspan: "1", rowspan: "1", style:{ width: 120 } },
  ],
  bottom: []
}

const tHead8 = {
  top: [
    { name: "8月质量指标", colspan: "5", rowspan: "1", style:{ width: 750 } },
  ],
  mid: [
    { name: "序号", colspan: "1", rowspan: "1", style:{ width: 50 } },
    { name: "指标项目", colspan: "1", rowspan: "1", style:{ width: 341 } },
    { name: "本月人数", colspan: "1", rowspan: "1", style:{ width: 121 } },
    { name: "同比", colspan: "1", rowspan: "1", style:{ width: 121 } },
    { name: "环比", colspan: "1", rowspan: "1", style:{ width: 120 } },
  ],
  bottom: []
}

const tHead9 = {
  top: [
    { name: "9月质量指标", colspan: "5", rowspan: "1", style:{ width: 750 } },
  ],
  mid: [
    { name: "序号", colspan: "1", rowspan: "1", style:{ width: 50 } },
    { name: "指标项目", colspan: "1", rowspan: "1", style:{ width: 341 } },
    { name: "本月人数", colspan: "1", rowspan: "1", style:{ width: 121 } },
    { name: "同比", colspan: "1", rowspan: "1", style:{ width: 121 } },
    { name: "环比", colspan: "1", rowspan: "1", style:{ width: 120 } },
  ],
  bottom: []
}

const tHead10 = {
  top: [
    { name: "10月质量指标", colspan: "5", rowspan: "1", style:{ width: 750 } },
  ],
  mid: [
    { name: "序号", colspan: "1", rowspan: "1", style:{ width: 50 } },
    { name: "指标项目", colspan: "1", rowspan: "1", style:{ width: 341 } },
    { name: "本月人数", colspan: "1", rowspan: "1", style:{ width: 121 } },
    { name: "同比", colspan: "1", rowspan: "1", style:{ width: 121 } },
    { name: "环比", colspan: "1", rowspan: "1", style:{ width: 120 } },
  ],
  bottom: []
}

const tHead11 = {
  top: [
    { name: "11月质量指标", colspan: "5", rowspan: "1", style:{ width: 750 } },
  ],
  mid: [
    { name: "序号", colspan: "1", rowspan: "1", style:{ width: 50 } },
    { name: "指标项目", colspan: "1", rowspan: "1", style:{ width: 341 } },
    { name: "本月人数", colspan: "1", rowspan: "1", style:{ width: 121 } },
    { name: "同比", colspan: "1", rowspan: "1", style:{ width: 121 } },
    { name: "环比", colspan: "1", rowspan: "1", style:{ width: 120 } },
  ],
  bottom: []
}

const tHead12 = {
  top: [
    { name: "12月质量指标", colspan: "5", rowspan: "1", style:{ width: 750 } },
  ],
  mid: [
    { name: "序号", colspan: "1", rowspan: "1", style:{ width: 50 } },
    { name: "指标项目", colspan: "1", rowspan: "1", style:{ width: 341 } },
    { name: "本月人数", colspan: "1", rowspan: "1", style:{ width: 121 } },
    { name: "同比", colspan: "1", rowspan: "1", style:{ width: 121 } },
    { name: "环比", colspan: "1", rowspan: "1", style:{ width: 120 } },
  ],
  bottom: []
}

const tBody1: any = [
  { key: "serialNumber", name: "序号", value: "", width: 50 },
  { key: "indicatorsProject", name: "指标项目", value: "", defaultValue:['纯母乳喂养率','产后出血率','母婴分离率'], width: 340 },
  { key: "peopleNum", name: "本月人数", value: "", width: 120 },
  { key: "comparedSame", name: "同比", value: "", width: 120, noEditor:true, },
  { key: "sequential", name: "环比", value: "", width: 120, noEditor:true, },
]

export default {
  hiddenFixHeader:true,//隐藏浮动表头
  defaulLength: [3,3,3,3,3,3,3,3,3,3,3,3],
  tableTitle: { value: `${moment().format('YYYY')}年专科质量指标`, width: 746 },
  tBody:[tBody1,tBody1,tBody1,tBody1,tBody1,tBody1,tBody1,tBody1,tBody1,tBody1,tBody1,tBody1],
  tHead:[tHead1,tHead2,tHead3,tHead4,tHead5,tHead6,tHead7,tHead8,tHead9,tHead10,tHead11,tHead12],
}