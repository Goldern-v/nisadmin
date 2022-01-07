/**
 * 聊城二院-护理病例讨论
 */
import moment from "moment";
import { authStore } from 'src/stores'
let user: any = authStore.user || {};


const complexHead: any = {
  boxWidth: 700,
  complexHeadList:[
    { key: 'time', name:'日期/时间', value: "", leftWidth: 100, rightWidth: 100 },
    { key: 'place', name:'地点', value: "", leftWidth: 100, rightWidth: 100 },
    { key: 'host', name:'主持人', value: "", leftWidth: 100, rightWidth: 200 , lastChild: true },
    { key: 'join', name:'参加人员', value: "", leftWidth: 100, rightWidth: 600 , preIndex: 3 },
    { key: 'patientName', name:'患者姓名', value: "", leftWidth: 100, rightWidth: 100 },
    { key: 'recordId', name:'病案号号', value: "", leftWidth: 100, rightWidth: 100 },
    { key: 'diagnosis', name:'诊断', value: "", leftWidth: 100, rightWidth: 200, lastChild: true },
    { key: 'type', name:'讨论类型', value: "", leftWidth: 100, rightWidth: 600, preIndex: 3 },
  ]
}

const tHead = {
  top: [],
  mid: [],
  bottom: []
}

const tBody1: any = [
  { key: "content1", name: "内容", value: "主持人：", width: 700, style:{ minHeight: "200px", textAlign: "left", verticalAlign: "top" } },
]
const tBody2: any = [
  { key: "content2", name: "内容", value: "责任护士：", width: 700, style:{ minHeight: "200px", textAlign: "left", verticalAlign: "top" } },
]
const tBody3: any = [
  { key: "content3", name: "内容", value: "参加人员：", width: 700, style:{ minHeight: "100px", textAlign: "left", verticalAlign: "top" } },
]
const tBody4: any = [
  { key: "content4", name: "内容", value: "主持人：", width: 700, style:{ minHeight: "100px", textAlign: "left", verticalAlign: "top" } },
]

export default {
  hiddenFixHeader: true,
  defaulLength: [1,1,1,1],
  tableTitle: { value: `护理病例讨论`, width: 700 },
  complexHead,
  tBody: [tBody1,tBody2,tBody3,tBody4],
  tHead: [tHead],
}