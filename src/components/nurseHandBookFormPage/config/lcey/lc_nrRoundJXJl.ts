/**
 * 聊城二院-教学护理查房记录
 */
import moment from "moment";
import { authStore } from 'src/stores'
import { timePicker } from "../../function/click";
let user: any = authStore.user || {};


const complexHead: any = {
  boxWidth: 800,
  complexHeadList:[
    { key: 'time', name:'日期/时间', value: "", leftWidth: 100, rightWidth: 300, click: timePicker },
    { key: 'place', name:'地点', value: "", leftWidth: 100, rightWidth: 300, lastChild: true },
    { key: 'host', name:'主持人', value: "", leftWidth: 100, rightWidth: 300 },
    { key: 'check', name:'查房者', value: "", leftWidth: 100, rightWidth: 300, lastChild: true },
    { key: 'join', name:'参加人员', value: "", leftWidth: 100, rightWidth: 700 , preIndex: 2, rightStyle:{ textAlign: "left" } },
    { key: 'patientName', name:'患者姓名', value: "", leftWidth: 100, rightWidth: 150 },
    { key: 'recordId', name:'病案号', value: "", leftWidth: 100, rightWidth: 150 },
    { key: 'diagnosis', name:'主要诊断', value: "", leftWidth: 100, rightWidth: 200, lastChild: true },
  ]
}

const tHead = {
  top: [],
  mid: [],
  bottom: []
}

const tBody1: any = [
  { key: "content1", name: "内容", value: "主持人：", width: 800, style:{ minHeight: "150px", textAlign: "left", verticalAlign: "top" } },
]
const tBody2: any = [
  { key: "content2", name: "内容", value: "责任护士：", width: 800, style:{ minHeight: "150px", textAlign: "left", verticalAlign: "top" } },
]
const tBody3: any = [
  { key: "content3", name: "内容", value: "查房者：", width: 800, style:{ minHeight: "150px", textAlign: "left", verticalAlign: "top" } },
]

const tBody4: any = [
  { key: "content4", name: "内容", value: "低年资护士：", width: 800, style:{ minHeight: "150px", textAlign: "left", verticalAlign: "top" } },
]

const tBody5: any = [
  { key: "content5", name: "内容", value: "主持人：", width: 800, style:{ minHeight: "150px", textAlign: "left", verticalAlign: "top" } },
]

const sign = {
  signTime:{ key: 'signTime', value:'', preName:"记录时间", hidden: true },
  signName:{ key: 'signName', value:'', preName:"记录人" },
}

export default {
  hiddenFixHeader: true,
  defaulLength: [1,1,1,1,1],
  tableTitle: { value: `教学护理查房记录`, width: 800 },
  complexHead,
  tBody: [tBody1,tBody2,tBody3,tBody4,tBody5],
  tHead: [tHead],
  sign: sign,//签名组件
  borderMessage: "备注:低年资责任护士进行病例汇报，高年资责任护士进行补充。"
}