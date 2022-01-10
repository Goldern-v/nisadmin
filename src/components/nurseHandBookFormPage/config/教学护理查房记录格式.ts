/**
 * 聊城二院-教学护理查房记录格式
 */
import moment from "moment";
import { authStore } from 'src/stores'
let user: any = authStore.user || {};


const complexHead: any = {
  boxWidth: 700,
  complexHeadList:[
    { key: 'time', name:'时间', value: "", leftWidth: 100, rightWidth: 600, preIndex: 3, rightStyle:{ textAlign: "left" } },
    { key: 'place', name:'地点', value: "", leftWidth: 100, rightWidth: 600, preIndex: 3, rightStyle:{ textAlign: "left" } },
    { key: 'host', name:'主持人', value: "", leftWidth: 100, rightWidth: 600 , preIndex: 3, rightStyle:{ textAlign: "left" } },
    { key: 'host', name:'查房者', value: "", leftWidth: 100, rightWidth: 600 , preIndex: 3, rightStyle:{ textAlign: "left" } },
    { key: 'join', name:'参加人员', value: "", leftWidth: 100, rightWidth: 600 , preIndex: 3, rightStyle:{ textAlign: "left" } },
    { key: 'patientName', name:'病人姓名', value: "", leftWidth: 100, rightWidth: 100 },
    { key: 'recordId', name:'病案号', value: "", leftWidth: 100, rightWidth: 100 },
    { key: 'diagnosis', name:'主要诊断', value: "", leftWidth: 100, rightWidth: 200, lastChild: true },
  ]
}

const tHead = {
  top: [],
  mid: [],
  bottom: []
}

const tBody1: any = [
  { key: "content1", name: "内容", value: "主持人：", width: 700, style:{ minHeight: "150px", textAlign: "left", verticalAlign: "top" } },
]
const tBody2: any = [
  { key: "content2", name: "内容", value: "低年资责任护士：", width: 700, style:{ minHeight: "150px", textAlign: "left", verticalAlign: "top" } },
]
const tBody3: any = [
  { key: "content3", name: "内容", value: "低年资护士：", width: 700, style:{ minHeight: "150px", textAlign: "left", verticalAlign: "top" } },
]

const tBody4: any = [
  { key: "content4", name: "内容", value: "主持人：", width: 700, style:{ minHeight: "150px", textAlign: "left", verticalAlign: "top" } },
]

export default {
  hiddenFixHeader: true,
  defaulLength: [1,1,1,1],
  tableTitle: { value: `教学护理查房记录格式`, width: 700 },
  complexHead,
  tBody: [tBody1,tBody2,tBody3,tBody4],
  tHead: [tHead],
}