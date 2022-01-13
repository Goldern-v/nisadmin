/**
 * 聊城二院-护理病例讨论记录
 */
import moment from "moment";
import { authStore } from 'src/stores'
import { timePicker } from "../function/click";
let user: any = authStore.user || {};


const complexHead: any = {
  boxWidth: 800,
  complexHeadList:[
    { key: 'time', name:'日期/时间', value: "", leftWidth: 100, rightWidth: 150, click: timePicker },
    { key: 'place', name:'地点', value: "", leftWidth: 100, rightWidth: 150 },
    { key: 'host', name:'主持人', value: "", leftWidth: 100, rightWidth: 200 , lastChild: true },
    { key: 'join', name:'参加人员', value: "", leftWidth: 100, rightWidth: 700 , preIndex: 3, rightStyle:{ textAlign: "left" } },
    { key: 'patientName', name:'患者姓名', value: "", leftWidth: 100, rightWidth: 150 },
    { key: 'recordId', name:'病案号', value: "", leftWidth: 100, rightWidth: 150 },
    { key: 'diagnosis', name:'诊断', value: "", leftWidth: 100, rightWidth: 200, lastChild: true },
    { key: 'type', name:'讨论类型', value: "", leftWidth: 100, rightWidth: 700, preIndex: 3, multiple:"、", select:['危重病例','疑难病例','重大手术病例','新开展手术或技术病例','死亡病例','特殊病例','其他'], rightStyle:{ textAlign: "left" }},
  ]
}

const tHead = {
  top: [],
  mid: [],
  bottom: []
}

const tBody1: any = [
  { key: "content1", name: "内容", value: "主持人：", width: 800, style:{ minHeight: "200px", textAlign: "left", verticalAlign: "top" } },
]
const tBody2: any = [
  { key: "content2", name: "内容", value: "责任护士：", width: 800, style:{ minHeight: "200px", textAlign: "left", verticalAlign: "top" } },
]
const tBody3: any = [
  { key: "content3", name: "内容", value: "参加人员：", width: 800, style:{ minHeight: "100px", textAlign: "left", verticalAlign: "top" } },
]
const tBody4: any = [
  { key: "content4", name: "内容", value: "主持人：", width: 800, style:{ minHeight: "100px", textAlign: "left", verticalAlign: "top" } },
]

export default {
  hiddenFixHeader: true,
  defaulLength: [1,1,1,1],
  tableTitle: { value: `护理病例讨论`, width: 800 },
  complexHead,
  tBody: [tBody1,tBody2,tBody3,tBody4],
  tHead: [tHead],
}