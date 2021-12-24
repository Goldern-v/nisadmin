import { tick } from "../function/click" //自定义点击事件

//复杂表头部分--------------------------------------------------------------------------------------------------------------------------------------
/**
 * leftWidth 左侧格子宽度 rightWidth 右侧格子宽度 
 * astChild: true 行内最后一个元素配置
 * preIndex :当前行独占一行时,此字段为上一行的配置项个数
 */
const complexHead: any = {
  boxWidth: 700,
  complexHeadList:[
    { key: 'time', name:'时间', value: "", leftWidth: 100, rightWidth: 100 },
    { key: 'place', name:'地点', value: "", leftWidth: 100, rightWidth: 100 },
    { key: 'one', name:'主持人', value: "", leftWidth: 100, rightWidth: 200 , lastChild: true },
    { key: 'two', name:'被邀请人员', value: "", leftWidth: 100, rightWidth: 600 , preIndex: 3 },
    { key: 'name', name:'患者姓名', value: "", leftWidth: 100, rightWidth: 100 },
    { key: 'ID', name:'住院号', value: "", leftWidth: 100, rightWidth: 100 },
    { key: 'zhenduan', name:'诊断', value: "", leftWidth: 100, rightWidth: 200, lastChild: true },
    { key: 'fanwei', name:'讨论范围', value: "", leftWidth: 100, rightWidth: 600, preIndex: 3 },
  ]
}
//复杂表头部分--------------------------------------------------------------------------------------------------------------------------------------

//表头部分--------------------------------------------------------------------------------------------------------------------------------------
const tHead1 = {
  top: [
    { name: "www", colspan: "1", rowspan: "1", style: { width: 100 } },
    { name: "why", colspan: "1", rowspan: "1", style: { width: 100 } },
    { name: "where", colspan: "1", rowspan: "1", style: { width: 100 } },
    { name: "who", colspan: "1", rowspan: "1", style: { width: 100 } },
    { name: "when", colspan: "1", rowspan: "1", style: { width: 100 } },
    { name: "how", colspan: "1", rowspan: "1", style: { width: 100 } },
  ],
  mid: [],
  bottom: []
}
const tHead2 = {
  top: [
    // { name: "序号", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "www", colspan: "1", rowspan: "1", style: { width: 100 } },
    { name: "why", colspan: "1", rowspan: "1", style: { width: 100 } },
    { name: "where", colspan: "1", rowspan: "1", style: { width: 100 } },
    { name: "who", colspan: "1", rowspan: "1", style: { width: 100 } },
    { name: "when", colspan: "1", rowspan: "1", style: { width: 100 } },
    { name: "how", colspan: "1", rowspan: "1", style: { width: 100 } },
  ],
  mid: [],
  bottom: []
}
const tHead3 = {
  top: [
    // { name: "序号", colspan: "1", rowspan: "1", style:{ width: 100 } },
    { name: "hhh", colspan: "1", rowspan: "1", style: { width: 100 } },
    { name: "why", colspan: "1", rowspan: "1", style: { width: 100 } },
    { name: "where", colspan: "1", rowspan: "1", style: { width: 100 } },
    { name: "who", colspan: "1", rowspan: "1", style: { width: 100 } },
    { name: "when", colspan: "1", rowspan: "1", style: { width: 100 } },
    { name: "how", colspan: "1", rowspan: "1", style: { width: 100 } },
  ],
  mid: [],
  bottom: []
}
//表头部分----------------------------------------------------------------------------------------------------------------------------------------

//表体部分----------------------------------------------------------------------------------------------------------------------------------------
/**
 * select:开启下拉框
 * multiple:"/" 开启下拉框多选，以“/"分隔
 * { key: "calculation_1", name: "总收入",calculation_rules: "age * money", value: "", width: 100 }
 * 配置计算行：key必须包含calculation_   |   calculation_rules为计算规则
 * verticalAlign: top, middle, bottom 控制内容垂直方向
 * textAlign: left, center, right 控制内容水平方向
 */

const tBody1: any = [
  { key: "what", name: "what", value: "", width: 100, click: tick },
  { key: "why", name: "why", value: "", width: 100 },
  { key: "where", name: "where", value: "", width: 100 },
  { key: "who", name: "who", value: "", width: 100 },
  { key: "when", name: "when", value: "", width: 100 },
  { key: "how", name: "how",value: "", width: 100 },
]
const tBody2: any = [
  { key: "what", name: "what", value: "", width: 100 },
  { key: "why", name: "why", value: "", width: 100 },
  { key: "where", name: "where", value: "", width: 100 },
  { key: "who", name: "who", value: "", width: 100 },
  { key: "when", name: "when", value: "", width: 100 },
  { key: "how", name: "how", value: "", width: 100 },
]
const tBody3: any = [
  { key: "what", name: "what", value: "", width: 100 },
  { key: "why", name: "why", value: "", width: 100 },
  { key: "where", name: "where", value: "", width: 100 },
  { key: "who", name: "who", value: "", width: 100 },
  { key: "when", name: "when", value: "", width: 100 },
  { key: "how", name: "how", value: "", width: 100 },
]
//表体部分----------------------------------------------------------------------------------------------------------------------------------------

//计算列部分----------------------------------------------------------------------------------------------------------------------------------------
/**key必须包含calculation_ 
 * 后面的 one 为对应需要计算的列的key
 * 
 * */
const computeRow1: any = [
  { key: '合计', name:'合计', value: "合计", width: 100 },
  { key: 'calculation_one', name:'星期一', value: "", width: 100 },
  { key: 'calculation_two', name:'星期二', value: "", width: 100 },
  { key: 'calculation_three', name:'星期三', value: "", width: 100 },
  { key: 'calculation_four', name:'星期四', value: "", width: 100 },
]
//计算列部分----------------------------------------------------------------------------------------------------------------------------------------

//签名组件部分----------------------------------------------------------------------------------------------------------------------------------------

const sign = {
  signName:{ key: 'signName', value:'', preName:"记录人" },
  signTime:{ key: 'signTime', value:'', preName:"记录时间" },
}

//签名组件部分----------------------------------------------------------------------------------------------------------------------------------------

export default {
  hiddenFixHeader: true,//隐藏浮动表头，多表合一会用得到
  defaulLength: [9,9,9],//多个表单分别的行数
  tableTitle: { value: "月工作重点及周安排", width: 600 },//标题
  tBody: [tBody1,tBody2,tBody3],//表体内容
  tHead: [tHead1,tHead2,tHead3],//表头
  computeRow: [computeRow1,[],[]],//计算列
  complexHead,//复杂表头
  sign: sign,//签名组件
  remark: { value: "备注：", width: 600 },//备注
}